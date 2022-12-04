import React, { useState } from 'react';
import './App.css';
import { Conversation } from './types';

function App() {
  const [question, setQuestion] = useState("")
  const [convs, setConvs] = useState<Conversation[]>([])

  const onSubmit: React.ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault()
    if (!question) return
    const newConv = {
      text: question,
      id: "",
      userId: "",
      created: new Date()
    }
    setConvs([...convs, newConv])
    setQuestion("")
  }

  const onChange: React.ComponentProps<"textarea">["onChange"] = (event) => {
    const { target: {value} } = event
    setQuestion(value)
  }

  return (
    <div className="App">
      <header>
        <h1>My FAQ</h1>
      </header>
      <section>
        <header></header>
        <article>
          { convs.map(c => <div key={c.created.getTime()}>{c.text}</div>) }
        </article>
      </section>
      <section>
        <header></header>
        <article>
          <form onSubmit={onSubmit}>
            <textarea value={question} onChange={onChange} placeholder="질문을 남겨주세요..."  />
            <button type="submit">Submit</button>
          </form>
        </article>
      </section>
      <footer>
        <p>ⓒ 2022 My FAQ</p>
      </footer>
    </div>
  );
}

export default App;
