import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Fuse from "fuse.js";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        scientificName: true,
      },
    });

    const fuse = new Fuse(products, {
      keys: [
        { name: "name", weight: 2 },
        { name: "scientificName", weight: 1.5 },
        { name: "category", weight: 1 },
      ],
      threshold: 0.5,
      distance: 500,
      ignoreLocation: true,
      useExtendedSearch: true,
    });

    const searchTerms = query.split(" ").filter(Boolean).map(term => `'${term}`).join(" | ");
    let results = fuse.search(searchTerms).map(result => result.item);

    if (results.length === 0) {
      results = fuse.search(query).map(result => result.item);
    }

    // Return top 5 results for the dropdown
    return NextResponse.json({ results: results.slice(0, 5) });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
