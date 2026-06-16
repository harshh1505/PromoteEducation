import LegalPageLayout from '@/components/layout/LegalPageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how Promote Education uses cookies to enhance your experience.',
}

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="April 20, 2026">
      <section className="space-y-8">
        <div>
           <h3 className="text-lg font-medium mb-3">What are Cookies?</h3>
           <p>Cookies are small text files that are placed on your device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">How We Use Cookies</h3>
           <p className="mb-3">Promote Education uses cookies for the following purposes:</p>
           <ul className="list-disc pl-5 space-y-2">
             <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you, such as setting your privacy preferences or logging in.</li>
             <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
             <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
             <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.</li>
           </ul>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Managing Your Cookies</h3>
           <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" className="text-gold-dark hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-gold-dark hover:underline">www.allaboutcookies.org</a>.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Changes to this Policy</h3>
           <p>We may update our Cookie Policy from time to time. We encourage you to periodically review this page for the latest information on our cookie practices.</p>
        </div>

        <div>
           <h3 className="text-lg font-medium mb-3">Contact Us</h3>
           <p>If you have any questions about our use of cookies, please contact us through our support channels.</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}
