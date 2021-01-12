import {useEffect, useState} from 'react';
import { db, storage } from "../firebase";
import firebase from 'firebase/app';
import useDeletePhoto from './useDeletePhoto';

const useDeleteAlbum = (album) => {
    const [photos, setPhotos] = useState();
    const [albumId, setAlbumId] = useState();
    useDeletePhoto(photos, albumId)

    useEffect(async () => {
        if (!album) {
            return;
        }
        setAlbumId(album.id);

       (async () => {
            // get images for album
            // THIS PART GIVES ERRORS - FIX IT!!
            db.collection('images')
                .where('album', 'array-contains', db.collection('albums').doc(album.id))
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        setPhotos({
                            id: doc.id,
                            ...doc.data(),
                        })
                    });
                });

            // delete album from database
            await db.collection('albums').doc(album.id).delete();
        })();
    }, [album]);
    return {}
}

export default useDeleteAlbum