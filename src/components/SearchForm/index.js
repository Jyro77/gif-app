import { memo } from "react";
import { useState } from "react";
import css from "./style.module.css";

function SearchForm({ onSubmit }) {
    const [keyword, setKeyword] = useState("");

    //It takes the value of the input field and pushes it to the URL as a path.
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ keyword });
    };
    // When the input value changes, set the keyword state to the input value.
    const handleChange = e => {
        setKeyword(e.target.value);
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
        </form>
    );
}

export default memo(SearchForm);
