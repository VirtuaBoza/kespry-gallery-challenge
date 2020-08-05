import { css } from '@emotion/core';
import React, { useContext } from 'react';
import ImageInputForm from '../components/ImageInputForm';
import ImageViewer from '../components/ImageViewer';
import Thumbnails from '../components/Thumbnails';
import ImagesContext from '../contexts/ImagesContext';

const ImageGallery = () => {
  const { selectedImage } = useContext(ImagesContext);
  return (
    <main
      css={[
        css`
          display: flex;
          flex-direction: column;
        `,
        selectedImage
          ? css`
              height: 100vh;
            `
          : css`
              min-height: 100vh;
            `,
      ]}
    >
      <ImageInputForm />
      <Thumbnails />
      <ImageViewer />
    </main>
  );
};

export default ImageGallery;
