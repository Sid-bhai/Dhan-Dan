import { put, list } from "@vercel/blob"

export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  state: string
  referCode: string
  password: string
  availableAmount: number
  totalCommission: number
  totalPayout: number
  totalReferrals: number
  referralLink: string
  recentReferrals: { name: string; date: string }[]
  avatar: string
  isNewUser: boolean
}

export async function getUsers(): Promise<User[]> {
  try {
    const { blobs } = await list()
    // Check if users.json exists
    const usersBlob = blobs.find((blob) => blob.pathname === "users.json")

    if (!usersBlob) {
      // If no users file exists, create one with empty array
      await saveUsers([])
      return []
    }

    const response = await fetch(usersBlob.url)
    if (!response.ok) {
      console.error("Error fetching users:", response.statusText)
      return []
    }

    const users = await response.json()
    return users as User[]
  } catch (error) {
    console.error("Error reading users:", error)
    // Return empty array instead of throwing error
    return []
  }
}

export async function saveUsers(users: User[]) {
  try {
    const blob = new Blob([JSON.stringify(users, null, 2)], {
      type: "application/json",
    })

    await put("users.json", blob, {
      access: "public",
      addRandomSuffix: false, // Ensure we always update the same file
    })
  } catch (error) {
    console.error("Error saving users:", error)
    throw new Error("Failed to save users data")
  }
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const users = await getUsers()
  return users.find((user) => user.username === username)
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const users = await getUsers()
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    availableAmount: 0,
    totalCommission: 0,
    totalPayout: 0,
    totalReferrals: 0,
    referralLink: `https://dhandan.com/ref/${user.username}`,
    recentReferrals: [],
    avatar: "/default-avatar.png",
    isNewUser: true,
  }
  users.push(newUser)
  await saveUsers(users)
  return newUser
}

export async function updateUser(updatedUser: User) {
  const users = await getUsers()
  const index = users.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
    await saveUsers(users)
    return true
  }
  return false
}

