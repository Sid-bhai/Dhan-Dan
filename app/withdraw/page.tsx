"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"

export default function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [upi, setUpi] = useState("")
  const { toast } = useToast()
  const { user } = useAuth()

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement withdraw logic with API call
      console.log("Withdraw request:", { amount, upi })
      toast({
        title: "Withdrawal Requested",
        description: `Your withdrawal request for ₹${amount} has been submitted.`,
      })
      setAmount("")
      setUpi("")
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "An error occurred while processing your withdrawal. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <main className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">Withdraw</h1>
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                    step="0.01"
                    max={user.availableAmount.toString()}
                  />
                </div>
                <div>
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input
                    id="upi"
                    type="text"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                    required
                    placeholder="example@upi"
                  />
                </div>
                <Button type="submit">Submit Withdrawal Request</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement transaction history table */}
              <p>Transaction history will be displayed here.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}

