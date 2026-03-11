import React from "react";
import Button from "./Components/ui/Button/Button";
import Heading from './Components/ui/Heading/Heading';
import Badge from './Components/ui/Badge/Badge';
import NavBar from './Components/NavBar/NavBar'
import './index.css'
import Products from "./Components/Products/Products";
import { FaSearch } from "react-icons/fa";
const App = () => {
  return (
    <>
      {/* <Button buttonName="Click me" cn='button-n-one' />
      <Heading title="Hello  this  is the heading of this page" subTitle="awidawdbi awgd dwa ddkyyv awudauwd awyduya dywd wykadkg aw idg awdva wdvukwd ka" titleColor="red" subTitleColor="yellow"/>
      <Input icon={<FaSearch color="gold"/>} placeholder="Enter your name"  />
      <Badge text="New"/> */}
      <NavBar />
    <Products />
    </>
  );
};

export default App;
