import { useState } from "react";
import { useLocation } from "wouter";
import useGifs from "hooks/useGifs";
import ListOfGifs from "components/ListOfGifs";
import TrendingSearches from "components/TrendingSearches";

function Home() {
    const [keyword, setKeyword] = useState("");
    const [path, pushLocation] = useLocation();
    const { gifs } = useGifs();

    //It takes the value of the input field and pushes it to the URL as a path.
    const handleSubmit = e => {
        e.preventDefault();
        pushLocation(`search/${keyword}`);
        console.log(path);
    };
    // When the input value changes, set the keyword state to the input value.
    const handleChange = e => {
        setKeyword(e.target.value);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <button>Buscar</button>
                <input
                    placeholder='Search a gif here...'
                    onChange={handleChange}
                    type='text'
                    value={keyword}
                />
            </form>
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
