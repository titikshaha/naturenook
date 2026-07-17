import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import { stringify } from "csv-stringify/sync"; // We might need to install csv-stringify, or we can just write a simple CSV writer.

// Let's write a simple CSV writer to avoid dependencies
function toCSV(data: any[][]): string {
  return data.map(row => 
    row.map(cell => {
      if (cell === null || cell === undefined) return '""';
      const str = String(cell);
      // Escape quotes by doubling them, wrap in quotes if contains comma, quote, or newline
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return `"${str}"`;
    }).join(",")
  ).join("\n");
}

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' }
  });

  const headers = [
    "Product Name",
    "Scientific Name",
    "Category",
    "Form",
    "Potency/Size",
    "Wholesale Price (₹)",
    "Image 1 (Filename)",
    "Image 2 (Filename)",
    "Image 3 (Filename)",
    "Image 4 (Filename)",
    "Description"
  ];

  const rows = [headers];

  for (const p of products) {
    rows.push([
      p.name,
      p.scientificName || "",
      p.category,
      p.form,
      p.potency || "",
      p.price || "",
      p.imageUrl ? p.imageUrl.split('/').pop() : "", // Image 1 defaults to what we found
      "", // Image 2
      "", // Image 3
      "", // Image 4
      p.description || ""
    ]);
  }

  const csvContent = toCSV(rows);
  const outputPath = path.join(process.cwd(), "Master_Product_List.csv");
  
  // Also write BOM so Excel opens it with UTF-8 correctly
  fs.writeFileSync(outputPath, "\uFEFF" + csvContent, "utf8");
  
  console.log("Master_Product_List.csv created successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
