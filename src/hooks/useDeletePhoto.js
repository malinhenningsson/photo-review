import {useEffect} from 'react';
import { db, storage } from "../firebase";
import firebase from 'firebase/app'

const useDeletePhoto = (photo, albumId) => {
    useEffect(async () => {
        if (!photo) {
            return;
        }

       (async () => {
           // Remove album-reference in database
           await db.collection('images').doc(photo.id).update({
                album: firebase.firestore.FieldValue.arrayRemove(db.collection('albums').doc(albumId))
            });
           
           // Check if photo exists in other albums, if not delete from database and storage
           db.collection('images').doc(photo.id).get()
            .then(doc => {
                if (doc.data().album.length < 1) {
                    db.collection('images').doc(photo.id).delete();
                    storage.ref(photo.path).delete();
                }
            });
        })();
        
    }, [photo]);
    return {}
}

export default useDeletePhoto