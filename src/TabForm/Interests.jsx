import { Fragment } from "react";

export default function Interests({ data, setData }) {
  const { interests } = data;

  const handleChange = (e) => {
    const selectedInterest = e.target.value;
    const newInterests = interests.includes(selectedInterest)
      ? interests.filter((interest) => interest !== selectedInterest)
      : [...interests, selectedInterest];

    setData((prev) => ({ ...prev, interests: newInterests }));
  };

  return (
    <div>
      {["Coding", "Movies"].map((interest) => {
        const interestKey = interest.toLowerCase();
        return (
          <Fragment key={interestKey}>
            <label htmlFor={interestKey}>
              <input
                type="checkbox"
                id={interestKey}
                name={interestKey}
                checked={interests.includes(interest)}
                onChange={handleChange}
                value={interest}
              />
              {interest}
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}
