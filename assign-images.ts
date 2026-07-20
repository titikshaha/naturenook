import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const db = new Database("dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const keywordMap: Record<string, string> = {
  "ashwagandha": "https://res.cloudinary.com/qnvdmapj/image/upload/Ashwagandha3.jpg",
  "beetroot": "https://res.cloudinary.com/qnvdmapj/image/upload/Beetroot13.jpg",
  "bhringraj": "https://res.cloudinary.com/qnvdmapj/image/upload/Bhringraj22.jpg",
  "brahmi": "https://res.cloudinary.com/qnvdmapj/image/upload/Brahmi15.jpg",
  "gudmar": "https://res.cloudinary.com/qnvdmapj/image/upload/Gudmar19.jpg",
  "gymnema": "https://res.cloudinary.com/qnvdmapj/image/upload/Gudmar19.jpg",
  "kaunch": "https://res.cloudinary.com/qnvdmapj/image/upload/Kaunch25.jpg",
  "moringa": "https://res.cloudinary.com/qnvdmapj/image/upload/Moringa1.jpg",
  "musli": "https://res.cloudinary.com/qnvdmapj/image/upload/Musli10.jpg",
  "sea buckthorn": "https://res.cloudinary.com/qnvdmapj/image/upload/SeaBuck5.jpg",
  "shankhpushpi": "https://res.cloudinary.com/qnvdmapj/image/upload/Shankh17.jpg",
  "shatavari": "https://res.cloudinary.com/qnvdmapj/image/upload/Shatavari7.jpg",
  "spirulina": "https://res.cloudinary.com/qnvdmapj/image/upload/Spirulina11.jpg",
  "triphala": "https://res.cloudinary.com/qnvdmapj/image/upload/Triphala23.jpg",
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
