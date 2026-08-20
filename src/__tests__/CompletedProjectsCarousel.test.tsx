import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CompletedProjectsCarousel } from '../components/CompletedProjectsCarousel';
import { INITIAL_SETTINGS, INITIAL_COMPLETED_PROJECTS } from '../data/initialData';

describe('CompletedProjectsCarousel Component', () => {
  it('renders completed projects carousel with title and initial slides', () => {
    render(<CompletedProjectsCarousel settings={INITIAL_SETTINGS} />);

    expect(screen.getByText('Our Completed Projects')).toBeInTheDocument();
    expect(screen.getByText(INITIAL_COMPLETED_PROJECTS[0].title)).toBeInTheDocument();
  });

  it('navigates to next and previous slides when clicking arrows', () => {
    render(<CompletedProjectsCarousel settings={INITIAL_SETTINGS} />);

    const nextButton = screen.getByLabelText('Next Project');
    const prevButton = screen.getByLabelText('Previous Project');

    // Initially on slide 1
    expect(screen.getByText(INITIAL_COMPLETED_PROJECTS[0].title)).toBeInTheDocument();

    // Click Next
    fireEvent.click(nextButton);
    expect(screen.getByText(INITIAL_COMPLETED_PROJECTS[1].title)).toBeInTheDocument();

    // Click Prev
    fireEvent.click(prevButton);
    expect(screen.getByText(INITIAL_COMPLETED_PROJECTS[0].title)).toBeInTheDocument();
  });

  it('opens WhatsApp enquiry with project details when clicking enquiry button', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<CompletedProjectsCarousel settings={INITIAL_SETTINGS} />);

    const enquireButtons = screen.getAllByText(/Enquire Similar Project/i);
    expect(enquireButtons.length).toBeGreaterThan(0);

    fireEvent.click(enquireButtons[0]);

    expect(openSpy).toHaveBeenCalled();
    const calledUrl = openSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain('wa.me');
    expect(calledUrl).toContain(encodeURIComponent(INITIAL_COMPLETED_PROJECTS[0].title));

    openSpy.mockRestore();
  });
});
