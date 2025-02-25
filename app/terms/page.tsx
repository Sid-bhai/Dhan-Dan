import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Please read these terms of service carefully before using the Dhan Dan platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using the Dhan Dan platform, you agree to be bound by these Terms of Service and all
            applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using
            the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Eligibility</h2>
          <p className="mb-6">
            You must be at least 18 years old and capable of forming legally binding contracts to use our services. By
            using our platform, you represent and warrant that you meet these requirements.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
          <p className="mb-6">
            To access certain features of the platform, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Commission Structure</h2>
          <p className="mb-6">
            Commissions are earned according to our published commission structure. We reserve the right to modify the
            commission structure with appropriate notice to users.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Withdrawal Policy</h2>
          <p className="mb-6">
            Withdrawals are subject to our verification process and minimum withdrawal amounts. Processing times may
            vary based on the payment method selected.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prohibited Activities</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Creating multiple accounts</li>
            <li>Providing false or misleading information</li>
            <li>Engaging in fraudulent activities</li>
            <li>Manipulating the referral system</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
          <p className="mb-6">
            We reserve the right to terminate or suspend your account and access to the platform at our sole discretion,
            without notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
            us, or third parties, or for any other reason.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
          <p className="mb-6">
            We reserve the right to modify these terms at any time. We will notify users of any material changes via
            email or through the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
          <p className="mb-6">
            If you have any questions about these Terms of Service, please contact us at support@dhandan.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

