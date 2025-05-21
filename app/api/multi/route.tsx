import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const multiAPI = process.env.NEXT_PUBLIC_API_TMDBE;
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    if (!query) {
        return NextResponse.json({ results: [] });
    }
    const multiURL = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&page=1`;
    try {
        const response = await fetch(multiURL, {
            headers: {
                Authorization: `Bearer ${multiAPI}`,
            },
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ results: [] });
    }
}