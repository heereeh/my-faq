import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import './App.css';
import FaqFactory from './components/FaqFactory';
import { dbService } from './fbase';
import { Conversation } from './types';

function App() {
  const [convs, setConvs] = useState<Conversation[]>([])

  const getConvs = async() => {
    const q = query(collection(dbService, "faqs"), orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      setConvs(snapshot.docs.map(doc => ({ ...(doc.data() as Conversation), id: doc.id })))
    })
  }

  useEffect(() => {
    getConvs()
  }, [])
  

  return (
    <div className="App">
      <header>
        <h1>My FAQ</h1>
      </header>
      <section>
        <header></header>
        <article>
          { convs.map(c => <div key={c.id}>{c.text}</div>) }
        </article>
      </section>
      <FaqFactory />
      <footer>
        <p>ⓒ 2022 My FAQ</p>
      </footer>
    </div>
  );
}

export default App;
