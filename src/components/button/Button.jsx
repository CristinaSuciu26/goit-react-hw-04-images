import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, disabled }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
