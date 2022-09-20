import { useRef, useEffect, useCallback } from "react";
import ListOfGifs from "components/ListOfGifs";
import Spinner from "components/Spinner";
import useGifs from "hooks/useGifs";
import useNearScreen from "hooks/useNearScreen";
import debounce from "just-debounce-it";
import { Helmet } from "react-helmet";

function SearchResults({ params }) {
    const { keyword } = params;
    const { loading, gifs, setPage } = useGifs({ keyword });
    const externalRef = useRef();
    const { show } = useNearScreen({
        externalRef: loading ? null : externalRef,
        once: false,
    });

    // eslint-disable-next-line
    const debounceHandleNextPage = useCallback(
        debounce(() => setPage(prevPage => prevPage + 1, 1000)),
        [setPage],
    );

    useEffect(() => {
        if (show) debounceHandleNextPage();
    }, [debounceHandleNextPage, show]);

    const title = `${keyword} - TrueGif Search Result`;

    return (
        <>
            {loading ? (
                <>
                    <Helmet>
                        <title>Loading...</title>
                    </Helmet>
                    <Spinner />
                </>
            ) : (
                <>
                    <Helmet>
                        <title>{title}</title>
                        <meta name='description' content={title} />
                    </Helmet>
                    <h3 className='App-title'>{decodeURI(keyword)}</h3>
                    <ListOfGifs gifs={gifs} />
                </>
            )}
            <div id='spot' ref={externalRef}></div>
        </>
    );
}

export default SearchResults;
