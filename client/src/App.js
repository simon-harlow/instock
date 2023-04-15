import React from "react";
import { Arrow_back, Arrow_drop, Chevron_right, Close } from "./assets/modifiedLogos"
import { Button } from '@chakra-ui/react';


function App() {
  return (
    <>
  <div >InStock 4 initial project setup</div>
  <Button bg="$InstockIndigo" fontFamily="Titillium Web" fontWeight="normal" leftIcon={<Arrow_back/>}>Button</Button>
  <Button bg="$InstockIndigo" fontFamily="Titillium Web" fontWeight="normal" leftIcon={<Arrow_drop/>}>Button</Button>
  <Button bg="$InstockIndigo" textStyle='Titillium Web' fontWeight='semibold' leftIcon={<Chevron_right/>}>Button</Button>
  <Button bg="$InstockIndigo" textStyle='Titillium Web' fontWeight='semibold' leftIcon={<Close/>}>Button</Button>

  </>
  )
};

export default App;