import { Fragment } from "react";

export default function Settings({ data, setData }) {
  const { settings } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, [name]: value === "YES" },
    }));
  };

  return (
    <div style={styles.settingContainer}>
      {["Notifications", "DarkMode"].map((setting) => {
        const settingKey = setting.toLowerCase();
        return (
          <div key={settingKey}>
            <label>{setting}</label>
            <div>
              <input
                type="radio"
                name={settingKey}
                value="YES"
                checked={settings[settingKey]}
                onChange={handleChange}
              />{" "}
              YES
              <input
                type="radio"
                name={settingKey}
                value="NO"
                checked={!settings[settingKey]}
                onChange={handleChange}
              />{" "}
              NO
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  settingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};
