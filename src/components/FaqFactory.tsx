import { Box, Button, Textarea } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { postMessage } from 'slack';
import { User } from 'types';
import { dbService } from '../fbase';

function FaqFactory({ user }: {user: User}) {
  const [question, setQuestion] = useState("")

  const onSubmit: React.ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault()
    if (!question) return
    const newConv = {
      text: question,
      userId: user.uid,
      createdAt: serverTimestamp()
    }

    await Promise.all([
      addDoc(collection(dbService, "faqs"), newConv),
      postMessage(user, question)
    ])

    setQuestion("")
  }

  const onChange: React.ComponentProps<"textarea">["onChange"] = (event) => {
    const { target: {value} } = event
    setQuestion(value)
  }

  return (
    <Box mt="2">
      <form onSubmit={onSubmit}>
        <Textarea
          size="xs"
          value={question}
          onChange={onChange}
          placeholder="질문을 남겨주세요..."  />
        <Button
          colorScheme="blue"
          variant="solid"
          mt="1"
          w="100%"
          type="submit">Submit</Button>
      </form>
    </Box>
  )
}

export default FaqFactory