export interface Gallery {
  slug: string
  title: string
  cover: string
  imageCount: number
}

export const galleries: Gallery[] = [
  {
    slug: "dibujos",
    title: "Dibujos",
    cover: "/obras/portadas/dibujos.jpg",
    imageCount: 38,
  },
  {
    slug: "tono-local",
    title: "Tono local",
    cover: "/obras/portadas/tono-local.jpg",
    imageCount: 11,
  },
  {
    slug: "pintura-en-la-luz",
    title: "Pintura en la luz",
    cover: "/obras/portadas/pintura-en-la-luz.jpg",
    imageCount: 27,
  },
  {
    slug: "soltando-las-formas",
    title: "Soltando las formas",
    cover: "/obras/portadas/soltando-las-formas.jpg",
    imageCount: 22,
  },
  {
    slug: "mujeres-y-oficios",
    title: "Mujeres y oficios",
    cover: "/obras/portadas/mujeres-y-oficios.jpg",
    imageCount: 13,
  },
  {
    slug: "constructivo",
    title: "Constructivo",
    cover: "/obras/portadas/constructivo.jpg",
    imageCount: 2,
  },
]

export const slideCount = 9

export function getGalleryImages(slug: string): string[] {
  const gallery = galleries.find((g) => g.slug === slug)
  if (!gallery) return []
  return Array.from({ length: gallery.imageCount }, (_, i) =>
    `/obras/${slug}/${slug}_${String(i + 1).padStart(2, "0")}.jpg`
  )
}

export function getSlideImages(): string[] {
  return Array.from({ length: slideCount }, (_, i) =>
    `/obras/slide/slide_${String(i + 1).padStart(2, "0")}.jpg`
  )
}
