import { useContext } from "react";
import GifsContext from "context/GifsContext";
import Gifs from "components/Gifs";

function Detail({ params }) {
    const { gifs } = useContext(GifsContext);

    const gif = gifs.find(singleGif => singleGif.id === params.id);
    console.log(gif);

    return (
        <>
            <h3 className='App-title'>{gif.title}</h3>
            <Gifs {...gif} />
        </>
    );
}

export default Detail;
