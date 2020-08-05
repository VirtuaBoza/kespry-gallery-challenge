import { css } from '@emotion/core';
import React, { useContext, useEffect, useRef } from 'react';
import ImagesContext from '../contexts/ImagesContext';

const Thumbnails = () => {
  const { images, selectedImage } = useContext(ImagesContext);
  const containerRef = useRef();
  const imgLinksRef = useRef([]);

  useEffect(() => {
    const currentIndex = images.indexOf(selectedImage);
    if (currentIndex >= 0) {
      const imgLink = imgLinksRef.current[currentIndex];
      containerRef.current.scrollTo({ left: imgLink.offsetLeft });
      imgLink.focus();
    }
  }, [images, selectedImage]);

  return (
    <ul
      css={[
        css`
          padding: 1.5rem;
          display: flex;
          margin-top: -1rem;
          margin-left: -1rem;
          flex-wrap: ${selectedImage ? 'no-wrap' : 'wrap'};
        `,
        selectedImage &&
          css`
            flex-shrink: 0;
            overflow-x: auto;
          `,
      ]}
      ref={containerRef}
    >
      {images.map(({ id, url, alt }, i) => {
        const title = alt || 'User submitted content';
        return (
          <li
            key={id}
            css={css`
              max-width: 275px;
              min-width: 225px;
              margin-top: 1rem;
              margin-left: 1rem;
              flex: 1;
            `}
          >
            <a href={`#${id}`} ref={(ref) => (imgLinksRef.current[i] = ref)}>
              <img
                src={url}
                alt={title}
                title={title}
                css={css`
                  width: 100%;
                `}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Thumbnails;
