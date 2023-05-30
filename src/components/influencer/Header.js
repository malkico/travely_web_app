import { useEffect } from "react"
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

    return (
        <>
            <header className="bg-blue-500 py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-white text-xl font-bold">
                            Plateforme de Voyages
                        </div>
                        <ul className="flex items-center space-x-4">
                            <li>
                                <a href="/profile" className="text-white">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="/profile/socialMedias" className="text-white">
                                    Social Medias
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/logout"
                                    className="text-white"
                                    onClick={logout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
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
