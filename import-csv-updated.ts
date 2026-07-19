import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

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
  
  const rawFilesDir = path.join(process.cwd(), "raw files");
  const publicImagesDir = path.join(process.cwd(), "public/images/products");

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

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
    const form = formStr === "EXTRACT" || formStr === "CAPSULE_EXTRACT" ? "CAPSULE_EXTRACT" : "POWDER";
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
      const sourcePath = path.join(rawFilesDir, image1);
      const destPath = path.join(publicImagesDir, image1);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        imageUrl = `/images/products/${image1}`;
      } else {
        // Fallback: try to find an image in raw files that includes the first word of the product
        const firstWord = name.split(" ")[0].toLowerCase();
        const files = fs.readdirSync(rawFilesDir);
        const match = files.find(f => f.toLowerCase().includes(firstWord) && (f.endsWith('.jpg') || f.endsWith('.png')));
        if (match) {
          fs.copyFileSync(path.join(rawFilesDir, match), path.join(publicImagesDir, match));
          imageUrl = `/images/products/${match}`;
        }
      }
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
