"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"
import { getUserMessages, markMessageAsRead } from "@/lib/data"
import type { Message } from "@/lib/data"

export default function InboxPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      if (user?.username) {
        const userMessages = await getUserMessages(user.username)
        setMessages(userMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      }
    }
    fetchMessages()
  }, [user])

  const handleMessageClick = async (messageId: string) => {
    await markMessageAsRead(messageId)
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <main className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">Inbox</h1>
          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors ${!message.read ? "bg-muted" : ""}`}
                onClick={() => handleMessageClick(message.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="mt-2 text-sm text-muted-foreground">From: {message.from}</div>
                </CardContent>
              </Card>
            ))}
            {messages.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">No messages in your inbox</CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

