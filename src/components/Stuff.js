export default function Stuff({ stuff, onDeleteStuffs, onTogglePacked }) {
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
