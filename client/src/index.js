import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider} from "@chakra-ui/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { themes } from "./styles/themes"; 
import Fonts from "./styles/fonts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={themes}>
      <Fonts/>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);

reportWebVitals();