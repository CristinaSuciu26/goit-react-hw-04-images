import { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, src, alt }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClickOutside = useCallback(
    e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleClickOutside}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className={styles.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Modal;
