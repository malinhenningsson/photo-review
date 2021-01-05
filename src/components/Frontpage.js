import React from 'react'
import { Button } from 'react-bootstrap'

const Frontpage = () => {
    return (
        <div className="frontpage-wrapper">
            <div className="frontpage-content">
                <h1>Review Photos.</h1>
                <h2>Collaboration between photographers and clients made easy.</h2>
                <Button className="mt-3" variant="light" size="lg">Join For Free</Button>
            </div>
        </div>
    )
}

export default Frontpage
