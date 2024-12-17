import { Theamcontext } from "./Constext";
import { useState } from "react";

export function Theamprovider({ Children }) {
  const [theam, setTheam] = useState("light");
  const toggletheam = () => {
    setTheam((privthem) => (privthem === "light" ? "dark" : "light"));
  };
  return (
    <Theamcontext.provider value={{ theam, toggletheam }}>
      {Children}
    </Theamcontext.provider>
  );
}
export function useThem() {
  return useContext(Theamcontext);
}
