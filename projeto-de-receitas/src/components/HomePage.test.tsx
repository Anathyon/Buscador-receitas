import { render } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../hooks/useRecipes', () => ({
  useRecipes: () => ({
    recipes: [],
    loading: false,
    loadRecipes: jest.fn(),
  }),
}));

jest.mock('react-intl', () => ({
  FormattedMessage: ({ id }: { id: string }) => <span>{id}</span>,
  useIntl: () => ({
    formatMessage: ({ id }: { id: string }) => id,
  }),
}));

describe('HomePage Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeInTheDocument();
  });
});