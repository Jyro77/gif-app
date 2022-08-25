import { useState, useEffect, useRef } from "react";
import getTrendingTerms from "services/getTrendingTermsServices";
import Category from "components/Category";

/**
 * It's a React component that uses the useState and useEffect hooks to fetch data from an API and then
 * render it.
 * @returns A function that returns Category component.
 */
function TrendingSearches() {
    const [trends, setTrends] = useState([]);

    useEffect(function () {
        getTrendingTerms().then(setTrends);
    }, []);

    return <Category name='Tendencias' options={trends} />;
}

/**
 * It returns a div that contains a TrendingSearches component if the div is in the viewport, otherwise
 * it returns null.
 *
 * The useEffect hook is used to create an IntersectionObserver that observes the div. When the div is
 * in the viewport, the observer calls the onChange function, which sets the show state to true, which
 * causes the TrendingSearches component to be rendered.
 *
 * The observer is disconnected when the div is in the viewport, so that the TrendingSearches component
 * is not re-rendered when the div is scrolled out of the viewport.
 *
 * The useRef hook is used to get a reference to the div.
 *
 * The useState hook is used to create the show state.
 *
 * The rootMargin option is used to set the margin around the root element. The root element is the
 * viewport in this case.
 * @returns A function that returns a div with a ref and a TrendingSearches component.
 */
export default function LazyTrending() {
    const [show, setShow] = useState(false);
    const elementRef = useRef();

    useEffect(function () {
        let observer;

        const onChange = (entries, observer) => {
            const el = entries[0];
            if (el.isIntersecting) {
                setShow(true);
                observer.disconnnect();
            }
        };

        Promise.resolve(
            typeof IntersectionObserver !== "undefined"
                ? IntersectionObserver
                : import("intersection-observer"),
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: "100px",
            });
            observer.observe(elementRef.current);
        });

        return () => observer && observer.disconnect();
    }, []);

    return <div ref={elementRef}>{show ? <TrendingSearches /> : null}</div>;
}
