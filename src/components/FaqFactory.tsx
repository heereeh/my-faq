import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { dbService } from '../fbase';

function FaqFactory() {
  const [question, setQuestion] = useState("")

  const onSubmit: React.ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault()
    if (!question) return
    const newConv = {
      text: question,
      userId: "",
      createdAt: serverTimestamp()
    }

    await addDoc(collection(dbService, "faqs"), newConv)

    setQuestion("")
  }

  const onChange: React.ComponentProps<"textarea">["onChange"] = (event) => {
    const { target: {value} } = event
    setQuestion(value)
  }

  return (
    <section>
      <header></header>
      <article>
        <form onSubmit={onSubmit}>
          <textarea value={question} onChange={onChange} placeholder="질문을 남겨주세요..."  />
          <button type="submit">Submit</button>
        </form>
      </article>
    </section>
  )
}

export default FaqFactory