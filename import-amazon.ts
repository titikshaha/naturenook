import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

function determineCategory(name: string, desc: string): string {
  const text = (name + " " + desc).toLowerCase();
  if (text.includes("hair") || text.includes("skin") || text.includes("face") || text.includes("cosmetic") || text.includes("henna") || text.includes("indigo")) {
    return "Cosmetic";
  }
  if (text.includes("immune") || text.includes("protein") || text.includes("super food") || text.includes("energy")) {
    return "Nutraceutical";
  }
  return "Ayurvedic"; // Default
}

function determineForm(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("capsule") || n.includes("extract")) {
    return "CAPSULE_EXTRACT";
  }
  return "POWDER";
}

async function main() {
  const filePath = path.join(process.cwd(), "raw files", "All+Listings+Report_07-02-2026 (1).txt");
  const data = fs.readFileSync(filePath, "utf-8");
  
  const lines = data.split("\n");
  const headers = lines[0].split("\t");
  
  const nameIdx = headers.findIndex(h => h.includes("item-name"));
  const descIdx = headers.findIndex(h => h.includes("item-description"));
  const priceIdx = headers.findIndex(h => h.includes("price") && !h.includes("maximum"));
  
  const productsMap = new Map<string, any>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = line.split("\t");
    
    let rawName = cols[nameIdx] || "";
    let desc = cols[descIdx] || "";
    let priceStr = cols[priceIdx] || "0";
    
    if (!rawName) continue;
    
    // Clean name: take everything before the first '|' or '-' if it looks like a size
    let cleanName = rawName.split("|")[0].trim();
    
    // Extract size/potency
    let potency = "";
    const sizeMatch = rawName.match(/(\d+\s*(gm|g|kg|ml|l))/i);
    if (sizeMatch) {
      potency = sizeMatch[1];
    }
    
    // Filter duplicates by name + potency
    const key = `${cleanName}-${potency}`.toLowerCase();
    
    if (!productsMap.has(key)) {
      productsMap.set(key, {
        name: cleanName,
        scientificName: null, // Hard to extract reliably from Amazon title
        category: determineCategory(rawName, desc),
        form: determineForm(rawName),
        potency: potency || "Standard",
        description: desc.substring(0, 500) + (desc.length > 500 ? "..." : ""),
        imageUrl: null, // We can manually assign images later or map them
        price: parseFloat(priceStr) || 0,
      });
    }
  }

  const uniqueProducts = Array.from(productsMap.values());
  console.log(`Found ${uniqueProducts.length} unique products. Inserting...`);
  
  await prisma.product.deleteMany({}); // Clear old mock data
  
  // Insert all
  let count = 0;
  for (const p of uniqueProducts) {
    try {
      await prisma.product.create({ data: p });
      count++;
    } catch (e) {
      console.error(`Failed to insert: ${p.name}`, e);
    }
  }
  
  console.log(`Successfully imported ${count} products into the database!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
