import fs from "fs";
import path from "path";

export function parseCSV(content: string) {
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
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    result.push(row);
  }
  return result;
}

let cachedParsedCSV: string[][] | null = null;

export function getProductDataFromCSV(productName: string) {
  try {
    if (!cachedParsedCSV) {
      const csvPath = path.join(process.cwd(), "Master_Product_List.csv");
      let csvData = fs.readFileSync(csvPath, "utf8");
      if (csvData.charCodeAt(0) === 0xFEFF) {
        csvData = csvData.slice(1);
      }
      cachedParsedCSV = parseCSV(csvData).slice(1);
    }

    const rows = cachedParsedCSV;

    const row = rows.find(r => r[0]?.trim().toLowerCase() === productName.trim().toLowerCase());
    
    if (row) {
      // 4: Wholesale Price (₹), 5: Discounted Price, 6-9: Images, 10: Description
      const wholesaleStr = row[4]?.replace(/[^0-9.]/g, '');
      const discountStr = row[5]?.replace(/[^0-9.]/g, '');
      
      const wholesalePrice = wholesaleStr ? parseFloat(wholesaleStr) : null;
      const discountedPrice = discountStr ? parseFloat(discountStr) : null;
      
      const images = [];
      for (let i = 6; i <= 9; i++) {
        if (row[i] && row[i].trim() !== "") {
          images.push(`/images/products/${row[i].trim()}`);
        }
      }

      return {
        wholesalePrice,
        discountedPrice,
        images,
        fullDescription: row[10] || null
      };
    }
  } catch (err) {
    console.error("Failed to read CSV for product", err);
  }
  return null;
}
