"use client";

import { useState, useEffect } from "react";
import { CustomLinkCard } from "@/components/custom-link-card";
import { WeatherWidget } from "@/components/weather-widget";
import { NewsWidget } from "@/components/news-widget";
import { TodoList } from "@/components/todo-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogo } from "@/components/icons/google-logo";
import { ChatGPTLogo } from "@/components/icons/chatgpt-logo";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [weather, setWeather] = useState({
    temp: "72°F",
    condition: "Partly Cloudy",
    icon: "sun" as "sun" | "cloud" | "rain",
  });

  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample custom links - replace with your own
  const customLinks = [
    { title: "GitHub", url: "https://github.com" },
    { title: "Gmail", url: "https://mail.google.com" },
    { title: "YouTube", url: "https://youtube.com" },
    { title: "Twitter", url: "https://twitter.com" },
    { title: "Reddit", url: "https://reddit.com" },
    { title: "Netflix", url: "https://netflix.com" },
  ];

  // Mock news data
  const newsItems = [
    { title: "New Technology Breakthrough Announced", time: "2 hours ago" },
    { title: "Global Markets See Unexpected Rise", time: "4 hours ago" },
    {
      title: "Scientists Discover New Species in Pacific",
      time: "6 hours ago",
    },
    {
      title: "Sports Team Wins Championship After 10 Years",
      time: "8 hours ago",
    },
  ];

  return (
    <main className="min-h-screen p-6 flex flex-col">
      {/* Header with time */}
      <div className="text-center mb-8">
        {time ? (
          <h1 className="text-4xl font-bold tracking-tight text-gray-100">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h1>
        ) : (
          <Skeleton className="mx-auto w-40 h-14 mb-2" />
        )}
        {time ? (
          <p className="text-gray-400">
            {time.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : (
          <Skeleton className="mx-auto w-20 h-4" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Main content area - 9 columns */}
        <div className="md:col-span-9 space-y-6">
          {/* Search bars */}
          <div className="space-y-4">
            <form
              action="https://www.google.com/search"
              method="get"
              target="_blank"
              className="space-y-2"
            >
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  name="q"
                  placeholder="Search Google..."
                  className="flex-1 bg-transparent border border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-gray-500"
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-transparent border border-gray-700 text-gray-200 hover:bg-gray-800/30"
                >
                  <GoogleLogo className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector(
                  "input",
                ) as HTMLInputElement;
                const message = input.value.trim();

                if (message) {
                  // Store the message in localStorage
                  localStorage.setItem("chatgpt_message", message);

                  // Open ChatGPT in a new tab
                  const chatWindow = window.open(
                    "https://chat.openai.com/",
                    "_blank",
                  );

                  // Create a script to inject the message
                  if (chatWindow) {
                    chatWindow.addEventListener("load", () => {
                      chatWindow.eval(`
                        // Wait for the ChatGPT input to be available
                        const checkInterval = setInterval(() => {
                          const textarea = document.querySelector('textarea');
                          if (textarea) {
                            clearInterval(checkInterval);
                            
                            // Get the message from localStorage
                            const message = localStorage.getItem('chatgpt_message');
                            if (message) {
                              // Set the value and dispatch input event
                              textarea.value = message;
                              textarea.dispatchEvent(new Event('input', { bubbles: true }));
                              
                              // Find and click the send button
                              setTimeout(() => {
                                const buttons = Array.from(document.querySelectorAll('button'));
                                const sendButton = buttons.find(button => 
                                  button.textContent === 'Send' || 
                                  button.querySelector('svg[data-icon="paper-plane"]')
                                );
                                if (sendButton) sendButton.click();
                                
                                // Clear the stored message
                                localStorage.removeItem('chatgpt_message');
                              }, 500);
                            }
                          }
                        }, 500);
                      `);
                    });
                  }
                } else {
                  // If no message, just open ChatGPT
                  window.open("https://chat.openai.com/", "_blank");
                }
              }}
              className="space-y-2"
            >
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Ask ChatGPT..."
                  className="flex-1 bg-transparent border border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-gray-500"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-transparent border border-gray-700 text-gray-200 hover:bg-gray-800/30"
                >
                  <ChatGPTLogo className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Customizable links grid - 2 rows of 3 */}
          <div className="grid grid-cols-3 gap-4">
            {customLinks.map((link, i) => (
              <CustomLinkCard key={i} title={link.title} url={link.url} />
            ))}
          </div>

          {/* Todo List */}
          <TodoList />
        </div>

        {/* Right sidebar - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          {/* Weather widget - vertical rectangle */}
          <WeatherWidget
            temperature={weather.temp}
            condition={weather.condition}
            location="New York, NY"
            icon={weather.icon}
          />

          {/* News widget below weather */}
          <NewsWidget newsItems={newsItems} />
        </div>
      </div>

      <footer className="mt-auto pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Your Dashboard</p>
      </footer>
    </main>
  );
}
