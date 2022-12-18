import React, { useEffect, useState } from "react";
import { Conversation, User } from "types";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import FaqFactory from "components/FaqFactory";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

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

  const navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate("/")
  }

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
      <FaqFactory user={user} />
      <footer>
        <p>ⓒ 2022 My FAQ</p>
        <Button size="sm" onClick={onLogOutClick}>Log Out</Button>
      </footer>
    </div>
  )
}

export default Home