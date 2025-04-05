export default function Profile({ data, setData, errors }) {
  const { name, age, email } = data;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="name">
            Name
          </label>
          <input
            style={styles.formControl}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="email">
            Email
          </label>
          <input
            style={styles.formControl}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="age">
            Age
          </label>
          <input
            style={styles.formControl}
            type="number"
            id="age"
            name="age"
            min={1}
            value={age}
            onChange={handleOnChange}
            onKeyDown={(e) => {
              if (e.key.test(/\D/g)) e.preventDefault();
            }}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },

  formLabel: {
    marginBottom: "0.5rem",
  },

  formControl: {
    padding: "0.5rem",
    border: "1px solid black",
    borderRadius: "4px",
    outline: "none",
  },
};
