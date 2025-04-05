import { useEffect, useCallback } from "react";
import { useState } from "react";

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export default function AutocompleteSearchBar() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResultContainer, setShowSearchResultContainer] =
    useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [cache, setCache] = useState({});

  const fetchData = useCallback(() => {
    if (cache[debouncedSearchQuery]) {
      console.log("Cached API ::> ", debouncedSearchQuery);
      setResults(cache[debouncedSearchQuery]);
      return;
    }

    console.log("New API Call ::> ", debouncedSearchQuery);
    fetch("https://dummyjson.com/recipes/search?q=" + debouncedSearchQuery)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.recipes ?? []);
        setCache((prevCacheData) => ({
          ...prevCacheData,
          [debouncedSearchQuery]: data.recipes,
        }));
      })
      .catch((err) => console.error(err));
  }, [debouncedSearchQuery]);
  // this dependency doesn't make the api call,
  // it just re-creates a new FetchData() method.
  // fetchData() should be placed inside the useEffect(),
  // then we don't use useCallback()

  useEffect(() => {
    // const timeoutId = setTimeout(() => {
    //   fetchData();
    // }, 400);

    // return () => clearTimeout(timeoutId);
    fetchData();
  }, [
    debouncedSearchQuery,
    fetchData,
    // searchQuery
  ]);

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())}
        placeholder="Search"
        style={styles.searchInput}
        onFocus={() => setShowSearchResultContainer(true)}
        onBlur={() =>
          setTimeout(() => setShowSearchResultContainer(false), 200)
        }
      />
      {showSearchResultContainer && (
        <div style={styles.searchResultContainer}>
          {results.map((result) => (
            <div
              key={result.id}
              style={styles.searchResult}
              onClick={() => console.log("Selected Value ::> ", result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  searchContainer: {
    width: "300px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  searchResultContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    width: "100%",
    maxHeight: "200px",
    padding: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  },
  searchResult: {
    cursor: "pointer",
  },
};
