import {useEffect} from 'react';
import { db, storage } from "../firebase";
import firebase from 'firebase/app'

const useDeleteAlbum = (album) => {
    useEffect(() => {
        if (!album) {
            return;
        };

       async function deleteData() {
            // get all photos for album
            db.collection('images')
                .where('album', 'array-contains', db.collection('albums').doc(album.id)).get()
                .then(res => {
                    res.forEach(photo => {
                        // remove album-reference in database
                        photo.ref.update({
                            album: firebase.firestore.FieldValue.arrayRemove(db.collection('albums').doc(album.id))
                        });

                        photo.ref.get().then(res => {
                            // check if photo has more album-references,
                            // if false delete from database and storage
                            if (res.data().album.length < 1) {
                                storage.ref(res.data().path).delete();
                                db.collection('images').doc(res.id).delete();
                            }
                        })
                    })
                }).then(res => {
                    // delete album from database
                    db.collection('albums').doc(album.id).delete();
                }).catch(err => {
                    console.error(err)
                });
        };
        deleteData();
    }, [album]);
    return {}
}

export default useDeleteAlbum