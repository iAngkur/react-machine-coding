import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

const tabs = [
  {
    name: "Profile",
    component: Profile,
    validate: (data, setErrors) => {
      const errors = {};
      if (!data.name || !data.email) {
        errors.name = "Name is required";
        errors.email = "Email is required";
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
  },
  {
    name: "Interests",
    component: Interests,
    validate: (data, setErrors) => {
      const errors = {};
      if (data.interests.length === 0) {
        errors.interests = "Please select at least one interest";
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
  },
  {
    name: "Settings",
    component: Settings,
    validate: (data, setErrors) => {
      const errors = {};
      if (Object.values(data.settings).every((value) => !value)) {
        errors.settings = "Please select at least one setting";
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
  },
];

export default function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    interests: ["Coding", "Music"],
    settings: {
      notifications: true,
      darkmode: false,
    },
  });

  const [errors, setErrors] = useState({});

  const handlePrevious = () => {
    setErrors({});
    setActiveTab((prevTab) => prevTab - 1);
  };

  const handleNext = () => {
    if (tabs[activeTab].validate(formData, setErrors)) {
      setErrors({});
      setActiveTab((prevTab) => prevTab + 1);
    }
  };

  const handleOnSubmit = () => {
    console.log(formData);
  };

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
        <ActiveComponent
          data={formData}
          setData={setFormData}
          errors={errors}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {activeTab > 0 && <button onClick={handlePrevious}>Previous</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleOnSubmit}>Submit</button>
        )}
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
