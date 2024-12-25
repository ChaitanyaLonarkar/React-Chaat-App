import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//    <>
//    thishidhsdfjf
//    </>
//   )
// }

// export default App
// 'use client';

import { init, id } from '@instantdb/react';
import schema from './schema/schema'

// Connect to the database
// ---------
const db = init({
  appId: import.meta.env.INSTANT_API,
  schema
});

function addMessage(text) {
  db.transact(
    db.tx.messages[id()].update({
      text,
      createdAt: new Date(),
    }),
  );
}

function App() {
  // Read Data
  const { isLoading, error, data } = db.useQuery({ messages: {} });
  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const { messages } = data;

  const sortedMessages = messages.sort(
    (a, b) =>
      // @ts-expect-error
      new Date(a.createdAt) - new Date(b.createdAt),
  );

  return (
    <div className="p-4">
      <form
        className="flex space-x-2"
        onSubmit={(e => {
          e.preventDefault();
          addMessage(e.target[0].value);
          e.target[0].value = '';
        })}
      >
        <input placeholder="What needs to be done?" type="text" />
        <button type="submit">Add</button>
      </form>
      {sortedMessages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}

export default App;
