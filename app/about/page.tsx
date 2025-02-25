import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Dhan Dan</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Welcome to Dhan Dan, your trusted partner in network marketing and financial growth. Our platform is
            designed to empower individuals to achieve their financial goals through a transparent and efficient MLM
            structure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            At Dhan Dan, we are committed to providing opportunities for financial growth and success through ethical
            network marketing. Our mission is to create a sustainable ecosystem where members can thrive and build their
            networks with confidence.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Transparent commission structure</li>
            <li>Secure and reliable platform</li>
            <li>Dedicated support team</li>
            <li>Innovative marketing tools</li>
            <li>Regular training and development programs</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p>We believe in complete transparency in all our operations and transactions.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p>We maintain the highest standards of integrity in all our business practices.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>We continuously innovate to provide the best tools and opportunities for our members.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            Have questions? We're here to help! Reach out to us at{" "}
            <Link href="mailto:support@dhandan.com" className="text-primary hover:underline">
              support@dhandan.com
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

