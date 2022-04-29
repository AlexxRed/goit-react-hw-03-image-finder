import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Section } from "./App.styled";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./Button/Button.styled";
import { ImageGallery } from './ImageGallery/ImageGallery';

// import { Modal} from "./Modal/Modal"

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    bigImage: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({isLoading: true})
    }
    
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
    this.setState(prevState => {
      return{
      page: prevState.page += 1,
    }
    })
    // console.log('load image');
  }

  showModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      }
    })
  }

  render() {
    const { images, isLoading, showModal, bigImage } = this.state;
    const { onSubmit, loadMore } = this;
    // console.log(this.state.searchQuery);
    return (
      <Section>
        <Searchbar onSubmit={onSubmit} />

        {isLoading && images.length === 0 ? (<Loader />) :
        (images.length > 0 && (<ImageGallery images={images} showImage={bigImage}/>))
        }

        {isLoading && images.length === 0 && <Loader />}


      </Section>
    );
  }
};
