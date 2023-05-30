import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

function Profile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [currentLocation, setCurrentLocation] = useState("")
    const [nextDestinations, setNextDestinations] = useState("")
    const [password, setPassword] = useState("")
    const [password_2, setPassword_2] = useState("")
    const [influencer, setInfluencer] = useState(undefined)
    const [picture, setPicture] = useState(null)

    const [alert, setAlert] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const influencer_decoded = jwt_decode(token).influencer
        setInfluencer(influencer_decoded)

        setName(influencer_decoded.name)
        setEmail(influencer_decoded.email)
        setCurrentLocation(influencer_decoded.currentLocation || "")
        setNextDestinations(influencer_decoded.nextDestinations || "")
        setPicture(influencer_decoded?.picture)
    }, [])

    /* useEffect(() => {
        setPicture(influencer?.picture)
        console.log("updating picture")
    }, [influencer]) */

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password !== password_2) {
                const msg = "The two passwords are not identical"
                console.error(msg)
                setAlert({ msg, color: "red" })
                setSuccess(false)
                return
            }

            const formData = new FormData()
            formData.append("picture", picture)
            formData.append("name", name)
            formData.append("email", email)
            if (password) formData.append("password", password)
            formData.append("currentLocation", currentLocation)
            formData.append("nextDestinations", nextDestinations)

            const res = await axios.put(
                `${process.env.REACT_APP_APP_API}/api/influencer/${influencer._id}`,
                formData
            )
            console.log("modification SUCCESS")
            setPassword("")
            setPassword_2("")

            const { token } = res.data

            localStorage.setItem("token", token)
            setInfluencer(jwt_decode(token).influencer)

            setAlert(null)
            setSuccess(true)
        } catch (err) {
            console.log("modification ERROR", err)
            setAlert({ msg: err.response.data.error, color: "red" })
            setSuccess(false)
        }
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {alert && (
                    <div
                        className={`flex justify-between text-white shadow-inner rounded p-3 bg-red-600 mb-2`}
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

                {success && (
                    <div
                        className={`flex justify-between text-white shadow-inner rounded p-3 bg-green-600 mb-2`}
                    >
                        <p className="self-center text-sm">
                            You have successfully updated your profile .
                        </p>
                        <strong
                            className="text-xl align-center cursor-pointer alert-del"
                            onClick={() => setSuccess(false)}
                        >
                            ×
                        </strong>
                    </div>
                )}

                <div className="bg-white shadow rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-4">
                        <div className="mb-4">
                            <img
                                className="w-32 h-32 rounded-full mx-auto"
                                src={
                                    (influencer?.picture &&
                                        `${process.env.REACT_APP_APP_API}/influencer/profilePicture/${influencer.picture}`) ||
                                    `${process.env.REACT_APP_APP_API}/influencer/profilePicture/user.png`
                                }
                                alt="profile"
                            />
                        </div>
                        Influencer Profile{" "}
                        <span className="text-gray-400 text-sm ">
                            {" "}
                            last update : {/* 12-12-2023 */}
                            {influencer && influencer.updated_at.split("T")[0]}
                        </span>
                    </h1>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="currentLocation"
                        >
                            Current Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="currentLocation"
                            type="text"
                            placeholder="Current Location"
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="nextDestinations"
                        >
                            Next Destinations
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nextDestinations"
                            type="text"
                            placeholder="Next Destinations"
                            value={nextDestinations}
                            onChange={(e) =>
                                setNextDestinations(e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
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
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={password_2}
                            onChange={(e) => setPassword_2(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="picture"
                        >
                            Profile picture
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="file"
                            placeholder="Picture"
                            onChange={(e) => setPicture(e.target.files[0])}
                        />
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile
