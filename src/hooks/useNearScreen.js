import { useState, useEffect, useRef } from "react";

export default function useNearScreen({
    distance = "100px",
    externalRef,
    once = true,
} = {}) {
    const [show, setShow] = useState(false);
    const elementRef = useRef();

    useEffect(function () {
        let observer;

        const element = externalRef ? externalRef.current : elementRef.current;

        const onChange = (entries, observer) => {
            const el = entries[0];
            if (el.isIntersecting) {
                setShow(true);
                once && observer.disconnnect();
            } else {
                !once && setShow(false);
            }
        };

        Promise.resolve(
            typeof IntersectionObserver !== "undefined"
                ? IntersectionObserver
                : import("intersection-observer"),
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: distance,
            });
            if (element) observer.observe(element);
        });

        return () => observer && observer.disconnect();
    });

    return { show, elementRef };
}
