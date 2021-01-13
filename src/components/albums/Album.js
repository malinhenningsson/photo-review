import React, { useState } from 'react'
import { Alert, Container, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import useGetAlbum from '../../hooks/useGetAlbum'
import useGetPhotosInAlbum from '../../hooks/useGetPhotosInAlbum'
import PhotoUpload from '../upload/PhotoUpload'
import {SRLWrapper} from "simple-react-lightbox"
import { db } from '../../firebase'
import firebase from 'firebase/app'
import { useAuthContext } from '../../contexts/AuthContext'
import useDeletePhoto from '../../hooks/useDeletePhoto'
import LoadingSpinner from '../LoadingSpinner'
import PhotoGrid from './PhotoGrid'

const Album = () => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [deletePhoto, setDeletePhoto] = useState(null);
    const [error, setError] = useState(false);
    const [reviewLink, setReviewLink] = useState(null);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [uploadNewPhotos, setUploadNewPhotos] = useState(false);
    
    const { albumId } = useParams();
    const navigate = useNavigate();

    const {album} = useGetAlbum(albumId);
    const {photos, loading} = useGetPhotosInAlbum(albumId);
    const { authUser } = useAuthContext();
    
    useDeletePhoto(deletePhoto, albumId);

    const handleCreateNewAlbum = async () => {
        const title = prompt('New album title:');

        if (title.length < 3) {
            setError('Title must be at least 3 chars.')
            return; 
        };

        setError(false);
        setBtnDisabled(true);

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: authUser.uid
            });

            await selectedPhotos.forEach(photo => {
                db.collection('images').doc(photo).update({
                    album: firebase.firestore.FieldValue.arrayUnion(db.collection('albums').doc(docRef.id))
                })
            });
            navigate(`/albums`);
        } catch (err) {
            setError(err.message);
            setBtnDisabled(false);
        };
    };

    const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin;
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
    };

    const handleDeletePhoto = (photo) => {
        setBtnDisabled(true);

        if (photo.length > 1) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete these ${photo.length} photos?`)) {
                    setDeletePhoto(photo);
                    setSelectedPhotos([]);
                    setBtnDisabled(false);
            }} else {
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete photo \n"${photo.name}"?`)) {
                    setDeletePhoto(photo);
                    setBtnDisabled(false);
            };
        };
    };

    const updateSelectedPhotos = (e) => {
        let photoArray = [];

        // Include photo if checked and doesn't already exist in array
        if (e.target.checked === true) {
            if (selectedPhotos.includes(e.target.id)) {
                return;
            };
            photoArray.push(e.target.id);
            setSelectedPhotos(selectedPhotos.concat(photoArray));
        };

        // Remove photo from selected photos
        if (e.target.checked === false) {
            let filteredArray = selectedPhotos.filter(photo => {
                return photo !== e.target.id
            });
            setSelectedPhotos(filteredArray)
        };
    };

    return (
        <Container fluid className="px-4 mt-4 mb-5">
            <h2 className="text-center">{album && album.title}</h2>
            <p className="text-center mb-2">{album && album.description}</p>

            <div className="d-flex justify-content-between mb-3">
                <div>
                    <button 
                        className="btn btn-standard" 
                        onClick={() => {navigate(`/albums/edit/${albumId}`)}}>
                            Edit album info
                    </button>
                    <button 
                        className="btn btn-standard ms-2" 
                        onClick={() => {handleCreateReviewLink(albumId)}}>
                        Create client review
                    </button>
                </div>

                <button className="btn btn-standard ms-2" onClick={() => {setUploadNewPhotos(!uploadNewPhotos)}}>
                    {
                        uploadNewPhotos 
                        ? "Hide uploader" 
                        : "Add photos"
                    }
                </button>
            </div>

            {
                reviewLink && (
                    <p>Review link: <a href={reviewLink}>{reviewLink}</a></p>
                )
            }

            {
                uploadNewPhotos && (
                    <PhotoUpload albumId={albumId} />
                )
            }

            {
                error && (
                    <Alert variant="danger">{error}</Alert>
                )
            }

            <SRLWrapper>
                <Row className="justify-content-md-center my-4">
                    {
                        loading
                            ? (
                                <LoadingSpinner />
                            )
                            : (
                                photos.map(photo => (
                                    <PhotoGrid 
                                        photo={photo} 
                                        albumId={albumId} 
                                        updateSelectedPhotos={updateSelectedPhotos} 
                                        handleDeletePhoto={handleDeletePhoto}
                                        key={photo.id} 
                                        />
                                ))
                            )  
                    }
                </Row>
            </SRLWrapper>

            {
                selectedPhotos.length > 0 && (
                    <div className="text-center mt-3">
                        <p>Selected photos: {selectedPhotos.length}</p>
                        <div className="d-flex justify-content-center">
                            <button 
                                disabled={btnDisabled} 
                                className="btn btn-standard" 
                                onClick={handleCreateNewAlbum}>
                                    Create new album
                            </button>
                            <button 
                                disabled={btnDisabled} 
                                className="btn btn-standard ms-3"
                                onClick={() => handleDeletePhoto(selectedPhotos)}>
                                    Delete photos
                            </button>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}

export default Album
