import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

function TestAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content for section 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content for section 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content for section 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('renders all accordion items', () => {
    render(<TestAccordion />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Section 1' }));
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
  });

  it('collapses item on second click (single collapsible)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    await user.click(screen.getByRole('button', { name: 'Section 1' }));
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Section 1' }));
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
  });

  it('only shows one expanded item at a time (single type)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    await user.click(screen.getByRole('button', { name: 'Section 1' }));
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Section 2' }));
    expect(screen.queryByText('Content for section 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
  });

  it('has correct button role for triggers', () => {
    render(<TestAccordion />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Section 1');
    expect(buttons[1]).toHaveTextContent('Section 2');
    expect(buttons[2]).toHaveTextContent('Section 3');
  });
});
