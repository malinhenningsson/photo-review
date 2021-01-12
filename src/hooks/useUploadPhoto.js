import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useUploadPhoto = (photo, albumId = null) => {
    const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(null);
    const { authUser } = useAuthContext();
    
    useEffect(() => {
        if (!photo) {
            setUploadedPhoto(null);
            setUploadProgress(null);
            setError(null);
            setSuccess(null);
            return;
        };

        setError(false);
        setSuccess(false);

        const fileRef = storage.ref(`images/${authUser.uid}/${photo.name}`)
        const uploadTask = fileRef.put(photo);

        uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred/taskSnapshot.totalBytes) * 100));
        })

        uploadTask.then(async snapshot => {
            const url = await snapshot.ref.getDownloadURL();

            const newPhoto = {
                name: photo.name,
                owner: authUser.uid,
				path: snapshot.ref.fullPath,
				size: photo.size,
				type: photo.type,
				url: url
            }
            if (albumId) {
				newPhoto.album = [db.collection('albums').doc(albumId)]
            }
            
            await db.collection('images').add(newPhoto);

            setSuccess(true);
            setUploadProgress(null);

            setUploadedPhoto(newPhoto);
            setSuccess(true);
        }).catch(err => {
			setError({
				type: "warning",
				msg: `Photo could not be uploaded due to an error (${err.code}).`
			})
        })
    }, [photo, authUser, albumId])

    return { uploadedPhoto, uploadProgress, error, success }
}

export default useUploadPhoto
