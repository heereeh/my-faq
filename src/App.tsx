
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
    <>
    {
      init && user? <AppRouter refreshUser={refreshUser} isLoggedIn={user != null} user={user} />
      : "Initializing..."
    }
    </>
  )
}

export default App;
