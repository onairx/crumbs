import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const trendingAPI = process.env.NEXT_PUBLIC_API_TMDBE
  const trendingURL = `https://api.themoviedb.org/3/trending/all/week`
  try {
    const response = await fetch(trendingURL, {
      headers: {
        Authorization: `Bearer ${trendingAPI}`,
      },
    })
    const data = await response.json()
    return NextResponse.json(data.results)
  } catch (err) {
    console.log(err)
  }
}
