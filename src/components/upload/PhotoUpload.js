import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadPhoto from '../../hooks/useUploadPhoto'

const PhotoUpload = ({ albumId }) => {
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState(null);
    const { uploadProgress, error, isSuccess } = useUploadPhoto(photo, albumId);

    useEffect(() => {
        if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image successfully uploaded!',
			});
			setPhoto(null);
		} else {
			setMessage(null);
		}
    }, [error, isSuccess])

    const onDrop = useCallback(acceptedFiles => {
        setMessage(null);

        if (acceptedFiles.length === 0) {
            return;
        }

        acceptedFiles.forEach(file => {
            setPhoto(file);
        })
    }, []);

    const {
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept
    } = useDropzone({accept: 'image/gif, image/jpeg, image/png', onDrop});

    return (
        <>
            <div {...getRootProps()} className="photo-upload-zone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        isDragAccept ? 
                            <span style={{color: "lightgreen"}}>Drop the files here!</span> 
                            : <span style={{color: "#fc5e5e"}}>Files are not accepted. Try again with: JPEG, PNG or GIF.</span> 
                        : <span>Drag 'n' drop some files here, or click to select files</span>
                }

                {
                    message && (
                        <p>{message.text}</p>
                    )
                }
            </div>
        </>
    )
}

export default PhotoUpload
