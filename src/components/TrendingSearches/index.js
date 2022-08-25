import { useState, useEffect } from "react";
import getTrendingTerms from "services/getTrendingTermsServices";
import Category from "components/Category";
import useNearScreen from "hooks/useNearScreen";

function TrendingSearches() {
    const [trends, setTrends] = useState([]);

    useEffect(function () {
        getTrendingTerms().then(setTrends);
    }, []);

    return <Category name='Tendencias' options={trends} />;
}

export default function LazyTrending() {
    const { show, elementRef } = useNearScreen();

    return <div ref={elementRef}>{show ? <TrendingSearches /> : null}</div>;
}
