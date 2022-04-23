import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    images: [],
  }

  render(){
    return (
      <>
      <Searchbar onSubmit={()=>console.log('s')} />
      </>
    );
  }
};
