function Influencers() {
    return (
        <>
            <section class="py-8">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold mb-4">
                        Recherche d'influenceurs
                    </h1>
                    <form class="mb-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <label
                                    class="block mb-2 font-bold"
                                    for="followers"
                                >
                                    Nombre d'abonnés
                                </label>
                                <input
                                    type="number"
                                    id="followers"
                                    name="followers"
                                    class="border border-gray-300 rounded p-2 w-full"
                                    placeholder="Min"
                                />
                            </div>
                            <div>
                                <label
                                    class="block mb-2 font-bold"
                                    for="destination"
                                >
                                    Prochaine destination
                                </label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    class="border border-gray-300 rounded p-2 w-full"
                                    placeholder="Pays"
                                />
                            </div>
                            <div>
                                <label
                                    class="block mb-2 font-bold"
                                    for="current-location"
                                >
                                    Lieu actuel
                                </label>
                                <input
                                    type="text"
                                    id="current-location"
                                    name="current-location"
                                    class="border border-gray-300 rounded p-2 w-full"
                                    placeholder="Pays"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Filtrer
                            </button>
                        </div>
                    </form>
                    <h2 class="text-2xl font-bold mb-4">
                        Liste des influenceurs
                    </h2>
                    <ul>
                        <li class="border border-gray-300 rounded p-4 mb-4">
                            <h3 class="text-lg font-bold">
                                Nom de l'influenceur
                            </h3>
                            <p>Nombre d'abonnés : 100,000</p>
                            <p>Prochaine destination : France</p>
                            <p>Lieu actuel : Espagne</p>
                            <a href="/" class="text-blue-500">
                                see the profile
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <footer class="bg-blue-500 py-4">
                <div class="container mx-auto px-4">
                    <p class="text-center text-white">
                        Plateforme de Voyages &copy; 2023. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Influencers
