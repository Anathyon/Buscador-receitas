import { render, screen, fireEvent } from '@testing-library/react';
import RecipeModal from './RecipeModal';
import { IntlProvider } from 'react-intl';
import { useFavoriteStore } from '../store/useFavoriteStore';
import '@testing-library/jest-dom';

// Mock html2pdf.js
jest.mock('html2pdf.js', () => {
    return jest.fn().mockReturnValue({
        set: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        save: jest.fn().mockReturnThis(),
    });
});

// Mock Zustand store
jest.mock('../store/useFavoriteStore', () => ({
    useFavoriteStore: jest.fn(),
}));

const mockRecipe = {
    idMeal: '1',
    strMeal: 'Test Recipe',
    strDrinkAlternative: null,
    strCategory: 'Test Category',
    strArea: 'Test Area',
    strInstructions: 'Test Instructions',
    strMealThumb: 'test.jpg',
    strTags: null,
    strYoutube: 'https://youtube.com/test',
};

const messages = {
    'modal.watchVideo': 'Watch Video',
    'modal.downloadPDF': 'Download PDF',
    'modal.ingredientsTitle': 'Ingredients',
    'modal.instructionsTitle': 'Instructions',
    'header.appName': 'Recipe App',
};

describe('RecipeModal', () => {
    beforeEach(() => {
        (useFavoriteStore as unknown as jest.Mock).mockReturnValue({
            isFavorite: jest.fn().mockReturnValue(false),
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
        });
    });

    it('renders the recipe details and the download PDF button', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <RecipeModal recipe={mockRecipe} onClose={jest.fn()} />
            </IntlProvider>
        );

        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
        expect(screen.getByText('Download PDF')).toBeInTheDocument();
    });

    it('shows loading state when download button is clicked', async () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <RecipeModal recipe={mockRecipe} onClose={jest.fn()} />
            </IntlProvider>
        );

        const downloadButton = screen.getByText('Download PDF');
        fireEvent.click(downloadButton);

        // Verifica se o estado de carregamento aparece
        expect(screen.getByText('Generating...')).toBeInTheDocument();
        expect(downloadButton).toBeDisabled();
    });
});
