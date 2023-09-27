import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList />
      <Stats />
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

function PackingList() {
  return (
    <div className='list'>
      <ul>
        <Item />
      </ul>
    </div>
  );
}

function Item() {
  return <li></li>;
}

function Stats() {
  return (
    <footer className='stats'>
      You've X items on your list. You've already packed X (X%).
    </footer>
  );
}
export default App;
