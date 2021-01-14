import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, act, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Register from './Register'
import { AuthContext } from '../../contexts/AuthContext'

it('input value for email is required when registering', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/');

    await act(async () => {
        render(
            <BrowserRouter history={history}>
                <AuthContext.Provider value={{ authUser: { uid: 'teXukZIq8MQevSrM17VtTxcE8nO2' }}}>
                    <Register />
                </AuthContext.Provider>
            </BrowserRouter>
        )
    })

    expect(screen.getByLabelText('email')).toHaveAttribute('required');
})