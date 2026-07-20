import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany({
    where: {
      imageUrl: {
        contains: "NatureNook/",
      }
    }
  });

  console.log(`Found ${products.length} products to update in DB.`);
  let count = 0;

  for (const p of products) {
    if (p.imageUrl) {
      const newUrl = p.imageUrl.replace("NatureNook/", "");
      
      await prisma.product.update({
        where: { id: p.id },
        data: { imageUrl: newUrl }
      });
      count++;
    }
  }

  console.log(`Successfully removed NatureNook/ from ${count} product URLs in the database.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
