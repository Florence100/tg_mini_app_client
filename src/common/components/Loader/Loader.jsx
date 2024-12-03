import Lottie from 'lottie-react';
import pizza from './pizza.json';

const Loader = () => {
  return <Lottie animationData={pizza} />;
};

export default Loader;