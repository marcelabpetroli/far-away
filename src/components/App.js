import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Modal from './Modal';
import Stats from './Stats';

export default function App() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

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
    setModal(false);
  }

  function handleToggleModal() {
    if (!items.length) return;
    setModal(!modal);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        onToggleModal={handleToggleModal}
      />
      <Modal
        modal={modal}
        onClearList={handleClearList}
        onToggleModal={handleToggleModal}
      />
      <Stats items={items} />
    </div>
  );
}
