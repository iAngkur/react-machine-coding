import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

const tabs = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Settings",
    component: Settings,
  },
  {
    name: "Interests",
    component: Interests,
  },
];

export default function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  cosnt[(formData, setFormData)] = useState({
    name: "",
    age: "",
    email: "",
    interests: ["Coding", "Music", "Movies"],
    settings: {
      notifications: true,
      darkMode: false,
    },
  });

  const ActiveComponent = tabs[activeTab]?.component;
  return (
    <div>
      <div style={styles.headingContainer}>
        {tabs.map((tab, index) => (
          <div
            key={tab}
            onClick={() => setActiveTab(index)}
            style={styles.heading}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div style={styles.tabBody}>
        <ActiveComponent data={formData} />
      </div>
    </div>
  );
}

const styles = {
  headingContainer: {
    display: "flex",
  },

  heading: {
    padding: "5px",
    border: "1px solid black",
    cursor: "pointer",
  },

  tabBody: {
    display: "flex",
    border: "1px solid black",
    minHeight: "100px",
    padding: "1rem",
  },
};
