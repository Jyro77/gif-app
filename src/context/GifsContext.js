import { createContext, useState } from "react";

const GifsContext = createContext({});

export function GifsContextProvider({ children }) {
    const [gifs, setGifs] = useState([]);

    return (
        <GifsContext.Provider value={{ gifs, setGifs }}>
            {children}
        </GifsContext.Provider>
    );
}
export default GifsContext;
