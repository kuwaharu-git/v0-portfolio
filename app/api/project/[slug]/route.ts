import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), "data", "projects", `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, "utf-8")

    return NextResponse.json({ content }, { status: 200 })
  } catch (error) {
    console.error("API /api/project/[slug] error:", error)
    return NextResponse.json({ error: "Failed to load project details" }, { status: 500 })
  }
}
