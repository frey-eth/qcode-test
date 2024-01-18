"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { ChakraProvider } from "@chakra-ui/react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <ChakraProvider>
      <Provider store={storeRef.current}>{children}</Provider>
    </ChakraProvider>
  );
}
