import { memo } from "react";
import { useState } from "react";
import css from "./style.module.css";
import { useLocation } from "wouter";

const RATING = ["g", "pg", "pg-13", "r"];

function SearchForm({ initialKeyword = "", initialRating = "g" }) {
    const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword));
    const [rating, setRating] = useState(initialRating);

    //It takes the value of the input field and pushes it to the URL as a path.
    /*     const handleSubmitSearchForm = e => {
        e.preventDefault();
        onSubmit({ keyword });
    }; */
    // When the input value changes, set the keyword state to the input value.
    const handleChange = e => {
        setKeyword(e.target.value);
    };

    const [, pushLocation] = useLocation();

    const handleSubmit = () => {
        pushLocation(`/search/${keyword}/${rating}`);
    };

    const handlerChangeRating = e => {
        setRating(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={css["c-search"]}>
            <button>Buscar</button>
            <input
                placeholder='Search a gif here...'
                onChange={handleChange}
                type='text'
                value={keyword}
                className={css["c-search-input"]}
            />
            <select
                className={css["c-search-list"]}
                onChange={handlerChangeRating}
                value={rating}>
                <option disabled>Rating types</option>
                {RATING.map(rating => (
                    <option key={rating}>{rating.toUpperCase()}</option>
                ))}
            </select>
        </form>
    );
}

export default memo(SearchForm);
