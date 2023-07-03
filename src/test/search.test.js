import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../components/component/search';

describe('Componente Search', () => {
  it('se renderiza sin errores', () => {
    render(<Search toppodcasts={[]} handleSearchChange={() => {}} />);
  });

  it('muestra el número de toppodcasts en el span', () => {
    const toppodcasts = [/* datos de toppodcasts de ejemplo */];
    const { getByText } = render(<Search toppodcasts={toppodcasts} handleSearchChange={() => {}} />);
    const span = getByText(toppodcasts.length.toString());
    expect(span).toBeInTheDocument();
  });

  it('llama a la función handleSearchChange al cambiar el valor del input', () => {
    const handleSearchChange = jest.fn();
    const { getByPlaceholderText } = render(<Search toppodcasts={[]} handleSearchChange={handleSearchChange} />);
    const input = getByPlaceholderText('Filter podcasts...');
    fireEvent.change(input, { target: { value: 'example' } });
    expect(handleSearchChange).toHaveBeenCalled();
  });
});