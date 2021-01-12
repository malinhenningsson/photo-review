import {useEffect, useState} from 'react'
import { db } from '../firebase'

const useGetAlbum = (albumId) => {
    const [album, setAlbum] = useState();

	useEffect(() => {
		const unsubscribe = db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		});
		return unsubscribe;
	}, [albumId]);
    
    return {album}
}

export default useGetAlbum
