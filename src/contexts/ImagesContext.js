import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const ImagesContext = React.createContext();

const storedImages = JSON.parse(localStorage.getItem('images'));

export const ImagesProvider = ({ children, defaultImages = [] }) => {
  const [images, setImages] = useState(storedImages || defaultImages);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    function setImageFromHash(hash) {
      setSelectedImage(images.find(({ id }) => id === hash.substring(1)));
    }

    setImageFromHash(window.location.hash);

    function handleHashChange({
      target: {
        location: { hash },
      },
    }) {
      setImageFromHash(hash);
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [images]);

  const addImage = useCallback(
    (image) => {
      const newImages = [...images, { ...image, id: uuid() }];
      setImages(newImages);
      localStorage.setItem('images', JSON.stringify(newImages));
    },
    [images]
  );

  const deleteImage = useCallback(
    (id) => {
      const newImages = images.filter((image) => image.id !== id);
      setImages(newImages);
      localStorage.setItem('images', JSON.stringify(newImages));
    },
    [images]
  );

  return (
    <ImagesContext.Provider
      value={{ images, addImage, selectedImage, deleteImage }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesContext;
