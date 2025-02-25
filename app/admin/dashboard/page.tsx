"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AdminUser {
  id: string
  name: string
  username: string
  email: string
  createdAt: string
  totalReferrals: number
  availableAmount: number
}

interface AdminMessage {
  id: string
  from: string
  to: string
  subject: string
  content: string
  createdAt: string
  read: boolean
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [messages, setMessages] = useState<AdminMessage[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")

  useEffect(() => {
    fetchUsers()
    fetchMessages()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedUser,
          subject: messageSubject,
          content: messageContent,
        }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      toast({
        title: "Success",
        description: "Message sent successfully",
      })

      setMessageSubject("")
      setMessageContent("")
      setSelectedUser("")
      fetchMessages()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  if (!user?.isAdmin) {
    return <div>Unauthorized</div>
  }

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <main className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Referrals</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{user.totalReferrals}</TableCell>
                            <TableCell>₹{user.availableAmount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => setSelectedUser(user.username)}>
                                Message
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {selectedUser && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Send Message to {selectedUser}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Input
                          placeholder="Subject"
                          value={messageSubject}
                          onChange={(e) => setMessageSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Message content"
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleSendMessage}>Send Message</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Message History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messages.map((message) => (
                          <TableRow key={message.id}>
                            <TableCell>{new Date(message.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{message.from}</TableCell>
                            <TableCell>{message.to}</TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell>{message.read ? "Read" : "Unread"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}

