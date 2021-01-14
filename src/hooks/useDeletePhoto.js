import {useEffect} from 'react';
import { db, storage } from "../firebase";
import firebase from 'firebase/app'

const useDeletePhoto = (photo, albumId) => {
    useEffect(() => {
        if (!photo) {
            return;
        }
        if (!albumId) {
            return;
        }

       async function deleteData() {
            if (photo.length > 1) {
                await photo.forEach(item => {
                    // Remove album-reference in database
                    db.collection('images').doc(item).update({
                        album: firebase.firestore.FieldValue.arrayRemove(db.collection('albums').doc(albumId))
                    });
                
                    // Check if photo exists in other albums, if not delete from database and storage
                    db.collection('images').doc(item).get()
                        .then(doc => {
                            if (doc.data().album.length < 1) {
                                db.collection('images').doc(item).delete();
                                storage.ref(doc.data().path).delete();
                            }
                        });
                })
            } else {
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
            }
        };
        deleteData();
        
    }, [photo, albumId]);
    return {}
}

export default useDeletePhoto
