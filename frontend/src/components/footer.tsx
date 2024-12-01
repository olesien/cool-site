import '../footer.css'

export function FooterAndLogos() {
  const logos = [
    { id: 1, src: '/images/klarna.jpg', alt: 'Klarna' },
    { id: 2, src: '/images/mastercard.jpg', alt: 'Mastercard' },
    { id: 3, src: '/images/amex.jpg', alt: 'Amex' },
    { id: 4, src: '/images/visa.jpg', alt: 'Visa' },
    { id: 5, src: '/images/eu.jpg', alt: 'EU' },
  ]

  return (
    <footer className="footer">
      <div className="logos-container">
        {logos.map((logo) => (
          <img
            key={logo.id}
            src={logo.src}
            alt={logo.alt}
            className="footer-logo"
          />
        ))}
      </div>
    </footer>
  );
}
