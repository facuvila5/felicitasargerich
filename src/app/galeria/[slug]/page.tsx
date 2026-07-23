"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lightbox } from "@/components/lightbox"
import { galleries, getGalleryImages } from "@/lib/galleries"
import { useParams } from "next/navigation"

export default function GalleryPage() {
  const params = useParams()
  const slug = params.slug as string
  const gallery = galleries.find((g) => g.slug === slug)
  const images = getGalleryImages(slug)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!gallery) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-4">Galería no encontrada</h1>
            <Link href="/" className="text-turquoise hover:text-turquoise-dark transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#obra"
            className="inline-flex items-center gap-2 text-sm text-gray hover:text-turquoise transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a obra
          </Link>

          <h1 className="font-serif text-4xl mb-2 brush-stroke inline-block">
            {gallery.title}
          </h1>
          <div className="mt-6 mb-16" />

          <div className="masonry">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightboxIndex(i)}
                className="w-full cursor-pointer group"
              >
                <img
                  src={src}
                  alt={`${gallery.title} ${i + 1}`}
                  className="w-full h-auto block group-hover:opacity-80 transition-opacity duration-300"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
