//import { useContext } from "react";
//import GifsContext from "context/GifsContext";
import Gifs from "components/Gifs";
import Spinner from "components/Spinner";
import useSingleGif from "hooks/useSingleGif";
import { Redirect } from "wouter";
import { Helmet } from "react-helmet";

function Detail({ params }) {
    const { gif, isLoading, hasError } = useSingleGif({ id: params.id });

    if (isLoading)
        return (
            <>
                <Helmet>
                    <title>Loading...</title>
                </Helmet>
                <Spinner />
            </>
        );
    if (hasError) return <Redirect to='/404' />;
    if (!gif) return null;

    const { title } = gif;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={title} />
            </Helmet>
            <h3 className='App-title'>{gif.title}</h3>
            <Gifs {...gif} />
        </>
    );
}

export default Detail;
