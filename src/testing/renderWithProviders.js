import { render } from '@testing-library/react';
import React from 'react';
import { ImagesProvider } from '../contexts/ImagesContext';

export default function renderWithProviders(element, state = {}) {
  return render(
    <ImagesProvider defaultImages={state.images}>{element}</ImagesProvider>
  );
}
