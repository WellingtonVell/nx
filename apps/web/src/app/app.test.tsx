import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('App Component', () => {
  it('should render Hello world text', () => {
    render(<App />);
    const helloText = screen.getByText('Hello World');
    expect(helloText).toBeTruthy();
  });
});
