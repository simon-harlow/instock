import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider} from "@chakra-ui/react";
import App from "./App";
import { newTheme } from "./styles/partials/themes";


ReactDOM.render(
  
  <React.StrictMode>
    <ChakraProvider theme={newTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
