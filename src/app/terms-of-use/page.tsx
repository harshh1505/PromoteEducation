import LegalPageLayout from '@/components/layout/LegalPageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the terms and conditions for using the Promote Education platform.',
}

export default function TermsOfUse() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="April 20, 2026">
      <section className="space-y-8">
        <div>
           <h3 className="text-lg font-medium mb-3">Acceptance of Terms</h3>
           <p>By accessing or using the Promote Education website, you agree to comply with these Terms of Use and all applicable laws and regulations.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Use of Content</h3>
           <p className="mb-3">
             All content on the website, including text, graphics, images, logos, and videos, is the property of Promote Education.
           </p>
           <p>Users may view, download, or print content for personal, non-commercial use only.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Prohibited Activities</h3>
           <ul className="list-disc pl-5 space-y-2">
             <li>Unauthorized copying, reproduction, or distribution of website content.</li>
             <li>Posting, transmitting, or sharing harmful, offensive, or unlawful material.</li>
             <li>Using the website for illegal or unethical purposes.</li>
           </ul>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">External Links</h3>
           <p>Our website may contain links to third-party websites. Promote Education is not responsible for the content, privacy, or practices of these external sites.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Limitation of Liability</h3>
           <p>Promote Education is not liable for any direct, indirect, or consequential damages arising from the use of the website or reliance on its content.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Modifications</h3>
           <p>We reserve the right to modify or update these Terms of Use at any time. Continued use of the website indicates acceptance of the revised terms.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Governing Law</h3>
           <p>These terms are governed by the laws of the jurisdiction where Promote Education operates.</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
