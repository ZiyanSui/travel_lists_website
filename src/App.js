import { useState } from "react";

export default function App() {
  const [stuffs, setStuffs] = useState([]);

  function handleAddStuffs(stuff) {
    setStuffs((stuffs) => [...stuffs, stuff]);
  }

  function handleDeleteStuffs(id) {
    setStuffs((stuffs) => stuffs.filter((stuff) => id !== stuff.id));
  }

  function handleTogglePacked(id) {
    setStuffs((stuffs) =>
      stuffs.map((stuff) =>
        stuff.id === id ? { ...stuff, packed: !stuff.packed } : stuff
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddStuffs={handleAddStuffs} />
      <PackingList
        stuffs={stuffs}
        onDeleteStuffs={handleDeleteStuffs}
        onTogglePacked={handleTogglePacked}
      />
      <Stats stuffs={stuffs} />
    </div>
  );
}

function Logo() {
  return <h1>Travel soon 🤤</h1>;
}

function Form({ onAddStuffs }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newstuff = { name, quantity, packed: false, id: Date.now() };
    console.log(newstuff);
    onAddStuffs(newstuff);

    setQuantity(1);
    setName("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack for the trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="stuff..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ stuffs, onDeleteStuffs, onTogglePacked }) {
  const [sortBy, setSortBy] = useState("name");

  let sortedStuffs;

  if (sortBy === "name") {
    sortedStuffs = stuffs.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "quantity") {
    sortedStuffs = stuffs.slice().sort((a, b) => a.quantity - b.quantity);
  }

  if (sortBy === "packed") {
    sortedStuffs = stuffs
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedStuffs.map((stuff) => (
          <Stuff
            stuff={stuff}
            key={stuff.id}
            onDeleteStuffs={onDeleteStuffs}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by name</option>
          <option value="quantity">Sort by quantity</option>
          <option value="packed">Sort by packed</option>
        </select>
      </div>
    </div>
  );
}

function Stuff({ stuff, onDeleteStuffs, onTogglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={stuff.packed}
        onChange={() => onTogglePacked(stuff.id)}
      />
      <span style={stuff.packed ? { textDecoration: "line-through" } : {}}>
        {stuff.quantity} {stuff.name}
      </span>
      <button onClick={() => onDeleteStuffs(stuff.id)}>❌</button>
    </li>
  );
}

function Stats({ stuffs }) {
  if (!stuffs.length) {
    return (
      <p className="stats">
        <em>Start Adding stuffs to the packing list!</em>
      </p>
    );
  }

  const num = stuffs.length;
  const numPacked = stuffs.filter((stuff) => stuff.packed).length;
  const percent = Math.round((numPacked / num) * 100);
  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? `You got everything! Ready to go 🥳`
          : `You have ${num} names on the list and you already packed ${numPacked} (
        ${percent}%)itmes`}
      </em>
    </footer>
  );
}
