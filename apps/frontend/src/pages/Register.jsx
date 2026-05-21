import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../components/Notification'
import Navbar from '../components/Navbar'
import '../App.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, register } = useAuth()
    const navigate = useNavigate()
    const { toast } = useNotification()
    const hasRedirected = useRef(false)

    // Redirect if already logged in
    useEffect(() => {
        if (user && !hasRedirected.current) {
            hasRedirected.current = true
            toast.info('Anda sudah memiliki akun! Mengarahkan ke halaman profil...')
            navigate('/profile', { replace: true })
        }
    }, [user, navigate, toast])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            toast.error('Mohon lengkapi semua data pendaftaran')
            return
        }

        if (name.trim().split(' ').length < 2) {
            toast.error('Nama Lengkap harus terdiri dari minimal 2 kata (Nama Depan dan Belakang)')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Password dan Konfirmasi Password tidak cocok')
            return
        }

        if (password.length < 6) {
            toast.error('Password harus memiliki minimal 6 karakter')
            return
        }

        setLoading(true)
        const result = await register(name, email, password)
        setLoading(false)

        if (result.success) {
            toast.success('Registrasi berhasil! Selamat datang di Salahuddin Library.')
            navigate('/?showMemberOffer=true')
        } else {
            let errorMessage = result.error || 'Terjadi kesalahan pada server'
            if (errorMessage.toLowerCase().includes('invalid email') || errorMessage.toLowerCase().includes('is invalid')) {
                errorMessage = 'Format email tidak valid. Pastikan email Anda benar.'
            } else if (errorMessage.toLowerCase().includes('already registered')) {
                errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain atau login.'
            } else if (errorMessage.toLowerCase().includes('password should be')) {
                errorMessage = 'Password minimal 6 karakter.'
            } else if (errorMessage.toLowerCase().includes('rate limit')) {
                errorMessage = 'Terlalu banyak percobaan. Silakan coba beberapa saat lagi.'
            }
            toast.error(`Gagal Mendaftar: ${errorMessage}`)
        }
    }

    if (user) {
        return (
            <div className="app">
                <Navbar />
                <div className="auth-page-modern">
                    <div className="auth-left-panel">
                        <div className="auth-left-content">
                            <div className="auth-brand-logo">
                                <img src="/images/logo.svg" alt="Salahuddin Library" onError={e => e.target.style.display = 'none'} />
                            </div>
                            <h1 className="auth-brand-title">Salahuddin<br /><span>Library</span></h1>
                        </div>
                    </div>
                    <div className="auth-right-panel">
                        <div className="auth-form-wrapper">
                            <h2 className="auth-form-title">Anda Sudah Memiliki Akun</h2>
                            <p className="auth-form-subtitle">Mengalihkan ke halaman profil...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            <Navbar />

            <div className="auth-page-modern">
                {/* Left Panel — Branding */}
                <div className="auth-left-panel auth-left-panel--register">
                    <div className="auth-left-content">
                        <div className="auth-brand-logo">
                            <img src="/images/logo.svg" alt="Salahuddin Library" onError={e => e.target.style.display = 'none'} />
                        </div>
                        <h1 className="auth-brand-title">
                            Salahuddin<br />
                            <span>Library</span>
                        </h1>
                        <p className="auth-brand-tagline">
                            Bergabung dan jadilah bagian dari komunitas literasi kami. Akses buku, program edukatif, dan lebih banyak lagi.
                        </p>

                        <div className="auth-register-perks">
                            <div className="auth-perk-item">
                                <div className="auth-perk-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                </div>
                                <div>
                                    <strong>Akses Koleksi Buku</strong>
                                    <span>Ratusan judul pilihan untuk semua usia</span>
                                </div>
                            </div>
                            <div className="auth-perk-item">
                                <div className="auth-perk-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <div>
                                    <strong>Program Edukasi</strong>
                                    <span>IT Class, Public Speaking, Story Telling</span>
                                </div>
                            </div>
                            <div className="auth-perk-item">
                                <div className="auth-perk-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                </div>
                                <div>
                                    <strong>Member Seumur Hidup</strong>
                                    <span>Bayar sekali, nikmati selamanya</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating elements */}
                        <div className="auth-deco-circle auth-deco-1"></div>
                        <div className="auth-deco-circle auth-deco-2"></div>
                        <div className="auth-deco-circle auth-deco-3"></div>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="auth-right-panel">
                    <div className="auth-form-wrapper">
                        <div className="auth-form-header">
                            <h2 className="auth-form-title">Buat Akun Baru 🎉</h2>
                            <p className="auth-form-subtitle">Daftar gratis dan mulai perjalanan literasi Anda</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form-modern">
                            {/* Name Field */}
                            <div className="auth-field-group">
                                <label className="auth-field-label">Nama Lengkap</label>
                                <div className="auth-input-wrapper">
                                    <span className="auth-input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Nama depan dan belakang"
                                        required
                                        disabled={loading}
                                        className="auth-input-modern"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="auth-field-group">
                                <label className="auth-field-label">Email</label>
                                <div className="auth-input-wrapper">
                                    <span className="auth-input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="nama@email.com"
                                        required
                                        disabled={loading}
                                        className="auth-input-modern"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="auth-field-group">
                                <label className="auth-field-label">Password</label>
                                <div className="auth-input-wrapper">
                                    <span className="auth-input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        required
                                        disabled={loading}
                                        className="auth-input-modern"
                                    />
                                    <button type="button" className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="auth-field-group">
                                <label className="auth-field-label">Konfirmasi Password</label>
                                <div className="auth-input-wrapper">
                                    <span className="auth-input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Ulangi password"
                                        required
                                        disabled={loading}
                                        className="auth-input-modern"
                                    />
                                    <button type="button" className="auth-toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                                        {showConfirmPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="auth-spinner"></span>
                                        Membuat Akun...
                                    </>
                                ) : (
                                    <>
                                        Daftar Sekarang
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="auth-redirect-text">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="auth-redirect-link">Masuk Sekarang</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
