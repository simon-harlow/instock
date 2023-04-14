import React from "react";
import { Arrow_back, Arrow_drop, Chevron_right, Close } from "./assets/modifiedLogos"
import { Button } from '@chakra-ui/react';


function App() {
  return (
    <>
  <div >InStock 4 initial project setup</div>
  <Button bg="$InstockIndigo" font='semiFont' leftIcon={<Arrow_back/>}>Button</Button>
  <Button bg="$InstockIndigo" textStyle='boldFont' leftIcon={<Arrow_drop/>}>Button</Button>
  <Button bg="$InstockIndigo" textStyle='semiFont' leftIcon={<Chevron_right/>}>Button</Button>
  <Button bg="$InstockIndigo" textStyle='regularFont' leftIcon={<Close/>}>Button</Button>
  <text textStyle='h1pageheader'>something</text>
  </>
  )
};

export default App;
