import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { media_type: string; id: string } }) {
    const apiKey = process.env.NEXT_PUBLIC_API_TMDBE
    const { media_type, id } = params
    const url = `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?page=1`
    const urlTwo = `https://api.themoviedb.org/3/${media_type}/${id}/similar?page=1`
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ results: [] })
    }
}