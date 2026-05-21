import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../components/Notification'
import Navbar from '../components/Navbar'
import { Capacitor } from '@capacitor/core'
import '../App.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { user, login, logout } = useAuth()
    const navigate = useNavigate()
    const { toast } = useNotification()
    const hasRedirected = useRef(false)

    // Redirect if already logged in
    useEffect(() => {
        if (user && !hasRedirected.current) {
            if (Capacitor.isNativePlatform()) {
                if (user.role !== 'admin') {
                    logout()
                    toast.error('AKUN INI BUKAN ROLE ADMIN')
                    return
                }
                hasRedirected.current = true
                navigate('/admin', { replace: true })
            } else {
                hasRedirected.current = true
                toast.info('Anda sudah login! Mengarahkan ke halaman profil...')
                navigate('/profile', { replace: true })
            }
        }
    }, [user, navigate, toast, logout])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!email || !password) {
            setError('Mohon isi semua field')
            return
        }
        setLoading(true)
        const result = await login(email, password)
        setLoading(false)
        if (result.success) {
            navigate('/')
        } else {
            setError(result.error)
        }
    }

    if (user) {
        return (
            <div className="app">
                {!Capacitor.isNativePlatform() && <Navbar />}
                <div className="auth-page">
                    <div className="auth-split-container">
                        <div className="auth-card-modern">
                            <h1>Anda Sudah Login</h1>
                            <p>Mengalihkan ke halaman profil...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            {!Capacitor.isNativePlatform() && <Navbar />}

            <div className="auth-page-modern">
                {/* Left Panel — Branding */}
                <div className="auth-left-panel">
                    <div className="auth-left-content">
                        <div className="auth-brand-logo">
                            <img src="/images/logo.svg" alt="Salahuddin Library" onError={e => e.target.style.display = 'none'} />
                        </div>
                        <h1 className="auth-brand-title">
                            Salahuddin<br />
                            <span>Library</span>
                        </h1>
                        <p className="auth-brand-tagline">
                            Tempat belajar, berbagi ilmu, dan menumbuhkan cinta membaca untuk generasi masa depan.
                        </p>

                        <div className="auth-stats-row">
                            <div className="auth-stat-item">
                                <span className="auth-stat-num">3</span>
                                <span className="auth-stat-label">Buku Maks</span>
                            </div>
                            <div className="auth-stat-item">
                                <span className="auth-stat-num">4</span>
                                <span className="auth-stat-label">Program</span>
                            </div>
                            <div className="auth-stat-item">
                                <span className="auth-stat-num">∞</span>
                                <span className="auth-stat-label">Seumur Hidup</span>
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
                            <h2 className="auth-form-title">Selamat Datang 👋</h2>
                            <p className="auth-form-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
                        </div>

                        {error && (
                            <div className="auth-error-modern">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form-modern">
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
                                        placeholder="Masukkan password"
                                        required
                                        disabled={loading}
                                        className="auth-input-modern"
                                    />
                                    <button
                                        type="button"
                                        className="auth-toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
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

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="auth-spinner"></span>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Masuk
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {!Capacitor.isNativePlatform() && (
                            <p className="auth-redirect-text">
                                Belum punya akun?{' '}
                                <Link to="/register" className="auth-redirect-link">Daftar Sekarang</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
