import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, act, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

it('renders register button', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/');

    await act(async () => {
        render(
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        )
    })

    expect(screen.getByRole('button', { name: 'Join For Free' })).toBeInTheDocument();
})