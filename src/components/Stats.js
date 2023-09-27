export default function Stats({ items }) {
  if (!items.length)
    return <p className='stats'>Start adding some items to your list ✨</p>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <p>
        {percentage === 100
          ? `You've packed everything! ✈️`
          : ` You've ${numItems} ${
              numItems !== 1 ? 'items' : 'item'
            } on your list. You've already packed ${numPacked} (${percentage}%)`}
      </p>
    </footer>
  );
}
