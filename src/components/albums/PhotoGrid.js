import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../contexts/AuthContext'

const PhotoGrid = ({ photo, albumId, handleDeletePhoto, updateSelectedPhotos, updatePhotoReaction }) => {
    const { authUser } = useAuthContext();

    return (
        <Col xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <Card className="mb-4">
                <a href={photo.url} >
                    <Card.Img variant="top" src={photo.url} />
                </a>
                <Card.Body className="d-flex justify-content-between" id={photo.id}>
                    {
                        authUser ? (
                            <>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id={photo.id} 
                                        name="selected-photo" 
                                        className="mr-2" 
                                        onChange={updateSelectedPhotos}
                                        />
                                    <label htmlFor="selected-photo">Select</label>
                                </div>
                                <div>
                                    <button 
                                        style={{ border: "none", backgroundColor: "transparent" }} 
                                        onClick={() => handleDeletePhoto(photo, albumId)}>
                                            <FontAwesomeIcon 
                                                icon={faTrashAlt}
                                                style={{ color: "#fff"}}
                                            />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button 
                                    style={{ border: "none", backgroundColor: "transparent" }} 
                                    className="thumbs-up"
                                    onClick={() => updatePhotoReaction(photo, true)} >
                                        <FontAwesomeIcon 
                                            icon={faThumbsUp}
                                            style={{ fontSize: "1.5em", margin: "0 0.5em" }} 
                                            />
                                </button>

                                <button 
                                    style={{ border: "none", backgroundColor: "transparent" }} 
                                    className="thumbs-down"
                                    onClick={() => updatePhotoReaction(photo, false)} >
                                        <FontAwesomeIcon 
                                            icon={faThumbsDown} 
                                            style={{ fontSize: "1.5em", margin: "0 0.5em"}} 
                                            />
                                </button>
                            </>
                        )
                    }

                </Card.Body>
            </Card>
        </Col>
    )
}

export default PhotoGrid
