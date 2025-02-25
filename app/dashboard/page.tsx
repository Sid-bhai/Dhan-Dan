"use client"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import ProtectedRoute from "@/components/protected-route"
import { BinaryTree } from "@/components/binary-tree"

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const copyReferralLink = () => {
    if (user?.referralLink) {
      navigator.clipboard.writeText(user.referralLink)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard.",
      })
    }
  }

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <main className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
          {user && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{user.availableAmount?.toFixed(2) || "0.00"}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{user.totalCommission?.toFixed(2) || "0.00"}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{user.totalPayout?.toFixed(2) || "0.00"}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.totalReferrals || 0}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Referral Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <BinaryTree user={user} />
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Referral Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input value={user.referralLink || ""} readOnly />
                    <Button onClick={copyReferralLink}>Copy</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}

