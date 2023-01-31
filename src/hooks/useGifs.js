import { useEffect, useState, useContext } from "react";
import getGifs from "services/getGifs";
import GifsContext from "context/GifsContext";

const INITIAL_PAGE = 0;

export default function useGifs({ keyword, rating } = { keyword: null }) {
    const [loading, setLoading] = useState(false);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [page, setPage] = useState(INITIAL_PAGE);
    const { gifs, setGifs } = useContext(GifsContext);
    const keywordToUse =
        keyword || localStorage.getItem("lastKeyword") || "random";

    useEffect(
        function () {
            setLoading(true);
            getGifs({ keyword: keywordToUse, rating }).then(gifs => {
                setGifs(gifs);
                setLoading(false);
                localStorage.setItem("lastKeyword", keywordToUse);
            });
            //return localStorage.setItem("lastKeyword", keyword);
        },
        [keyword, keywordToUse, setGifs, rating],
    );

    useEffect(
        function () {
            if (page === INITIAL_PAGE) return;

            setLoadingNextPage(true);

            getGifs({ keyword: keywordToUse, rating, page }).then(nextGift => {
                setGifs(prevGifs => prevGifs.concat(nextGift));
                setLoadingNextPage(false);
            });
        },
        [keywordToUse, page, setGifs, rating],
    );

    return { loading, loadingNextPage, gifs, setPage };
}
