const footerLinks = {
  Colleges: ['Engineering', 'Medical', 'MBA', 'Law', 'Design', 'Arts & Commerce'],
  Exams: ['JEE Main', 'NEET', 'CAT', 'GRE', 'GATE', 'GMAT'],
  Courses: ['B.Tech', 'MBBS', 'MBA', 'LLB', 'BCA', 'B.Design'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--midnight)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">

          {/* Brand col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
              <span
                className="text-white font-medium text-base"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
              >
                Promote Education
              </span>
            </div>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              India's most trusted college discovery platform. Helping students and parents make confident decisions since 2021.
            </p>
            <div className="flex gap-3">
              {['iOS App', 'Android'].map((app) => (
                <button
                  key={app}
                  className="text-xs px-3 py-1.5 rounded-pill transition-all duration-150 hover:bg-white/10"
                  style={{
                    border: '0.5px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                    borderRadius: '999px',
                  }}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium mb-3 tracking-wider" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                {category.toUpperCase()}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={category === 'Legal' ? `/${link.toLowerCase().replace(/ /g, '-')}` : '#'}
                      className="text-sm transition-colors duration-150 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Promote Education Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy policy', href: '/privacy-policy' },
              { label: 'Terms of use', href: '/terms-of-use' },
              { label: 'Disclaimer', href: '/disclaimer' },
              { label: 'Cookie policy', href: '/cookie-policy' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs transition-colors duration-150 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
