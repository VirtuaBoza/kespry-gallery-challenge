import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import render from '../testing/renderWithProviders';
import ImageGallery from './ImageGallery';

Element.prototype.scrollTo = () => {};

describe('ImageGallery', () => {
  let imageOnload = null;

  function trackImageOnload() {
    Object.defineProperty(Image.prototype, 'onload', {
      get: function () {
        return this._onload;
      },
      set: function (fn) {
        imageOnload = fn;
        this._onload = fn;
      },
    });
  }

  test('A user should be able to add images to the gallery via entering the URL of an image on the web into a text field and the gallery should display thumbnails of all images', async () => {
    trackImageOnload();
    const { container } = render(<ImageGallery />);

    const input = screen.getByLabelText('Image Url');

    act(() => {
      fireEvent.change(input, {
        target: {
          value:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
        },
      });
    });

    const submit = screen.getByText('Submit');

    act(() => {
      fireEvent.click(submit);
      imageOnload();
    });

    await waitFor(() => {
      expect(container.querySelector('li img')).not.toBe(null);
    });
  });
  test('The gallery should display thumbnails of all images', async () => {
    const { container } = render(<ImageGallery />, {
      images: [
        {
          id: '1',
          url:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
        },
        {
          id: '2',
          url:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
        },
      ],
    });

    await waitFor(() =>
      expect(container.querySelectorAll('li img').length).toBe(2)
    );
  });
  test('When a thumbnail is clicked, that image should display at a large size below the thumbnails', async () => {
    const { container } = render(<ImageGallery />, {
      images: [
        {
          id: '1',
          url:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
        },
      ],
    });

    const thumbnail = container.querySelector('li img');
    fireEvent.click(thumbnail);

    await waitFor(() =>
      expect(container.querySelectorAll('img').length).toBe(2)
    );
  });
  test('There should be buttons by the large image to display the previous and next image, such that the user can scroll through the gallery without clicking the thumbnails every time and the previous and next buttons should loop if the user is on the first or last image', async () => {
    const { container } = render(<ImageGallery />, {
      images: [
        {
          id: '1',
          url:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
          alt: 'cow',
        },
        {
          id: '2',
          url:
            'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg',
          alt: 'chicken',
        },
      ],
    });
    const thumbnail = container.querySelector('li img');

    fireEvent.click(thumbnail);

    await waitFor(() =>
      expect(container.querySelectorAll('img')[2].alt).toBe('cow')
    );

    const previous = await screen.findByLabelText('Previous Image');
    fireEvent.click(previous);

    await waitFor(() =>
      expect(container.querySelectorAll('img')[2].alt).toBe('chicken')
    );

    const next = await screen.findByLabelText('Previous Image');
    fireEvent.click(next);

    await waitFor(() =>
      expect(container.querySelectorAll('img')[2].alt).toBe('cow')
    );
  });
});
