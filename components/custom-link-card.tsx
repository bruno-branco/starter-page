import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface CustomLinkCardProps {
  title: string
  url: string
  icon?: React.ReactNode
}

export function CustomLinkCard({ title, url, icon }: CustomLinkCardProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card className="bg-gray-800/30 hover:bg-gray-700/50 backdrop-blur-md border-0 shadow-sm transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-2 flex flex-col items-center justify-center h-16">
          {icon || <ExternalLink className="h-4 w-4 text-gray-400 mb-1" />}
          <p className="text-gray-300 text-xs font-medium">{title}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

