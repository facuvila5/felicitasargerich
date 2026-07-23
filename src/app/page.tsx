"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { galleries, getSlideImages } from "@/lib/galleries"

function BrushDivider() {
  return (
    <div className="relative h-8 overflow-hidden">
      <svg
        viewBox="0 0 1200 12"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,6 C100,2 200,10 300,5 C400,0 500,9 600,4 C700,0 800,8 900,3 C1000,0 1100,7 1200,5"
          fill="none"
          stroke="#4ECDC4"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
          className="animate-[brush-draw_2s_ease-out_forwards]"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: 1400,
          }}
        />
      </svg>
    </div>
  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slides = getSlideImages()

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 700)
    },
    [isAnimating],
  )

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length],
  )
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length],
  )

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <img
            src={src}
            alt={`Obra ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-charcoal" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm z-10"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-charcoal" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === current ? "w-8 bg-charcoal" : "w-2 bg-charcoal/30",
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function GalleryGrid() {
  return (
    <section id="obra" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl mb-2 brush-stroke inline-block">
          Obra
        </h2>
        <div className="mt-6 mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleries.map((gallery) => (
            <Link
              key={gallery.slug}
              href={`/galeria/${gallery.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden mb-4 rounded-sm">
                <img
                  src={gallery.cover}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-serif text-lg group-hover:text-turquoise transition-colors duration-300">
                {gallery.title}
              </h3>
              <p className="text-sm text-gray mt-1">
                {gallery.imageCount} obras
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function SobreMi() {
  return (
    <section id="sobre-mi" className="py-32 px-6 lg:px-12 bg-warm">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="aspect-[3/4] bg-charcoal/5 rounded-sm" />
        <div>
          <h2 className="font-serif text-3xl mb-2 brush-stroke inline-block">
            Sobre mí
          </h2>
          <div className="mt-6 mb-10" />
          <div className="space-y-6 text-gray leading-relaxed">
            <p>
              Felicitas Argerich es artista plástica con formación en la
              Universidad de San Andrés y trayectoria en exhibiciones
              individuales y colectivas en Buenos Aires.
            </p>
            <p>
              Su obra explora la materialidad y la abstracción, trabajando con
              óleo, acrílico y técnicas mixtas sobre diferentes soportes.
            </p>
            <p>
              Sus exposiciones incluyen muestras en galerías de Buenos Aires y
              participaciones en colectivas en espacios independientes y
              culturales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contacto() {
  return (
    <section id="contacto" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-3xl mb-2 brush-stroke inline-block">
          Contacto
        </h2>
        <div className="mt-6 mb-12" />
        <p className="text-gray mb-10 max-w-md mx-auto">
          Para consultas sobre obra, exposiciones o colaboraciones.
        </p>
        <a
          href="mailto:felicitasargerich@gmail.com"
          className="inline-flex items-center gap-2 text-sm border-b-2 border-turquoise pb-1 text-turquoise hover:text-turquoise-dark hover:border-turquoise-dark transition-colors duration-300"
        >
          felicitasargerich@gmail.com
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSlider />
      <BrushDivider />
      <GalleryGrid />
      <SobreMi />
      <BrushDivider />
      <Contacto />
      <Footer />
    </>
  )
}
