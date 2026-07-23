export function Footer() {
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
            className="text-xs text-light-gray hover:text-turquoise transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
