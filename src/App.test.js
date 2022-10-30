import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const article = screen.getByRole('h2', { name: "Partidos" });
  expect(article).toBeInTheDocument();
});
