"use client"

import { useNavigate } from "react-router-dom"
import { UserCog } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export function AdminButton() {
  const navigate = useNavigate()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="iocn" onClick={() => navigate("/admin")} aria-label="Admin panel">
            <UserCog className="h-5 w-5 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Admin Panel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
