import React, {useEffect, useState} from 'react'
import { db } from '../firebase'

const useGetAlbum = (albumId) => {
    const [album, setAlbum] = useState();
	const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		})
	}, [albumId]);

	useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
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
    
    return {album, photos, loading}
}

export default useGetAlbum
