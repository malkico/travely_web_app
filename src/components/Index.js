// import logo from './logo.svg';
// import './App.css';

function Index() {
    return (
        // <img src={logo} className="App-logo" alt="logo" />
        <>
            <section class="py-8">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold mb-4">
                        Bienvenue sur notre plateforme de voyages
                    </h1>
                    <p class="text-lg">
                        Trouvez les meilleurs hôtels et influenceurs pour vos
                        prochaines aventures.
                    </p>
                    <div class="mt-8">
                        <a
                            href="/"
                            class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Rechercher des influenceurs
                        </a>
                        <a
                            href="/"
                            class="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                            Rechercher des hôtels
                        </a>
                    </div>
                </div>
            </section>

            <section class="bg-gray-100 py-8">
                <div class="container mx-auto px-4">
                    <h2 class="text-2xl font-bold mb-4">
                        Pourquoi choisir notre plateforme ?
                    </h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-white rounded shadow">
                            <h3 class="text-lg font-bold mb-2">
                                Pour les influenceurs
                            </h3>
                            <p>
                                Trouvez de nouveaux partenariats avec des hôtels
                                et établissements touristiques. Augmentez votre
                                visibilité et partagez vos expériences de
                                voyage.
                            </p>
                        </div>
                        <div class="p-4 bg-white rounded shadow">
                            <h3 class="text-lg font-bold mb-2">
                                Pour les hôtels
                            </h3>
                            <p>
                                Collaborez avec des influenceurs populaires pour
                                promouvoir votre établissement auprès d'une
                                audience engagée. Attirez de nouveaux clients et
                                augmentez vos réservations.
                            </p>
                        </div>
                    </div>
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

export default Index
