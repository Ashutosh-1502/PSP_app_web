// components/ThemeToggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/common/theme/useTheme"
import { cn } from "@/lib/utils"

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-10 w-20 items-center justify-between rounded-full border-[1px] transition-colors duration-300",
        isDark
          ? "border-gray-600 bg-gray-800"
          : "border-yellow-400"
      )}
    >
      <div
        className={cn(
          "absolute h-9 w-9 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center",
          isDark ? "translate-x-[44px]" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-gray-800" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </div>
    </button>
  )
}
