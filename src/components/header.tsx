"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#obra", label: "Obra" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#contacto", label: "Contacto" },
]

export function Header() {
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
          "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-500",
          scrolled ? "shadow-sm" : "",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/firma.jpg"
              alt="Felicitas Argerich"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-gray hover:text-charcoal transition-colors duration-300"
              >
                {item.label}
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
          "fixed inset-0 bg-white z-[60] md:hidden transition-transform duration-500",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-10 mt-20">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
