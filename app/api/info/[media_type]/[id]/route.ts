import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_API_TMDBE
  const { pathname } = request.nextUrl
  const pathParts = pathname.split("/")
  const media_type = pathParts[pathParts.length - 2]
  const id = pathParts[pathParts.length - 1]
  const url = `https://api.themoviedb.org/3/${media_type}/${id}`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
