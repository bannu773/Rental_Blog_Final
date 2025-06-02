import { Spin } from 'antd';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spin size="large" />
    </div>
  );
};

export default Loading; 