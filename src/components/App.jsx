import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Section } from "./App.styled";
import { Loader } from "./Loader/Loader";
import { LoadMoreButton } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";

import { mapper } from "services/mapper";
import { getImages } from "api/getImages";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// ================== Notiflix  init ==================

Notify.init({
width: '700px',
position: 'right-top',
closeButton: false,
distance: '10px',
opacity: 5,
borderRadius: '5px',
rtl: false,
timeout: 2000,
messageMaxLength: 110,
backOverlay: false,
backOverlayColor: 'rgba(0,0,0,0.9)',
plainText: true,
showOnlyTheLastOne: false,
clickToClose: true,
pauseOnHover: true,
zindex: 4001,
fontFamily: 'Quicksand',
fontSize: '32px',
});



export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    bigImage: [],
    totalHits: 0,
    sumImages: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true })
        getImages(searchQuery, page).then(r => {

          let customImagesData = mapper(r.data.hits)
          // console.log(customImagesData);
          // console.log(r.data);
          if (r.data.hits.length === 0) {
            this.setState({ isLoading: false });
            Notify.info('we do not have this images');
            // console.log('we do not have this images');
            return;
          }
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...customImagesData],
              isLoading: false,
              totalHits: r.data.totalHits,
              sumImages: 0,
            }
          })
        })
        

      } catch (error) {
        this.setState({ isLoading: false })
        console.log(error);
      }
      
    }
    
  }

  onSubmit = searchQuery => {
    this.setState({
      images: [],
      searchQuery: searchQuery,
      page: 1,
      isLoading: false,
      showModal: false,
      bigImage: [],
      totalHits: 0,
      sumImages: 0,
    })
  }

  loadMore = () => {
    // this.setState(prevState => {
    //   return{
    //   page: prevState.page += 1,
    // }
    // })
    // console.log('load image');

    let { page } = this.state;
    page += 1;
    this.setState({ page });
  }

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      }
    })
  }

  showImage = (id) => {
    const { toggleModal } = this;
    const { images } = this.state;
    images.map(image => {
      if (image.id === id) {
        toggleModal()
        return this.setState({bigImage: image})
      }
      return image
    })

  }

  render() {
    const { images, isLoading, bigImage, showModal } = this.state; //totalHits, sumImages
    const { onSubmit, loadMore, toggleModal, showImage } = this; 
    // console.log(this.state.searchQuery);
    return (
      <Section>
        <Searchbar onSubmit={onSubmit} />

        { isLoading &&
          !images.length ?
          (<Loader />) :
          (images.length > 0 &&
          (<ImageGallery images={images} showImage={showImage} />))
        }

        { isLoading &&
          images.length  &&
          <Loader />
        }

        {/* totalHits !== sumImages && */}
        { 
          images.length > 0 &&
          isLoading === false &&
          (<LoadMoreButton loadMore={loadMore} />)
        }

        {showModal && (
          <Modal toggleModal={toggleModal} bigImage={bigImage} />
        )}
      </Section>
    );
  }
};
