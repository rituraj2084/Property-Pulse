'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};
const Spinner = () => {
  return (
    <ClipLoader
      cssOverride={override}
      color="#3b82f6"
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
