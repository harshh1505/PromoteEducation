import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Events & Seminars | Promote Education',
  description: 'Join our fests, seminars, and conferences focused on student wellbeing and academic success in collaboration with top colleges.',
}



export default function EventsPage() {
  // Replace this YouTube ID with the desired video ID. 
  // It is currently set to a placeholder video.
  const youtubeVideoId = "NkhcoEVXFa8" 

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* ── Page Header ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-[11px] font-black text-sky-500 uppercase tracking-[0.2em]">Our Events</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  Connect, learn, <br />and grow together.
                </h1>
              </div>
              <div className="md:max-w-md">
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5">
                  We regularly host and collaborate on fests, seminars, and conferences across India. From high-stakes admission conclaves to essential student wellbeing workshops.
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Stay Tuned For Updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Video Section ── */}
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Experience Our Events</h2>
              <p className="text-slate-500 text-sm max-w-2xl mx-auto">Catch a glimpse of the energy, learning, and community at our recent academic conclaves and student wellbeing seminars.</p>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video bg-slate-900">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0`}
                title="Promote Education Events"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* ── Upcoming Events ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-12">
              <span className="w-10 h-[2px] bg-slate-900" />
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Upcoming Events</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50 border border-slate-100 rounded-3xl text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Calendar size={24} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No upcoming events right now</h3>
              <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
                We are currently planning our next big fest and seminar series. Keep an eye on this space or subscribe to our newsletter to get notified when registrations open.
              </p>
            </div>
          </div>
        </section>

        {/* ── Partner With Us CTA ── */}
        <section className="py-20 bg-slate-50 text-center border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users size={32} className="text-sky-600" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight leading-[1.05]">Host an event with us</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
              Are you a college, university, or educational trust looking to organize a high-impact seminar, counselling camp, or student fest? Let's collaborate.
            </p>
            <a 
              href="mailto:partnerships@promoteducation.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-sky-500 transition-all shadow-lg shadow-slate-900/10"
            >
              Partner With Us <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
