import LegalPageLayout from '@/components/layout/LegalPageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Promote Education collects, uses, and protects your personal data.',
}

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 20, 2026">
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Promote Education values your privacy</h2>
          <p>
            Promote Education values the privacy of its users and is committed to protecting personal information collected through its website. By using our site, you agree to the practices described in this policy.
          </p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Information We Collect</h3>
           <ul className="list-disc pl-5 space-y-2">
             <li><strong>Personal information</strong> such as name, email, phone number, and academic details submitted via contact forms or registration forms.</li>
             <li><strong>Non-personal information</strong> such as browser type, device information, IP address, and website usage data collected automatically.</li>
           </ul>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">How We Use Your Information</h3>
           <ul className="list-disc pl-5 space-y-2">
             <li>To provide educational guidance, updates, and services you request.</li>
             <li>To respond to inquiries, process applications, and improve our services.</li>
             <li>To share relevant educational resources, newsletters, and promotional content (with your consent).</li>
           </ul>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Information Sharing</h3>
           <p className="mb-3">We do not sell, rent, or trade personal information to third parties.</p>
           <p>Information may be shared with partner institutions or service providers solely for delivering the requested services.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Cookies and Tracking</h3>
           <p>Our website may use cookies to enhance user experience, track analytics, and optimize website performance.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Data Security</h3>
           <p>We implement appropriate technical and administrative measures to protect your information from unauthorized access or disclosure.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Your Rights</h3>
           <p>You may request access, correction, or deletion of your personal data at any time by contacting us.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Changes to Privacy Policy</h3>
           <p>Promote Education reserves the right to update this Privacy Policy at any time. Users are encouraged to review the policy periodically.</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
