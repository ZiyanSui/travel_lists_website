export default function Stats({ stuffs }) {
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
