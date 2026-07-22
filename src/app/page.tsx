"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  { id: 1, color: "#E8E4DF", title: "Obra 1" },
  { id: 2, color: "#D4CFC7", title: "Obra 2" },
  { id: 3, color: "#C7BEB3", title: "Obra 3" },
  { id: 4, color: "#B5ADA2", title: "Obra 4" },
  { id: 5, color: "#A39B90", title: "Obra 5" },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-cream/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link href="/" className="font-serif text-xl tracking-tight">
            Felicitas Argerich
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {["Obra", "Sobre mí", "Contacto"].map((item) => (
              <Link
                key={item}
                href={item === "Obra" ? "/#obra" : item === "Sobre mí" ? "/#sobre-mi" : "/#contacto"}
                className="text-sm text-gray hover:text-charcoal transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 bg-cream z-[60] md:hidden transition-transform duration-500",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-10 mt-20">
          {["Obra", "Sobre mí", "Contacto"].map((item) => (
            <Link
              key={item}
              href={item === "Obra" ? "/#obra" : item === "Sobre mí" ? "/#sobre-mi" : "/#contacto"}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif text-charcoal"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating],
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: slide.color }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40 text-sm font-light tracking-widest uppercase">
                {slide.title}
              </span>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-charcoal" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-charcoal" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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

function ObraGrid() {
  const works = [
    { id: 1, color: "#E8E4DF", title: "Sin título I", year: "2024", medium: "Óleo sobre lienzo" },
    { id: 2, color: "#D4CFC7", title: "Sin título II", year: "2024", medium: "Técnica mixta" },
    { id: 3, color: "#C7BEB3", title: "Sin título III", year: "2023", medium: "Acrílico sobre tela" },
    { id: 4, color: "#B5ADA2", title: "Sin título IV", year: "2023", medium: "Óleo sobre lienzo" },
    { id: 5, color: "#A39B90", title: "Sin título V", year: "2023", medium: "Técnica mixta" },
    { id: 6, color: "#968E83", title: "Sin título VI", year: "2022", medium: "Acrílico sobre tela" },
  ]

  return (
    <section id="obra" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl mb-4">Obra</h2>
        <div className="w-12 h-px bg-charcoal mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div key={work.id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-4">
                <div
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundColor: work.color }}
                />
              </div>
              <h3 className="font-serif text-lg">{work.title}</h3>
              <p className="text-sm text-gray mt-1">
                {work.medium}, {work.year}
              </p>
            </div>
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
        <div className="aspect-[3/4] bg-charcoal/5" />
        <div>
          <h2 className="font-serif text-3xl mb-4">Sobre mí</h2>
          <div className="w-12 h-px bg-charcoal mb-10" />
          <div className="space-y-6 text-gray leading-relaxed">
            <p>
              Felicitas Argerich es artista plástica con formación en la Universidad de San Andrés
              y trayectoria en exhibiciones individuales y colectivas en Buenos Aires.
            </p>
            <p>
              Su obra explora la materialidad y la abstracción, trabajando con óleo, acrílico
              y técnicas mixtas sobre diferentes soportes.
            </p>
            <p>
              Sus exposiciones incluyen muestras en galerías de Buenos Aires y participaciones
              en colectivas en espacios independientes y culturales.
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
        <h2 className="font-serif text-3xl mb-4">Contacto</h2>
        <div className="w-12 h-px bg-charcoal mx-auto mb-12" />
        <p className="text-gray mb-10 max-w-md mx-auto">
          Para consultas sobre obra, exposiciones o colaboraciones.
        </p>
        <a
          href="mailto:felicitasargerich@gmail.com"
          className="inline-flex items-center gap-2 text-sm border-b border-charcoal pb-1 hover:text-gray hover:border-gray transition-colors duration-300"
        >
          felicitasargerich@gmail.com
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-12 border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-light-gray">
          © {new Date().getFullYear()} Felicitas Argerich
        </span>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/felicitasargerich"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-light-gray hover:text-charcoal transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSlider />
      <ObraGrid />
      <SobreMi />
      <Contacto />
      <Footer />
    </>
  )
}
