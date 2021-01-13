import {useEffect, useState} from 'react'
import { db } from '../firebase'

const useGetAlbum = (albumId) => {
	const [album, setAlbum] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = db.collection('albums').doc(albumId).get().then(doc => {
			console.log(doc.id);
			console.log(doc.data());
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		}).then(res => {
			setLoading(false);
		});
		return unsubscribe;
	}, [albumId]);
    
    return {album, loading}
}

export default useGetAlbum
