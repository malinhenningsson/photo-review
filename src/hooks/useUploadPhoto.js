import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useUploadPhoto = (photo, albumId) => {
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
    const { authUser } = useAuthContext();
    
    useEffect(() => {
        if (!photo) {
            setUploadedPhoto(null);
            setError(null);
            setIsSuccess(null);
            return;
        };

        setError(false);
        setIsSuccess(false);

        const fileRef = storage.ref(`images/${authUser.uid}/${photo.name}`)
        const uploadTask = fileRef.put(photo);

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

            setIsSuccess(true);

            setUploadedPhoto(newPhoto);
            setIsSuccess(true);
        }).catch(err => {
            console.log("File upload triggered an error", err);
			setError({
				type: "warning",
				msg: `Image could not be uploaded due to an error (${err.code}).`
			})
        })
    }, [photo, authUser])

    return { uploadedPhoto, error, isSuccess }
}

export default useUploadPhoto
