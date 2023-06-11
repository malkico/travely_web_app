import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Autocomplete from "react-google-autocomplete"

const distance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
        return 0
    } else {
        var radlat1 = (Math.PI * lat1) / 180
        var radlat2 = (Math.PI * lat2) / 180
        var theta = lon1 - lon2
        var radtheta = (Math.PI * theta) / 180
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
            dist = 1
        }
        dist = Math.acos(dist)
        dist = (dist * 180) / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === "K") {
            dist = dist * 1.609344
        }
        if (unit === "N") {
            dist = dist * 0.8684
        }
        return dist
    }
}

function Influencers() {
    const [establishment, setEstablishment] = useState("")
    const [fullEstablishment, setFullEstablishment] = useState("")
    const [sortBy, setSortBy] = useState("followers")
    const [minFollowers, setMinFollowers] = useState(0)
    const [influencers, setInfluencers] = useState([])
    const [influencersFiltered, setInfluencersFiltered] = useState([])
    const [modal, setModal] = useState(false)
    const [emailContact, setEmailContact] = useState("")

    const handleFilter = useCallback(() => {
        console.log("sortBy", sortBy)
        console.log("establishment", fullEstablishment)
        console.log("minFollowers", minFollowers)

        let sortedInfluencers
        switch (sortBy) {
            default:
            case "followers":
                sortedInfluencers = [...influencers].sort(
                    (a, b) => b.totalFollowersCount - a.totalFollowersCount
                )

                break
            case "distance_next_destinations":
                console.log("distance_next_destinations ....")
                sortedInfluencers = [...influencers].sort((a, b) => {
                    const distanceA = a.distance_next_destinations ?? -1
                    const distanceB = b.distance_next_destinations ?? -1

                    if (distanceA === -1 && distanceB === -1) {
                        return 0
                    } else if (distanceA === -1) {
                        return 1
                    } else if (distanceB === -1) {
                        return -1
                    } else {
                        return distanceA - distanceB
                    }
                })

                break
            case "distance_current_location":
                sortedInfluencers = [...influencers].sort((a, b) => {
                    const distanceA = a.distance_current_location ?? -1
                    const distanceB = b.distance_current_location ?? -1

                    if (distanceA === -1 && distanceB === -1) {
                        return 0
                    } else if (distanceA === -1) {
                        return 1
                    } else if (distanceB === -1) {
                        return -1
                    } else {
                        return distanceA - distanceB
                    }
                })

                break
        }
        setInfluencersFiltered(sortedInfluencers)
        console.log(
            "sortedInfluencers",
            sortedInfluencers.map(
                (influencer) => influencer.distance_next_destinations
            )
        )
        console.log(
            "sortedInfluencers",
            influencers.map(
                (influencer) => influencer.distance_next_destinations
            )
        )
    }, [fullEstablishment, sortBy, minFollowers, influencers])

    const calcul_distances = useCallback(
        (influencers) => {
            let influencers_with_distance = []
            let distance_next_destinations
            influencers_with_distance = influencers.map((influencer) => {
                if (fullEstablishment && influencer.nextDestinations) {
                    distance_next_destinations = distance(
                        influencer.nextDestinations.split("|")[1],
                        influencer.nextDestinations.split("|")[2],
                        fullEstablishment.split("|")[1],
                        fullEstablishment.split("|")[2],
                        "K"
                    )

                    influencer.distance_next_destinations =
                        Math.round(distance_next_destinations * 100) / 100
                }
                return influencer
            })

            let distance_current_location
            influencers_with_distance = influencers.map((influencer) => {
                if (fullEstablishment && influencer.currentLocation) {
                    distance_current_location = distance(
                        influencer.currentLocation.split("|")[1],
                        influencer.currentLocation.split("|")[2],
                        fullEstablishment.split("|")[1],
                        fullEstablishment.split("|")[2],
                        "K"
                    )

                    influencer.distance_current_location =
                        Math.round(distance_current_location * 100) / 100
                }

                return influencer
            })

            return influencers_with_distance
        },
        [fullEstablishment]
    )

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                `${process.env.REACT_APP_APP_API}/api/influencers`
            )

            console.log(res)

            setInfluencers(
                res.data.sort(
                    (a, b) => b.totalFollowersCount - a.totalFollowersCount
                )
            )

            setInfluencersFiltered(
                res.data.sort(
                    (a, b) => b.totalFollowersCount - a.totalFollowersCount
                )
            )
        }

        fetchData()
    }, [])

    useEffect(() => {
        const influencers_with_distance = calcul_distances(influencers)
        setInfluencersFiltered(influencers_with_distance)
    }, [calcul_distances, influencers])

    useEffect(() => {
        handleFilter()
    }, [handleFilter])

    const handleEstablishmentSelected = (place) => {
        const { formatted_address } = place
        setEstablishment(formatted_address)
        setFullEstablishment(
            `${formatted_address}|${place.geometry.location.lat()}|${place.geometry.location.lng()}`
        )
    }

    const handleEmail = (influencer) => {
        setEmailContact(influencer.email)
        axios
            .put(
                `${process.env.REACT_APP_APP_API}/api/influencer/${influencer._id}/increment/timesContacted`
            )
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handlePopUp = (influencer) => {
        if (influencer)
            axios
                .put(
                    `${process.env.REACT_APP_APP_API}/api/influencer/${influencer._id}/increment/timesConsulted`
                )
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })

        setModal(influencer ? influencer : false)
    }

    return (
        <>
            {modal && (
                <>
                    <div
                        className="fixed z-10 overflow-y-auto top-0 w-full left-0 "
                        id="modal"
                    >
                        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-900 opacity-75" />
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                                &#8203;
                            </span>
                            <div
                                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="border border-gray-300 rounded p-4 mb-4 flex flex-col">
                                        <img
                                            src={
                                                (modal?.picture &&
                                                    `${process.env.REACT_APP_APP_API}/influencer/profilePicture/${modal.picture}`) ||
                                                `${process.env.REACT_APP_APP_API}/influencer/profilePicture/user.png`
                                            }
                                            alt=""
                                            className=" w-20 h-20 rounded-full mx-auto mb-4"
                                        />

                                        <div className=" flex flex-col justify-between text-center">
                                            <h4 className="text-lg font-bold ">
                                                {modal.name}
                                            </h4>
                                            <p>
                                                Total number of followers :
                                                {modal.formattedFollowersCount}
                                            </p>

                                            {modal.socialMedias.length > 0 && (
                                                <>
                                                    <hr className="my-2" />
                                                    <h4 className="text-base font-bold mt-2">
                                                        Profiles on social media
                                                    </h4>
                                                </>
                                            )}
                                            <ul>
                                                {modal.socialMedias.map(
                                                    (socialMedia) => (
                                                        <li
                                                            key={
                                                                socialMedia._id
                                                            }
                                                        >
                                                            <a
                                                                href={
                                                                    socialMedia.url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-blue-500"
                                                            >
                                                                {
                                                                    socialMedia.url
                                                                }
                                                            </a>{" "}
                                                            (
                                                            {
                                                                socialMedia.formattedFollowersCount
                                                            }
                                                            )
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <hr className="my-2" />

                                            <h4 className="text-base font-bold mt-2">
                                                Address distance:{" "}
                                            </h4>

                                            <ul>
                                                {((!modal.distance_current_location &&
                                                    modal.distance_current_location >
                                                        0 &&
                                                    !modal.distance_next_destinations &&
                                                    modal.distance_next_destinations >
                                                        0) ||
                                                    !fullEstablishment) && (
                                                    <li>No address provided</li>
                                                )}
                                                {(modal.distance_current_location ||
                                                    modal.distance_current_location ===
                                                        0) && (
                                                    <li>
                                                        From current location:{" "}
                                                        {
                                                            modal.distance_current_location
                                                        }{" "}
                                                        km (
                                                        {
                                                            modal.currentLocation.split(
                                                                "|"
                                                            )[0]
                                                        }
                                                        ){" "}
                                                    </li>
                                                )}
                                                {(modal.distance_next_destinations ||
                                                    modal.distance_next_destinations ===
                                                        0) && (
                                                    <li>
                                                        From next destination:{" "}
                                                        {
                                                            modal.distance_next_destinations
                                                        }{" "}
                                                        km (
                                                        {
                                                            modal.nextDestinations.split(
                                                                "|"
                                                            )[0]
                                                        }
                                                        ){" "}
                                                    </li>
                                                )}
                                            </ul>

                                            <hr className="my-2" />

                                            <p className="mt-2">
                                                {emailContact.length === 0 && (
                                                    <a
                                                        href="/"
                                                        className="text-blue-500"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleEmail(modal)
                                                        }}
                                                    >
                                                        {" "}
                                                        Show email contact{" "}
                                                    </a>
                                                )}
                                                {emailContact.length > 0 && (
                                                    <>
                                                        {" "}
                                                        Email to contact:
                                                        <a
                                                            href={`mailto:${modal.email}`}
                                                            className="text-blue-500"
                                                        >
                                                            {" "}
                                                            {modal.email}
                                                        </a>{" "}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 px-4 py-3 text-right">
                                    <button
                                        type="button"
                                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                                        onClick={() => {
                                            handlePopUp(false)
                                            setEmailContact("")
                                        }}
                                    >
                                        <i className="fas fa-plus"></i> Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                </>
            )}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Influencer research
                    </h1>
                    <form className="mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="establishment"
                                >
                                    Address of my establishment
                                </label>
                                <Autocomplete
                                    apiKey="AIzaSyD3JDQLfCBWITPfErsQqgWonSnweYPlTY4"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    id="establishment"
                                    type="text"
                                    placeholder="City"
                                    value={establishment}
                                    onChange={(e) =>
                                        setEstablishment(e.target.value)
                                    }
                                    types={["(regions)"]}
                                    onPlaceSelected={(place) =>
                                        handleEstablishmentSelected(place)
                                    }
                                />
                                <input
                                    type="hidden"
                                    value={fullEstablishment || establishment}
                                    onChange={(e) =>
                                        setFullEstablishment(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="followers"
                                >
                                    Minimum number of followers
                                </label>
                                <input
                                    type="number"
                                    id="minFollowers"
                                    name="minFollowers"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    placeholder="Min"
                                    onChange={(e) =>
                                        setMinFollowers(e.target.value)
                                    }
                                    value={minFollowers}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="sort_by"
                                >
                                    Sort by
                                </label>
                                <select
                                    className="
                                    border border-gray-300 rounded p-2 w-full
                                "
                                    id="sort_by"
                                    name="sort_by"
                                    onChange={(e) => setSortBy(e.target.value)}
                                    defaultValue={"followers"}
                                >
                                    <option value={"distance_current_location"}>
                                        Distance between my address and its
                                        current location
                                    </option>
                                    <option
                                        value={"distance_next_destinations"}
                                    >
                                        Distance between my address and its next
                                        destination
                                    </option>
                                    <option value={"followers"}>
                                        Number of subscribers/followers
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <h2 className="text-2xl font-bold mb-4 ">
                        List of influencers
                    </h2>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4">
                        {influencersFiltered.map((influencer) => {
                            return (
                                <div
                                    key={influencer._id}
                                    className={
                                        minFollowers >
                                        influencer.totalFollowersCount
                                            ? "hidden"
                                            : ""
                                    }
                                >
                                    <div className="border border-gray-300 rounded p-4 mb-4 flex">
                                        <img
                                            src={
                                                (influencer?.picture &&
                                                    `${process.env.REACT_APP_APP_API}/influencer/profilePicture/${influencer.picture}`) ||
                                                `${process.env.REACT_APP_APP_API}/influencer/profilePicture/user.png`
                                            }
                                            alt=""
                                            className=" w-20 h-20 rounded-full mr-4"
                                        />

                                        <div className=" flex flex-col justify-between">
                                            <h3 className="text-lg font-bold">
                                                {influencer.name}
                                            </h3>
                                            <p>
                                                Total number of followers :
                                                <span
                                                    className={
                                                        sortBy === "followers"
                                                            ? "underline"
                                                            : ""
                                                    }
                                                >
                                                    {
                                                        influencer.formattedFollowersCount
                                                    }
                                                </span>
                                            </p>
                                            <p>Address distance: </p>

                                            <ul className="list-disc pl-4">
                                                {((!influencer.distance_current_location &&
                                                    influencer.distance_current_location >
                                                        0 &&
                                                    !influencer.distance_next_destinations &&
                                                    influencer.distance_next_destinations >
                                                        0) ||
                                                    !fullEstablishment) && (
                                                    <li>No address provided</li>
                                                )}
                                                {(influencer.distance_current_location ||
                                                    influencer.distance_current_location ===
                                                        0) && (
                                                    <li>
                                                        From current location:{" "}
                                                        <span
                                                            className={
                                                                sortBy ===
                                                                "distance_current_location"
                                                                    ? "underline"
                                                                    : ""
                                                            }
                                                        >
                                                            {
                                                                influencer.distance_current_location
                                                            }
                                                            {" km"}{" "}
                                                        </span>
                                                    </li>
                                                )}
                                                {(influencer.distance_next_destinations ||
                                                    influencer.distance_next_destinations ===
                                                        0) && (
                                                    <li>
                                                        From next destination:{" "}
                                                        <span
                                                            className={
                                                                sortBy ===
                                                                "distance_next_destinations"
                                                                    ? "underline"
                                                                    : ""
                                                            }
                                                        >
                                                            {
                                                                influencer.distance_next_destinations
                                                            }
                                                            {" km"}
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>
                                            <a
                                                href="/"
                                                className="text-blue-500"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handlePopUp(influencer)
                                                }}
                                            >
                                                see profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <footer className="bg-blue-500 py-4">
                <div className="container mx-auto px-4">
                    <p className="text-center text-white">
                        Plateforme de Voyages &copy; 2023. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Influencers
