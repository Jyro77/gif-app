import { useCallback } from "react";
import useGifs from "hooks/useGifs";
import ListOfGifs from "components/ListOfGifs";
import TrendingSearches from "components/TrendingSearches";
import SearchForm from "components/SearchForm";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";

function Home() {
    const { gifs } = useGifs();

    const [, pushLocation] = useLocation();

    const handleSubmit = useCallback(
        ({ keyword }) => {
            pushLocation(`/search/${keyword}`);
        },
        [pushLocation],
    );

    return (
        <>
            <Helmet>
                <title>TrueGif App</title>
                <meta name='description' content='TrueGif a TrueJyro Product' />
            </Helmet>
            <SearchForm onSubmit={handleSubmit} />
            <div className='App-main'>
                <div className='App-results'>
                    <h3 className='App-title'>Última búsqueda</h3>
                    <ListOfGifs gifs={gifs} />
                </div>
                <div className='App-category'>
                    <TrendingSearches />
                </div>
            </div>
        </>
    );
}

export default Home;
