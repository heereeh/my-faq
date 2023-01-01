
import { Container } from '@chakra-ui/react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import React, { useState, useEffect } from 'react';
import { User } from 'types';
import './App.css';

function App() {
  const [init, setInit] = useState(false)
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          uid: user.uid
        })
      } else {
        setUser(null)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    if (user) {
      setUser({
        displayName: user.displayName,
        uid: user.uid
      })
    }
  }

  return (
    <Container>
      {
        init? <AppRouter refreshUser={refreshUser} user={user} />
        : "Initializing..."
      }
    </Container>
  )
}

export default App;
