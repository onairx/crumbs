import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const apiKey = process.env.NEXT_PUBLIC_API_TMDB

  if (!query) {
    return NextResponse.json({ results: [] }, { status: 400 })
  }

  const tmdbRes = await fetch(
    `https://api.themoviedb.org/3/search/multi?page=1&query=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`
  )

  const data = await tmdbRes.json()
  return NextResponse.json(data, { status: tmdbRes.status })
}
