import { Box, Button, ButtonGroup, Center } from "@chakra-ui/react"
import { authService } from "fbase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import React from "react"

const Auth = () => {
  const onSocialClick: React.ComponentProps<"button">["onClick"] = async(event) => {
    await signInWithPopup(authService, new GoogleAuthProvider())
  }

  return (
    <Center h="100%">
      <Box bg="white" borderRadius="5" p="10">
        <ButtonGroup mt="2">
          <Button onClick={onSocialClick}>Continue with Google</Button>
        </ButtonGroup>
      </Box>
    </Center>
  )
}

export default Auth