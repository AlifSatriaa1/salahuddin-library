import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../App.css'

function Footer() {
    const contactNumber = '+62 811-6834-477'
    const whatsappLink = 'https://wa.me/628116834477'
    const navigate = useNavigate()
    const location = useLocation()

    const scrollToSection = (sectionId, e) => {
        e?.preventDefault()
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const el = document.getElementById(sectionId)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 120)
        } else {
            const el = document.getElementById(sectionId)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="footer-premium">
            {/* Top wave decoration */}
            <div className="footer-wave">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 60L48 51.3C96 42.7 192 25.3 288 20C384 14.7 480 21.3 576 28C672 34.7 768 41.3 864 38.7C960 36 1056 24 1152 18.7C1248 13.3 1344 14.7 1392 15.3L1440 16V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z" fill="#064e3b" />
                </svg>
            </div>

            <div className="footer-premium-body">
                <div className="footer-premium-container">

                    {/* Brand Column */}
                    <div className="footer-premium-col footer-brand-col">
                        <div className="footer-premium-logo">
                            <img src="/images/logo.svg" alt="Salahuddin Library" onError={e => e.target.style.display = 'none'} />
                            <span>Salahuddin Library</span>
                        </div>
                        <p className="footer-premium-tagline">
                            Pusat literasi untuk membangun generasi cerdas dan kritis melalui budaya membaca yang berkelanjutan.
                        </p>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-whatsapp-cta">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Hubungi via WhatsApp
                        </a>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-premium-col">
                        <h4 className="footer-premium-heading">Navigasi</h4>
                        <ul className="footer-premium-links">
                            <li><Link to="/">Beranda</Link></li>
                            <li><Link to="/books">Katalog Buku</Link></li>
                            <li><a href="#about" onClick={(e) => scrollToSection('about', e)}>Tentang Kami</a></li>
                            <li><a href="#program" onClick={(e) => scrollToSection('program', e)}>Program Kami</a></li>
                            <li><Link to="/informasi">Informasi</Link></li>
                        </ul>
                    </div>

                    {/* Program Column */}
                    <div className="footer-premium-col">
                        <h4 className="footer-premium-heading">Program</h4>
                        <ul className="footer-premium-links">
                            <li><span>Children Read Out-Loud</span></li>
                            <li><span>IT Class</span></li>
                            <li><span>Story Telling Class</span></li>
                            <li><span>Public Speaking Class</span></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-premium-col">
                        <h4 className="footer-premium-heading">Informasi</h4>
                        <div className="footer-premium-contact">
                            <div className="footer-contact-row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                <span>Lambaro Skep, Kota Banda Aceh, Aceh</span>
                            </div>
                            <div className="footer-contact-row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                <span>Senin – Minggu, 08.00 – 17.00</span>
                            </div>
                            <div className="footer-contact-row">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">{contactNumber}</a>
                            </div>
                            <div className="footer-member-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                                <span>Member Seumur Hidup — Rp 50.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-premium-bottom">
                <div className="footer-premium-container footer-bottom-row">
                    <p className="footer-copyright">© 2024 Salahuddin Library. Untuk literasi Indonesia 🌿</p>
                    <div className="footer-bottom-links">
                        <Link to="/login">Masuk</Link>
                        <Link to="/register">Daftar</Link>
                        <a href="#feedback" onClick={(e) => scrollToSection('feedback', e)}>Feedback</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
