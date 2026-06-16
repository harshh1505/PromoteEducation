import LegalPageLayout from '@/components/layout/LegalPageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important legal notices and content accuracy disclaimers for Promote Education.',
}

export default function Disclaimer() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="April 20, 2026">
      <section className="space-y-8">
        <div>
           <h3 className="text-lg font-medium mb-3">Content Accuracy</h3>
           <p>The information provided on the Promote Education website, including articles, guides, course details, career advice, and other educational resources, is intended for general informational purposes only. While we strive to ensure that all content is accurate and up-to-date, we make no guarantees regarding the completeness, reliability, or accuracy of the information.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">No Professional Advice</h3>
           <p>The content on this website is not intended as a substitute for professional advice, including but not limited to educational, legal, financial, or medical guidance. Users should consult with qualified professionals before making decisions based on information provided on this site.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Third-Party Links</h3>
           <p>The website may contain links to external websites, resources, or institutions. Promote Education is not responsible for the content, policies, or practices of these third-party websites. Linking to a third-party site does not imply endorsement.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">User Responsibility</h3>
           <p>Users are responsible for their own decisions and actions based on the information provided on this website. Promote Education does not accept liability for any direct, indirect, or consequential losses or damages resulting from the use of the website or reliance on its content.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Changes to Content</h3>
           <p>Promote Education reserves the right to update, modify, or remove content on the website at any time without prior notice.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Intellectual Property</h3>
           <p>All content, images, logos, and other materials on this website are the property of Promote Education and may not be copied, reproduced, or used without explicit permission.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Acceptance of Disclaimer</h3>
           <p>By using this website, you agree to this disclaimer and acknowledge that you are using the information at your own risk.</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
