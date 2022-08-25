import { useState, useEffect, useRef } from "react";

export default function useNearScreen({ distance = "100px" } = {}) {
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
                rootMargin: distance,
            });
            observer.observe(elementRef.current);
        });

        return () => observer && observer.disconnect();
    });

    return { show, elementRef };
}
