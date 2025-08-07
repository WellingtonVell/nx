import { describe, expect, it } from 'vitest';
import { Button } from '@packages/ui/components/button';
import { render, screen } from '@testing-library/react';

describe('Button Component', () => {
  it('should render a button with text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Click me');
  });

  it('should render with default variant', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary');
  });

  it('should render with secondary variant', () => {
    render(<Button variant='secondary'>Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-secondary');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
