'use client';

import Lottie from 'lottie-react';
import defaultLoader from '@public/assets/gif/loader.json';
import { useLoader } from '@/components/common/loader/loaderContext';

const FullScreenLoader = () => {
  const { isVisible, loaderComponent } = useLoader();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      {loaderComponent ? (
        loaderComponent
      ) : (
        <Lottie animationData={defaultLoader} loop autoplay className="w-[400px] h-[400px]" />
      )}
    </div>
  );
};

export default FullScreenLoader;
