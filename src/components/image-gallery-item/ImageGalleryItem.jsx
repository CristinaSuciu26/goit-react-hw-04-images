import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        className={styles.galleryItemImage}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
