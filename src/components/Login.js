import React, { useState } from "react"
import axios from "axios"
import logo from "../logo11.png"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_APP_API}/api/influencer/login`,
                {
                    email: email,
                    password: password
                }
            )
            console.log("LOGIN SUCCESS", res)
            setEmail("")
            setPassword("")
            setAlert(null)

            const { token } = res.data

            localStorage.setItem("token", token)

            window.location.href = "/profile"
        } catch (err) {
            console.log("LOGIN ERROR", err)
            setAlert({ msg: err.response.data.error, color: "red" })
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-xs">
                    {alert && (
                        <div
                            className={`flex justify-between text-white shadow-inner rounded p-3 bg-${alert.color}-600 mb-2`}
                        >
                            <p className="self-center text-sm">{alert.msg}</p>
                            <strong
                                className="text-xl align-center cursor-pointer alert-del"
                                onClick={() => setAlert(null)}
                            >
                                ×
                            </strong>
                        </div>
                    )}

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <h1 className="text-2xl text-center text-gray-900 mb-6">
                                Log in
                            </h1>
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Log in
                            </button>
                            <span className="inline-block align-baseline mt-2">
                                Don't have an account?{" "}
                                <a
                                    href="/signup"
                                    className="font-bold text-sm text-blue-500 hover:text-blue-800"
                                >
                                    Sign up
                                </a>
                            </span>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mb-4">
                        &copy;2023 <a href="/">{process.env.REACT_APP_NAME}</a>.
                        All rights reserved.
                    </p>
                    <a href="/">
                        <img
                            src={logo}
                            alt={`logo ${process.env.REACT_APP_NAME}`}
                            width={120}
                            className="mx-auto"
                        />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Login
