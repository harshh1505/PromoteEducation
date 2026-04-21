'use client'

import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const allCities = [
  { name: 'Bangalore', colleges: '520+', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/vidhana-soudha-bangalore-karnataka-hero?qlt=82&ts=1742199603184' },
  { name: 'Chennai', colleges: '310+', image: 'https://cdn.britannica.com/13/100813-050-708D93FE/Kapaleeswarar-temple-Hindu-Mylapore-Chennai-India-Tamil.jpg?w=800' },
  { name: 'Hyderabad', colleges: '290+', image: 'https://t3.ftcdn.net/jpg/12/78/75/42/360_F_1278754237_rMGKqTmKIPIUYZh04kmIIM3P1OCKqOXi.jpg' },
  { name: 'Pune', colleges: '380+', image: 'https://www.nobroker.in/blog/wp-content/uploads/2025/02/cost-of-living-in-pune.webp' },
  { name: 'Bhubaneswar', colleges: '180+', image: 'https://etimg.etb2bimg.com/photo/101281045.cms' },
  { name: 'Kolkata', colleges: '240+', image: 'https://s3.india.com/wp-content/uploads/2025/07/kolkata-DIY.jpg?impolicy=Medium_Widthonly&w=800&h=541' },
  { name: 'Mumbai', colleges: '450+', image: 'https://media.cntraveler.com/photos/58e3eb2d03ca992cb6a9cc29/16:9/w_2240,c_limit/MAG-SEPT16-mumbai-brian-pineda.jpg' },
  { name: 'Delhi', colleges: '800+', image: 'https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg?w=800' },
  { name: 'Noida', colleges: '210+', image: 'https://aigroyal.in/wp-content/uploads/2021/10/smart-city_1464069665.jpeg' },
]

const CityCard = ({ city }: { city: any }) => (
  <Link 
    href={`/rankings?city=${encodeURIComponent(city.name)}`}
    className="flex-shrink-0 w-[180px] md:w-[220px] group cursor-pointer px-2 block"
  >
    <div className="relative aspect-square rounded-[32px] overflow-hidden mb-2 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
      <img 
        src={city.image} 
        alt={city.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-4 left-0 right-0 text-center px-2">
         <div className="text-white font-bold text-sm tracking-tight mb-0.5">{city.name}</div>
         <div className="text-white/50 text-[9px] uppercase font-bold tracking-[0.1em]">{city.colleges} Colleges</div>
      </div>
    </div>
  </Link>
)

export default function PopularCitiesSection() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-4 h-[2px] bg-sky-500" />
          <span className="text-[11px] font-bold text-sky-500 uppercase tracking-[0.2em]">Study Destinations</span>
          <div className="w-4 h-[2px] bg-sky-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Top <span className="italic text-slate-700">Educational</span> Hubs
        </h2>
      </div>

      <div className="relative">
        {/* Infinite Scroller */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...allCities, ...allCities, ...allCities].map((city, i) => (
            <CityCard key={`${city.name}-${i}`} city={city} />
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  )
}
