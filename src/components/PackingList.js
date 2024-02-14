import { useState } from "react";
import Stuff from "./Stuff";

export default function PackingList({
  stuffs,
  onDeleteStuffs,
  onTogglePacked,
  onClearList,
}) {
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

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
