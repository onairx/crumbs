import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { media_type: string; id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_API_TMDBE
  const { media_type, id } = params
  const url = `https://api.themoviedb.org/3/${media_type}/${id}`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
