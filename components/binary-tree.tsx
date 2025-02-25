import type React from "react"
import type { User } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface BinaryTreeProps {
  user: User
}

const BinaryTreeNode: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card className="w-48">
      <CardContent className="p-4 flex flex-col items-center">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium text-center">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.username}</div>
        <div className="text-xs text-muted-foreground mt-1">Referrals: {user.totalReferrals}</div>
      </CardContent>
    </Card>
  )
}

const TreeLine: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <div
    className={`absolute h-8 border-t-2 border-primary w-16 top-0 ${direction === "left" ? "-left-16" : "-right-16"}`}
  />
)

export const BinaryTree: React.FC<BinaryTreeProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <BinaryTreeNode user={user} />
        {user.referrals && user.referrals.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-center gap-32">
              {user.referrals.map((referralId, index) => (
                <div key={referralId} className="relative">
                  <TreeLine direction={index === 0 ? "left" : "right"} />
                  <BinaryTreeNode user={{ ...user, id: referralId }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

