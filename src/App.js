import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(false);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    setItems([]);
    setToast(false);
  }

  function handleToggleToast() {
    setToast(!toast);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        onToggleToast={handleToggleToast}
      />
      <Toast
        toast={toast}
        onClearList={handleClearList}
        onToggleToast={handleToggleToast}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), quantity, description, packed: false };
    onAddItems(newItem);

    setQuantity(1);
    setDescription('');
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h2>What do you need for your trip?</h2>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <label htmlFor='item'>Write here:</label>
      <input
        type='text'
        placeholder='Ex: passport'
        name='item'
        id='item'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onDeleteItem, onToggleToast }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onToggleToast}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span className={item.packed ? 'packed' : ''}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Toast({ toast, onClearList, onToggleToast }) {
  return (
    <>
      {toast ? (
        <div className='toast'>
          <p>‼️ Are you sure you want to delete all of your items?</p>
          <div>
            <button className='btn' onClick={onClearList}>
              Yes
            </button>
            <button className='btn' onClick={onToggleToast}>
              No
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

function Stats({ items }) {
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
export default App;
