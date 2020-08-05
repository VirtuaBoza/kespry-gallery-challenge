import { css } from '@emotion/core';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillDelete,
  AiOutlineClose,
} from 'react-icons/ai';
import ImagesContext from '../contexts/ImagesContext';

const IconLink = styled.a`
  display: flex;
  margin: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: white;
  > * {
    margin: auto;
  }
  &:hover {
    background-color: hsla(0, 100%, 100%, 0.2);
  }
`;

const ImageViewer = () => {
  const { images, selectedImage, deleteImage } = useContext(ImagesContext);
  const imgRef = useRef();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(() => {
    const img = imgRef.current;
    if (img) {
      setHeight(img.height);
      setWidth(img.width);
    }
  }, []);

  useLayoutEffect(() => {
    handleResize();
    const debouncedHandleResize = debounce(handleResize, 50);

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  const currentIndex = images.indexOf(selectedImage);

  return selectedImage ? (
    <div
      css={css`
        flex: 1;
        background-color: black;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
        `}
      >
        <IconLink href="#">
          <AiOutlineClose />
        </IconLink>
        <button
          css={css`
            display: flex;
            margin: 1rem;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            color: white;
            background-color: transparent;
            border: none;
            > * {
              margin: auto;
            }
            &:hover {
              background-color: hsla(0, 100%, 100%, 0.2);
            }
          `}
          aira-label="Delete"
          title="Delete"
          onClick={() => deleteImage(selectedImage.id)}
        >
          <AiFillDelete />
        </button>
      </div>
      <div
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
        `}
      >
        <IconLink
          href={`#${
            images[(images.length + currentIndex - 1) % images.length].id
          }`}
          aria-label="Previous Image"
        >
          <AiFillCaretLeft />
        </IconLink>
        <div
          css={css`
            flex: 1;
            height: 100%;
            position: relative;
          `}
        >
          <img
            css={css`
              position: absolute;
              max-width: 100%;
              max-height: 100%;
              left: 50%;
              top: 50%;
              margin-left: -${width / 2}px;
              margin-top: -${height / 2}px;
            `}
            src={selectedImage.url}
            alt={selectedImage.alt || 'User submitted content'}
            title={selectedImage.alt || 'User submitted content'}
            ref={imgRef}
          />
        </div>
        <IconLink
          href={`#${images[(currentIndex + 1) % images.length].id}`}
          aria-label="Next Image"
        >
          <AiFillCaretRight />
        </IconLink>
      </div>
    </div>
  ) : null;
};

export default ImageViewer;
