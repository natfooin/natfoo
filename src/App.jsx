import React from "react";
import Input from "./Components/ui/Input/Input";
import { SiTarget } from "react-icons/si";
import './App.css'
const App = () => {
  return (<>
  <Input icon={<SiTarget color="gray"/>} placeholder="What a surpise"/>
  </>)
};

export default App;
