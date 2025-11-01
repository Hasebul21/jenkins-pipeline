import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('renders input fields and submit button', () => {
        render(<App />);
        expect(screen.getByLabelText(/first number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/second number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    });

    it('shows error for invalid input', () => {
        render(<App />);
        const firstInput = screen.getByLabelText(/first number/i);
        const secondInput = screen.getByLabelText(/second number/i);
        const submitButton = screen.getByRole('button', { name: /calculate/i });

        fireEvent.change(firstInput, { target: { value: 'abc' } });
        fireEvent.change(secondInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/please enter valid numbers/i)).toBeInTheDocument();
    });

    it('handles successful API call', async () => {
        const mockResponse = { result: 150 };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        render(<App />);
        const firstInput = screen.getByLabelText(/first number/i);
        const secondInput = screen.getByLabelText(/second number/i);
        const submitButton = screen.getByRole('button', { name: /calculate/i });

        fireEvent.change(firstInput, { target: { value: '100' } });
        fireEvent.change(secondInput, { target: { value: '50' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/result: 150/i)).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: 100, b: 50 }),
        });
    });

    it('handles API error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            })
        );

        render(<App />);
        const firstInput = screen.getByLabelText(/first number/i);
        const secondInput = screen.getByLabelText(/second number/i);
        const submitButton = screen.getByRole('button', { name: /calculate/i });

        fireEvent.change(firstInput, { target: { value: '100' } });
        fireEvent.change(secondInput, { target: { value: '50' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/error: failed to calculate/i)).toBeInTheDocument();
        });
    });
});