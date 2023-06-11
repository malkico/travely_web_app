import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.href = "/login"
}

function Header() {
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            window.location.href = "/login"
        }
    }, [])

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
            <header className="bg-blue-500 py-4">
                <div className="container mx-auto px-4">
                    <nav className="bg-blue-500">
                        <div
                            className="container mx-auto px-4 md:flex md:items-center md:justify-between
                        "
                        >
                            <div className="flex items-center justify-between py-4">
                                <div className="text-white text-xl font-bold">
                                    Plateforme de Voyages
                                </div>
                                <button
                                    className="text-white focus:outline-none md:hidden"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {isMenuOpen ? (
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path d="M3 12h18M3 6h18M3 18h18" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                            <ul
                                className={`md:flex ${
                                    isMenuOpen ? "block" : "hidden"
                                }`}
                            >
                                <li>
                                    <a
                                        href="/"
                                        className="block py-2 px-4 text-white"
                                    >
                                        Accueil
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/profile"
                                        className="block py-2 px-4 text-white"
                                    >
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/profile/socialMedias"
                                        className="block py-2 px-4 text-white"
                                    >
                                        Social Medias
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/logout"
                                        className="block py-2 px-4 text-white"
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <Outlet />
        </>
    )
}

export default Header
