"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

interface CopyrightFooterProps {
  ownerName?: string
  ownerLink?: string
  className?: string
}

export default function CopyrightFooter({
  ownerName = "Shakib Al Hasan",
  ownerLink = "https://www.linkedin.com/in/shakibalhasan-code",
  className = "",
}: CopyrightFooterProps) {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

  // Ensure year is updated if component stays mounted across year change
  useEffect(() => {
    const interval = setInterval(
      () => {
        const year = new Date().getFullYear()
        if (year !== currentYear) {
          setCurrentYear(year)
        }
      },
      1000 * 60 * 60,
    ) // Check every hour

    return () => clearInterval(interval)
  }, [currentYear])

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-4 text-sm text-muted-foreground ${className}`}
    >
      <div className="flex items-center">
        <span>
          © {currentYear}{" "}
          {ownerLink ? (
            <a href={ownerLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {ownerName}
            </a>
          ) : (
            ownerName
          )}
          . All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/10 rounded-full">
        <Sparkles className="h-3 w-3 text-primary" />
        <span>Powered by AI</span>
      </div>
    </div>
  )
}

