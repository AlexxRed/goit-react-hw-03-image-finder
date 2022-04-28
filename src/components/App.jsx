import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
  }

  onSubmit = searchQuery => {
    this.setState({
      images: [],
      searchQuery
    })
  }

  render() {
    console.log(this.state.searchQuery);
    return (
      <>
      <Searchbar onSubmit={this.onSubmit} />
      </>
    );
  }
};
