import type React from "react"
import type { User } from "@/lib/data"

interface BinaryTreeProps {
  user: User
}

const BinaryTreeNode: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-2">
        {user.name.charAt(0)}
      </div>
      <div className="text-sm text-center">{user.name}</div>
    </div>
  )
}

export const BinaryTree: React.FC<BinaryTreeProps> = ({ user }) => {
  // This is a simplified version. In a real-world scenario, you'd fetch the actual referral data
  const dummyLeftChild = { name: "Left Referral", id: "left" } as User
  const dummyRightChild = { name: "Right Referral", id: "right" } as User

  return (
    <div className="flex flex-col items-center">
      <BinaryTreeNode user={user} />
      <div className="flex justify-center mt-4 space-x-8">
        <BinaryTreeNode user={dummyLeftChild} />
        <BinaryTreeNode user={dummyRightChild} />
      </div>
    </div>
  )
}

