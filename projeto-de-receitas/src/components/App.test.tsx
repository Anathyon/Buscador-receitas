import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../store/useLanguageStore', () => ({
  useLanguageStore: () => ({
    locale: 'pt',
    setLocale: jest.fn(),
  }),
}));

jest.mock('../store/useFavoriteStore', () => ({
  useFavoriteStore: () => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(() => false),
  }),
}));

jest.mock('../hooks/useRecipes', () => ({
  useRecipes: () => ({
    recipes: [],
    loading: false,
    loadRecipes: jest.fn(),
  }),
}));

jest.mock('../services/recipeService', () => ({
  recipeService: {
    fetchRecipes: jest.fn(() => Promise.resolve([])),
    fetchCategories: jest.fn(() => Promise.resolve([])),
  },
}));

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<AppWithRouter />);
    expect(container).toBeInTheDocument();
  });
});