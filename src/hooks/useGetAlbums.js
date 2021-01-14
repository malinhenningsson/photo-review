import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext';

const useGetAlbums = () => {
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const unsubscribe = db.collection('albums')
            .where('owner', '==', authUser.uid)
            .orderBy('title')
            .onSnapshot(snapshot => {
                setLoading(true);
                const snapshotAlbums = [];
                snapshot.forEach(doc => {
                    snapshotAlbums.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setAlbums(snapshotAlbums);
                setLoading(false);
        })
        return unsubscribe;
    }, [authUser.uid])

    return {albums, loading}
}

export default useGetAlbums
