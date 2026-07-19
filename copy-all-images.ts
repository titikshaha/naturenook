import fs from "fs";
import path from "path";

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
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    result.push(row);
  }
  return result;
}

function copyImages() {
  const csvPath = path.join(process.cwd(), "Master_Product_List.csv");
  let csvData = fs.readFileSync(csvPath, "utf8");
  if (csvData.charCodeAt(0) === 0xFEFF) {
    csvData = csvData.slice(1);
  }

  const parsed = parseCSV(csvData);
  const rows = parsed.slice(1);
  const rawFilesDir = path.join(process.cwd(), "raw files");
  const publicImagesDir = path.join(process.cwd(), "public/images/products");

  for (const row of rows) {
    if (!row || row.length < 11) continue;
    
    // Check columns 6, 7, 8, 9
    for (let i = 6; i <= 9; i++) {
      const filename = row[i]?.trim();
      if (filename) {
        // try direct match
        const src1 = path.join(rawFilesDir, filename);
        const dest1 = path.join(publicImagesDir, filename);
        if (fs.existsSync(src1)) {
          fs.copyFileSync(src1, dest1);
        } else {
          // If extension was missing or different, try .jpg or .png or .webp
          const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
          ['.jpg', '.jpeg', '.png', '.webp'].forEach(ext => {
            if (fs.existsSync(path.join(rawFilesDir, base + ext))) {
              fs.copyFileSync(path.join(rawFilesDir, base + ext), path.join(publicImagesDir, base + ext));
            }
          });
        }
      }
    }
  }
  console.log("Images copied over to public directory successfully.");
}

copyImages();
