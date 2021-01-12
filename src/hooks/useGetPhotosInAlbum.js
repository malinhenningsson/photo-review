import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

const useGetPhotosInAlbum = (albumId) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('album', 'array-contains', db.collection('albums').doc(albumId))
			.orderBy("name")
			.onSnapshot(snapshot => {
				setLoading(true);
				const imgs = [];

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setPhotos(imgs);
				setLoading(false);
			});
		return unsubscribe;
	}, [albumId]);
    return { photos, loading}
}

export default useGetPhotosInAlbum
