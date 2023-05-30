import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"

function SocialMedias() {
    const [list, setList] = useState([])
    const [alert, setAlert] = useState(null)
    const [success, setSuccess] = useState(false)
    const [url, setUrl] = useState("")
    const [followersCount, setFollowersCount] = useState("")
    const [influencer, setInfluencer] = useState(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_APP_API}/api/influencer/${influencer._id}/addSocialMedia`,
                {
                    url,
                    followersCount
                }
            )
            console.log("profile added successfully")
            setSuccess(true)
            setAlert(null)
            setUrl("")
            setFollowersCount("")
            const { token } = res.data
            localStorage.setItem("token", token)
            setInfluencer(jwt_decode(token).influencer)
        } catch (error) {
            console.error(error)
            setAlert({ msg: error.response.data.error, color: "red" })
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_APP_API}/api/socialMedia/${id}`
            )
            if (res.status === 200) {
                console.log("profile deleted successfully")
                setAlert(null)
                const res_2 = await axios.get(
                    `${process.env.REACT_APP_APP_API}/api/influencer/${influencer._id}/token`
                )
                const { token } = res_2.data
                localStorage.setItem("token", token)
                setInfluencer(jwt_decode(token).influencer)
            }
        } catch (error) {
            console.error(error)
            setAlert({ msg: error.response.data.error, color: "red" })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const influencer_token = jwt_decode(token).influencer
        setInfluencer(influencer_token)
    }, [])

    useEffect(() => {
        console.log("influencer:", influencer)
        setList(influencer?.socialMedias || [])
    }, [influencer])

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
                    <h1 className="text-3xl font-bold mb-4">Social Medias</h1>

                    <div className="mb-4">
                        <ul className="list-disc ml-8">
                            {list.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span className="flex items-center">
                                            <span className="mr-2 ">
                                                <a
                                                    href={item.url}
                                                    className="hover:underline mr-1"
                                                >
                                                    {item.url}
                                                </a>{" "}
                                                | {item.formattedFollowersCount}{" "}
                                                followers{" "}
                                                <FontAwesomeIcon
                                                    className="ml-2 cursor-pointer"
                                                    title="Delete"
                                                    icon={faTrashAlt}
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                />{" "}
                                            </span>
                                        </span>
                                    </li>
                                )
                            })}
                            <span className="flex items-center hidden">
                                <span className=" text-blue-500 cursor-pointer hover:underline ">
                                    Add new
                                </span>
                            </span>
                        </ul>
                    </div>
                    <div id="addSocialMediaForm" className="">
                        <form className="mb-4">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="url"
                                >
                                    URL
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:w-1/2 w-full"
                                    id="url"
                                    type="text"
                                    placeholder="URL"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="followersCount"
                                >
                                    How many followers / subscribers ?
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:w-1/2 w-full"
                                    id="followersCount"
                                    type="number"
                                    value={followersCount}
                                    onChange={(e) =>
                                        setFollowersCount(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                        </form>
                    </div>

                    {/* <script>
    const addSocialMediaButton = document.querySelector(".text-green-500");
    const addSocialMediaForm = document.getElementById("addSocialMediaForm");

    addSocialMediaButton.addEventListener("click", () => {
      addSocialMediaForm.classNameList.toggle("hidden");
    });
</script> */}
                </div>
            </div>
        </>
    )
}

export default SocialMedias
