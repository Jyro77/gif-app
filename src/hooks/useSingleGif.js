import { useEffect, useState } from "react";
import getSingleGif from "services/getSingleGif";
import useGifs from "./useGifs";

export default function useSingleGif({ id }) {
    const { gifs } = useGifs();
    const gifFromCache = gifs.find(singleGif => singleGif.id === id);

    const [gif, setGif] = useState(gifFromCache);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!gif) {
            setIsLoading(true);
            getSingleGif({ id })
                .then(gif => {
                    setGif(gif);
                    setIsLoading(false);
                })
                .catch(e => {
                    setIsLoading(false);
                    setHasError(true);
                });
        }
    }, [id, gif]);

    return { gif, isLoading, hasError };
}
