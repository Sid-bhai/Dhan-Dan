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
    const usersBlob = blobs.find((blob) => blob.pathname === "users.json")
    if (!usersBlob) return []

    const response = await fetch(usersBlob.url)
    const users = await response.json()
    return users as User[]
  } catch (error) {
    console.error("Error reading users:", error)
    return []
  }
}

export async function saveUsers(users: User[]) {
  try {
    const blob = new Blob([JSON.stringify(users)], {
      type: "application/json",
    })
    await put("users.json", blob, { access: "public" })
  } catch (error) {
    console.error("Error saving users:", error)
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

