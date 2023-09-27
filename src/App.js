function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form() {
  return (
    <form class='add-form'>
      <h2>What do you need for your trip?</h2>
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
