import styles from './Loader.module.css';
import { ThreeDots as LoaderSpinner } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderSpinner color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Loader;
