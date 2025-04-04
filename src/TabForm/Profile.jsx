export default function Profile({ data }) {
  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={data.name} />
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" value={data.age} />
      </div>
    </div>
  );
}
