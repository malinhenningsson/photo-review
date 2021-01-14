import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, act, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App'

it('renders register button', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/albums');

    await act(async () => {
        render(
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>
        )

        // When not logged in, page should not show albums
        expect(screen.queryByText(/Albums/)).toBeNull()
    })
})