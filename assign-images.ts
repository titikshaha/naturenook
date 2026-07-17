import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const keywordMap: Record<string, string> = {
  "ashwagandha": "/images/products/Ashwagandha3.jpg",
  "beetroot": "/images/products/Beetroot13.jpg",
  "bhringraj": "/images/products/Bhringraj22.jpg",
  "brahmi": "/images/products/Brahmi15.jpg",
  "gudmar": "/images/products/Gudmar19.jpg",
  "gymnema": "/images/products/Gudmar19.jpg",
  "kaunch": "/images/products/Kaunch25.jpg",
  "moringa": "/images/products/Moringa1.jpg",
  "musli": "/images/products/Musli10.jpg",
  "sea buckthorn": "/images/products/SeaBuck5.jpg",
  "shankhpushpi": "/images/products/Shankh17.jpg",
  "shatavari": "/images/products/Shatavari7.jpg",
  "spirulina": "/images/products/Spirulina11.jpg",
  "triphala": "/images/products/Triphala23.jpg",
};

async function main() {
  const products = await prisma.product.findMany();
  let updatedCount = 0;

  for (const product of products) {
    const nameLower = product.name.toLowerCase();
    let assignedImage = null;

    for (const [keyword, imgPath] of Object.entries(keywordMap)) {
      if (nameLower.includes(keyword)) {
        assignedImage = imgPath;
        break;
      }
    }

    if (assignedImage) {
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: assignedImage }
      });
      updatedCount++;
    }
  }

  console.log(`Successfully mapped images to ${updatedCount} products!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
