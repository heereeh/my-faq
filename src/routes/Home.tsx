import React, { useEffect, useState } from "react";
import { Conversation, User } from "types";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import FaqFactory from "components/FaqFactory";
import { dbService } from "fbase";

const Home = ({user}: {user: User}) => {
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
  )
}

export default Home