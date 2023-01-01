import React from "react";
import { User } from "types";
import FaqFactory from "components/FaqFactory";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Faqs from "components/Faqs";

const Home = ({user}: {user: User}) => {

  const navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate("/")
  }

  return (
    <div className="App">
      <FaqFactory user={user} />
      <Faqs user={user} />
      <footer>
        <p>ⓒ 2022 My FAQ</p>
        <Button size="sm" onClick={onLogOutClick}>Log Out</Button>
      </footer>
    </div>
  )
}

export default Home