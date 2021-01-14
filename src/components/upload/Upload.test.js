import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Upload from './Upload'
import { AuthContext } from '../../contexts/AuthContext'

it('renders upload form for autheticated user', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/');

    await act(async () => {
        render(
            <BrowserRouter history={history}>
                <AuthContext.Provider value={{ authUser: { uid: 'teXukZIq8MQevSrM17VtTxcE8nO2' }}}>
                    <Upload />
                </AuthContext.Provider>
            </BrowserRouter>
        )
    })

    expect(screen.getByRole('button', {type: "submit"})).toBeInTheDocument();
})