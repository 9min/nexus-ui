import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const renderFullTable = () =>
  render(
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>$400.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );

describe('Table', () => {
  it('renders a full table with all sub-components', () => {
    renderFullTable();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('A list of recent invoices.')).toBeInTheDocument();
    expect(screen.getByText('Invoice')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Paid')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$400.00')).toBeInTheDocument();
  });

  it('renders correct table structure with roles', () => {
    renderFullTable();

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rowgroups = screen.getAllByRole('rowgroup');
    expect(rowgroups).toHaveLength(3); // thead, tbody, tfoot

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4); // 1 header + 2 body + 1 footer

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(3);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(8); // 6 body cells + 2 footer cells
  });

  it('applies custom className to Table', () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('applies custom className to TableHeader', () => {
    render(
      <Table>
        <TableHeader className="custom-header">
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    const thead = screen.getByRole('table').querySelector('thead');
    expect(thead).toHaveClass('custom-header');
  });

  it('applies custom className to TableBody', () => {
    render(
      <Table>
        <TableBody className="custom-body">
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const tbody = screen.getByRole('table').querySelector('tbody');
    expect(tbody).toHaveClass('custom-body');
  });

  it('applies custom className to TableRow', () => {
    render(
      <Table>
        <TableBody>
          <TableRow className="custom-row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('row')).toHaveClass('custom-row');
  });

  it('applies custom className to TableHead', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="custom-head">Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(screen.getByRole('columnheader')).toHaveClass('custom-head');
  });

  it('applies custom className to TableCell', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell">Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('cell')).toHaveClass('custom-cell');
  });

  it('applies custom className to TableCaption', () => {
    render(
      <Table>
        <TableCaption className="custom-caption">Caption text</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Caption text')).toHaveClass('custom-caption');
  });

  it('applies custom className to TableFooter', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer">
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const tfoot = screen.getByRole('table').querySelector('tfoot');
    expect(tfoot).toHaveClass('custom-footer');
  });

  it('forwards ref to the table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('renders table with data-state=selected on rows', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>Selected row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = screen.getByRole('row');
    expect(row).toHaveAttribute('data-state', 'selected');
  });
});
