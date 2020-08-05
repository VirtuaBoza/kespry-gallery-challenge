import { css } from '@emotion/core';
import React, { useContext, useState } from 'react';
import ImagesContext from '../contexts/ImagesContext';

const ImageInputForm = () => {
  const [validating, setValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const { addImage } = useContext(ImagesContext);

  function validateImageUrl(url) {
    setValidating(true);
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.hidden = true;
      img.onload = () => {
        document.body.removeChild(img);
        setValidating(false);
        setValidationMessage(null);
        resolve(true);
      };
      img.onerror = () => {
        document.body.removeChild(img);
        setValidating(false);
        setValidationMessage('Invalid image url');
        resolve(false);
      };
      img.src = url;
      document.body.appendChild(img);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitAttempted(true);
    validateImageUrl(imageUrl).then((isValid) => {
      if (isValid) {
        addImage({
          url: imageUrl,
          alt,
        });
        setImageUrl('');
        setAlt('');
        setSubmitAttempted(false);
      }
    });
  }

  function handleChange({ target: { value } }) {
    setImageUrl(value);
    if (submitAttempted) {
      validateImageUrl(value);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        align-self: center;
        margin: 1rem;
        > * {
          margin-bottom: 0.5rem;
        }
      `}
    >
      <Input
        id="image-url-input"
        label="Image Url"
        name="imageUrl"
        onChange={handleChange}
        value={imageUrl}
        validationMessage={validationMessage}
        submitAttempted={submitAttempted}
        validating={validating}
      />
      <Input
        id="image-alt-input"
        label="What is this an image of?"
        name="alt"
        onChange={(e) => setAlt(e.target.value)}
        value={alt}
      />
      <div
        css={css`
          text-align: center;
        `}
      >
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

const Input = ({
  label,
  id,
  validationMessage,
  submitAttempted,
  validating,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        css={css`
          display: block;
        `}
      >
        {label}
      </label>
      <input id={id} {...props} />
      <p
        css={css`
          color: red;
        `}
      >
        {(submitAttempted && !validating && validationMessage) || (
          <span
            css={css`
              visibility: hidden;
            `}
          >
            Keep height
          </span>
        )}
      </p>
    </div>
  );
};

export default ImageInputForm;
