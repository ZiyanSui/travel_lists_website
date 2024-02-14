import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleClearList() {
    let confirmed = window.confirm(`Are you confirmed to clear lists?`);
    if (confirmed) setStuffs([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddStuffs={handleAddStuffs} />
      <PackingList
        stuffs={stuffs}
        onDeleteStuffs={handleDeleteStuffs}
        onTogglePacked={handleTogglePacked}
        onClearList={handleClearList}
      />
      <Stats stuffs={stuffs} />
    </div>
  );
}
