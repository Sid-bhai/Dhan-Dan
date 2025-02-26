import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, TrendingUp, Shield } from "lucide-react"
import { Footer } from "@/components/footer"

export default function LandingPageContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740409968729.jpg-aW1h6p6VZZ9NvJVnYf6PsRyTuhNcre.jpeg"
              alt="Dhan Dan Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Dhan Dan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-black text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740409968729.jpg-aW1h6p6VZZ9NvJVnYf6PsRyTuhNcre.jpeg"
              alt="Dhan Dan Logo"
              width={200}
              height={200}
              className="mx-auto mb-8"
            />
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Welcome to <span className="text-yellow-400">Dhan Dan</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Join our community and unlock the potential of network marketing
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Dhan Dan?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <TrendingUp className="mb-4 h-12 w-12 text-yellow-400" />
                  <h3 className="mb-2 text-xl font-semibold">High Returns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Earn attractive commissions through our proven MLM structure
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Users className="mb-4 h-12 w-12 text-yellow-400" />
                  <h3 className="mb-2 text-xl font-semibold">Strong Community</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join a network of successful entrepreneurs and grow together
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Shield className="mb-4 h-12 w-12 text-yellow-400" />
                  <h3 className="mb-2 text-xl font-semibold">Secure Platform</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your investments are protected with state-of-the-art security
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <CheckCircle className="mb-4 h-12 w-12 text-yellow-400" />
                  <h3 className="mb-2 text-xl font-semibold">Easy to Start</h3>
                  <p className="text-gray-600 dark:text-gray-400">Simple registration process and intuitive platform</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black mx-auto">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Register</h3>
                <p className="text-gray-600 dark:text-gray-400">Create your account with basic details</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black mx-auto">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Build Network</h3>
                <p className="text-gray-600 dark:text-gray-400">Invite others using your referral link</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black mx-auto">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Earn Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400">Get commissions from your network's growth</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-yellow-400 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold text-black">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-black/80">Join thousands of successful members in our community</p>
            <Button size="lg" className="bg-black text-white hover:bg-black/80">
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

