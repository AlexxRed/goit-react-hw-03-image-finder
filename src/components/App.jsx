import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
// import { LoadMoreButton } from "./Button/Button.styled";
// import { ImageGallery } from './ImageGallery/ImageGallery';

// import { Modal} from "./Modal/Modal"

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    bigImage:[],
  }

  onSubmit = searchQuery => {
    this.setState({
      images: [],
      searchQuery,
      page: 1,
      isLoading: false,
      showModal: false,
      bigImage:[],
    })
  }

  loadMore = () => {
    console.log('load image');
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
