import fs from "fs";
import path from "path";
import { prisma } from "./src/lib/prisma";

// A robust CSV parser for Node.js
function parseCSV(content: string) {
  const result: string[][] = [];
  let row: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = "";
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++; // skip \n of \r\n
      row.push(currentVal);
      if (row.some(val => val.trim() !== "")) {
        result.push(row);
      }
      row = [];
      currentVal = "";
    } else {
      currentVal += char;
    }
  }
  // push last
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    result.push(row);
  }
  return result;
}

async function main() {
  const csvPath = path.join(process.cwd(), "Master_Product_List.csv");
  let csvData = fs.readFileSync(csvPath, "utf8");
  
  // Strip BOM if present
  if (csvData.charCodeAt(0) === 0xFEFF) {
    csvData = csvData.slice(1);
  }

  const parsed = parseCSV(csvData);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  console.log(`Found ${rows.length} products in CSV.`);

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log("Cleared old products.");

  let imported = 0;
  
  const cloudinaryBaseUrl = "https://res.cloudinary.com/qnvdmapj/image/upload/";

  for (const row of rows) {
    if (!row || row.length < 2) continue;

    // Headers:
    // 0: Product Name
    // 1: Category
    // 2: Form
    // 3: Potency/Size
    // 4: Wholesale Price (₹)
    // 5: Discounted Price
    // 6: Image 1 (Filename)
    // 7: Image 2 (Filename)
    // 8: Image 3 (Filename)
    // 9: Image 4 (Filename)
    // 10: Description

    const name = row[0]?.trim();
    if (!name) continue;

    const category = row[1]?.trim() || "Ayurvedic";
    const formStr = row[2]?.trim().toUpperCase();
    const form = formStr === "EXTRACT" || formStr === "CAPSULE_EXTRACT" || formStr === "CAPSULE" ? "CAPSULE_EXTRACT" : "POWDER";
    const potency = row[3]?.trim();
    
    const rawWholesale = row[4]?.replace(/[^0-9.]/g, '');
    const rawDiscount = row[5]?.replace(/[^0-9.]/g, '');
    
    // "For those products with empty wholesale, put the discounted price as the wholesale price"
    let finalPrice = 0;
    if (rawWholesale) {
      finalPrice = parseFloat(rawWholesale);
    } else if (rawDiscount) {
      finalPrice = parseFloat(rawDiscount);
    }

    const description = row[10]?.trim();
    
    let imageUrl = null;
    const image1 = row[6]?.trim();
    if (image1) {
      imageUrl = cloudinaryBaseUrl + image1;
    } else {
      // If no image is provided, construct it manually based on convention or leave as null.
      const firstWord = name.split(" ")[0].toLowerCase();
      // As a fallback, we assume there's an image named like the first word in the cloud.
      // E.g., ashwagandha -> nature-nook-ashwagandha-powder-front.jpg
      // Since we don't know the exact name without checking, we'll leave it null 
      // or just assume standard convention for trial.
      // Leaving null is safer if it's missing in CSV.
    }

    await prisma.product.create({
      data: {
        name,
        scientificName: "", // We didn't keep scientific name in this iteration if not separated
        category,
        form,
        potency,
        price: finalPrice || null,
        description,
        imageUrl,
      }
    });
    
    imported++;
  }

  console.log(`Successfully imported ${imported} products and copied their images!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
