import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

interface WeatherWidgetProps {
  temperature: string
  condition: string
  location: string
  icon: "sun" | "cloud" | "rain"
}

export function WeatherWidget({ temperature, condition, location, icon }: WeatherWidgetProps) {
  const weatherIcons = {
    sun: <Sun className="h-8 w-8 text-yellow-400" />,
    cloud: <Cloud className="h-8 w-8 text-gray-300" />,
    rain: <CloudRain className="h-8 w-8 text-blue-300" />,
  }

  return (
    <Card className="bg-gray-800/30 backdrop-blur-lg border-0 shadow-sm relative overflow-hidden h-64">
      <div className="absolute -top-4 -right-4 opacity-20">
        <Cloud className="h-16 w-16 text-gray-300" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <Cloud className="h-12 w-12 text-gray-300" />
      </div>
      <CardContent className="p-4 relative z-10 h-full flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-200">Weather</h3>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="mb-4">{weatherIcons[icon]}</div>
          <h2 className="text-2xl font-semibold text-gray-100">{temperature}</h2>
          <p className="text-gray-300">{condition}</p>
          <p className="text-gray-400 text-sm mt-2">{location}</p>
        </div>
      </CardContent>
    </Card>
  )
}

