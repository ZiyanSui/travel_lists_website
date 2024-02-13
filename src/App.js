import { useState } from "react";

export default function App() {
  const [stuffs, setStuffs] = useState([]);

  return (
    <div className="app">
      <Logo />
      <Form setStuffs={setStuffs} />
      <PackingList stuffs={stuffs} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Travel soon</h1>;
}

function Form({ setStuffs }) {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState("");

  function handleStuffs(stuff) {
    setStuffs((stuffs) => [...stuffs, stuff]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;

    const newItem = { item, quantity, packed: false, id: Date.now() };
    handleStuffs(newItem);

    setQuantity(1);
    setItem("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack for the trip?</h3>
      <select
        value={quantity}
        onChange={(e) => Number(setQuantity(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ stuffs }) {
  return (
    <div className="list">
      <ul>
        {stuffs.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.item}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on the list and you already packed Y (Y%)itmes</em>
    </footer>
  );
}
