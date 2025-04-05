export default function productCard({ product }) {
  const { thumbnail, title } = product;
  return (
    <div style={styles.productCard}>
      <img src={thumbnail} alt={title} style={styles.img} />
      <span>{title}</span>
    </div>
  );
}

const styles = {
  productCard: {
    flex: "1",
    display: "inline-block",
    maxWidth: "300px",
    flexBasis: "300px",
    height: "200px",
    border: "1px solid white",
    borderRadius: "4px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    margin: "0.5rem",
    padding: "1rem",
    textAlign: "center",
  },

  img: {
    width: "100%",
    height: "80%",
    objectFit: "cover",
    marginBottom: "1rem",
  },
};
