import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"

interface NewsItem {
  title: string
  time: string
}

interface NewsWidgetProps {
  newsItems: NewsItem[]
}

export function NewsWidget({ newsItems }: NewsWidgetProps) {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-lg border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Newspaper className="h-4 w-4 mr-2" />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {newsItems.map((item, index) => (
            <li key={index} className="border-b border-gray-700/50 pb-2 last:border-0 last:pb-0">
              <p className="text-sm text-gray-200">{item.title}</p>
              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

