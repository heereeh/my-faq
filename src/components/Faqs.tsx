import React, { useEffect, useState } from "react";
import { Conversation, User } from "types";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from "fbase";
import { Box, Card, CardBody, Stack, Text } from "@chakra-ui/react";

const Faqs = ({user}: {user: User}) => {
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
    <Stack spacing="1" mt="2">
      { convs.map(c =>
        <Card
          key={c.id}
          variant="filled"
          size="sm"
          bgColor={c.userId === user.uid? "yellow.100":"gray.100"}
          w="fit-content"
          alignSelf={c.userId === user.uid? "start":"end"}
          >
          <CardBody>
            <Box
              borderRadius="md"
              >
                <Text fontSize="xs">{c.text}</Text>
              </Box>
          </CardBody>
        </Card>
      )}
    </Stack>
  )
}

export default Faqs