import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const WelcomeMessage: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Welcome to Dhan Dan!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Congratulations on joining our community! Here are some quick steps to get started:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Complete your profile</li>
          <li>Explore your dashboard</li>
          <li>Start referring friends and family</li>
          <li>Track your earnings and growth</li>
        </ul>
      </CardContent>
    </Card>
  )
}

