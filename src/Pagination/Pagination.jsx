import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
const useProducts = (url) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [url]);

  return { products };
};

const PAGE_SIZE = 10;

export default function Pagination() {
  const { products } = useProducts("https://dummyjson.com/products?limit=500");
  const [currentPage, setCurrentPage] = useState(1);

  const noOfPages = Math.ceil(products.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  if (!products || products.length === 0) return <div>No products!!!</div>;
  return (
    <div>
      <div style={styles.productCardContainer}>
        {products.slice(start, end).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={styles.paginationButtonContainer}>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => {
              if (prevPage === 1) return 1;
              return prevPage - 1;
            })
          }
          style={styles.paginationButton}
        >
          Previous
        </button>
        {Array.from({ length: noOfPages }).map((_, index) => (
          <button
            style={{
              ...styles.paginationButton,
              ...(currentPage === index + 1 && styles.active),
            }}
            key={index}
            onClick={(e) => setCurrentPage(parseInt(e.target.textContent))}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prevPage) => {
              if (prevPage === noOfPages) return noOfPages;
              return prevPage + 1;
            })
          }
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  productCardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  paginationButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  paginationButton: {
    marginInline: "1px",
    cursor: "pointer",
    outline: "none",
    border: "none",
    padding: "0.25rem 0.5rem",
  },
  active: {
    backgroundColor: "black",
    color: "white",
  },
};
