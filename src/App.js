import * as React from "react"
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
                                <a href="/" className="text-white">
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a href="/influencers" className="text-white">
                                    Influenceurs
                                </a>
                            </li>
                            <li>
                                <a href="/signup" className="text-white">
                                    Sign up as an influencer
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-white">
                                    Login
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
