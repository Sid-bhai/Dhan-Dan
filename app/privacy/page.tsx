import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal
            information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-6">We collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Account information</li>
            <li>Transaction data</li>
            <li>Usage data and analytics</li>
            <li>Communication records</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-6">We use your information to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Process your transactions</li>
            <li>Manage your account</li>
            <li>Send important notifications</li>
            <li>Improve our services</li>
            <li>Comply with legal requirements</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="mb-6">
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
          <p className="mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your information
            with trusted partners who assist us in operating our platform, conducting our business, or serving our
            users.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p className="mb-6">You have the right to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies</h2>
          <p className="mb-6">
            We use cookies and similar tracking technologies to track activity on our platform and hold certain
            information to improve and analyze our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Privacy Policy</h2>
          <p className="mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "last updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at privacy@dhandan.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

