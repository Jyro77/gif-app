import { lazy, Suspense } from "react";
import useNearScreen from "hooks/useNearScreen";
import Spinner from "components/Spinner";

const TrendingSearches = lazy(() => import("./TrendingSearches"));

export default function LazyTrending() {
    const { show, elementRef } = useNearScreen();

    return (
        <div ref={elementRef}>
            <Suspense fallback={<Spinner />}>
                {show ? <TrendingSearches /> : <Spinner />}
            </Suspense>
        </div>
    );
}
