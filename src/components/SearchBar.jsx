import React from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ searchQuery, setSearchQuery, inputRef }) => {
    return (
        <div className={styles.searchBarContainer}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchBar;
