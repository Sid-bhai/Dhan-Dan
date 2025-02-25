"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"

export default function WalletPage() {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <main className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">Wallet</h1>
          <Card>
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthUserAmount />
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement recent transactions list */}
              <p>Recent transactions will be displayed here.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}

function AuthUserAmount() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return <p className="text-3xl font-bold">₹{user.availableAmount.toFixed(2)}</p>
}

