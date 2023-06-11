import * as React from "react"
import { useState } from "react"

import { Routes, Route, Outlet, Link } from "react-router-dom"
import Index from "./components/Index"
import Influencers from "./components/Influencers"
import Signup from "./components/Signup"
import SocialMedias from "./components/SocialMedias"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Header from "./components/influencer/Header"

export default function App() {
    return (
        <>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="influencers" element={<Influencers />} />
                </Route>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Header />}>
                    <Route index element={<Profile />} />
                    <Route path="socialMedias" element={<SocialMedias />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    )
}

function Layout() {
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
                                        className="block py-2 px-2 text-white"
                                    >
                                        Accueil
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/influencers"
                                        className="block py-2 px-2 text-white"
                                    >
                                        Influenceurs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/signup"
                                        className="block py-2 px-2 text-white"
                                    >
                                        Sign up as an influencer
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/login"
                                        className="block py-2 px-2 text-white"
                                    >
                                        Login
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

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
