import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider} from "@chakra-ui/react";
import App from "./App";
import { themes } from "./styles/themes"; 

ReactDOM.render(
  
  <React.StrictMode>
    <ChakraProvider theme={themes}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
