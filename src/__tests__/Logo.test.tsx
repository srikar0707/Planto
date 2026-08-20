import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from '../components/Logo';

describe('Logo Component', () => {
  it('renders uploaded custom image logo when customLogoUrl is provided', () => {
    const testUrl = '/storage/product-images/logo.png';
    render(<Logo customLogoUrl={testUrl} size="md" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', testUrl);
    expect(img).toHaveAttribute('alt', 'PlantO Nursery Gardens Logo');
  });

  it('renders clean brand wordmark when customLogoUrl is empty', () => {
    render(<Logo customLogoUrl="" size="md" showSubtitle={true} />);
    expect(screen.getByText(/Plant/i)).toBeInTheDocument();
    expect(screen.getByText(/Nursery Gardens/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('hides subtitle when showSubtitle is false', () => {
    render(<Logo customLogoUrl="" size="sm" showSubtitle={false} />);
    expect(screen.getByText(/Plant/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nursery Gardens/i)).not.toBeInTheDocument();
  });
});
