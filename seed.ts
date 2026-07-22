import { prisma } from "./src/lib/prisma";

async function main() {
  await prisma.product.deleteMany({}); // clear existing
  
  await prisma.product.createMany({
    data: [
      { name: "Ashwagandha Extract", scientificName: "Withania somnifera", category: "Ayurvedic", form: "CAPSULE_EXTRACT", potency: "5% Withanolides", price: 1200, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Ashwagandha3.jpg" },
      { name: "Shatavari Powder", scientificName: "Asparagus racemosus", category: "Ayurvedic", form: "POWDER", potency: "Raw Powder", price: 800, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Shatavari7.jpg" },
      { name: "Gymnema Extract (Gudmar)", scientificName: "Gymnema sylvestre", category: "Nutraceutical", form: "CAPSULE_EXTRACT", potency: "25% Gymnemic Acid", price: 1500, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Gudmar19.jpg" },
      { name: "Spirulina Powder", scientificName: "Arthrospira platensis", category: "Nutraceutical", form: "POWDER", potency: "60% Protein", price: 900, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Spirulina11.jpg" },
      { name: "Brahmi Extract", scientificName: "Bacopa monnieri", category: "Ayurvedic", form: "CAPSULE_EXTRACT", potency: "20% Bacosides", price: 1100, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Brahmi15.jpg" },
      { name: "Moringa Powder", scientificName: "Moringa oleifera", category: "Nutraceutical", form: "POWDER", potency: "Raw Powder", price: 600, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Moringa1.jpg" },
      { name: "Bhringraj Powder", scientificName: "Eclipta prostrata", category: "Cosmetic", form: "POWDER", potency: "Raw Powder", price: 750, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Bhringraj22.jpg" },
      { name: "Triphala Extract", scientificName: "Three-fruit blend", category: "Ayurvedic", form: "CAPSULE_EXTRACT", potency: "20% Tannins", price: 1300, imageUrl: "https://res.cloudinary.com/qnvdmapj/image/upload/Triphala23.jpg" },
    ]
  });
  console.log("Mock products seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
