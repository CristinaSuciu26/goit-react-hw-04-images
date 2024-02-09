import React, { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './image-gallery/ImageGallery';
import ImageGalleryItem from './image-gallery-item/ImageGalleryItem';
import Button from './button/Button';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import pixabayService from './pixabay/Pixabay';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    src: '',
    alt: '',
  });

  const fetchImages = async (inputValue, page) => {
    setLoading(true);

    try {
      const { images: fetchedImages } = await pixabayService.searchImages(
        inputValue,
        page
      );

      setImages(prevImages =>
        page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
      );

      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchImages(inputValue, page + 1);
  };

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
    console.log('inputValue is now:', newValue);
  };

  const handleSearchSubmit = inputValue => {
    setInputValue(inputValue);
    setPage(1);
    setImages([]);
    setLoading(false);
    setModalOpen(false);

    fetchImages(inputValue, 1);
  };

  const openModal = image => {
    setModalOpen(true);
    setSelectedImage({
      src: image.webformatURL,
      alt: image.tags,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (inputValue.trim() === '') return;

    fetchImages(inputValue, 1);
  }, [inputValue]);

  return (
    <div>
      <Searchbar
        onSubmit={handleSearchSubmit}
        onChange={handleChange}
        value={inputValue}
      />
      <ImageGallery>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={`${image.id}-${index}`}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => openModal(image)}
          />
        ))}
      </ImageGallery>

      {loading && <Loader />}
      {images.length > 0 && (
        <Button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        src={selectedImage.src}
        alt={selectedImage.alt}
      />
    </div>
  );
};

export default App;
