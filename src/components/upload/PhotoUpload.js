import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadPhoto from '../../hooks/useUploadPhoto'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PhotoUpload = ({ albumId }) => {
    const [message, setMessage] = useState(null);
    const [photo, setPhoto] = useState(null);
    const { uploadProgress, error, success } = useUploadPhoto(photo, albumId);

    useEffect(() => {
        if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (success) {
			setMessage({
				success: true,
				text: 'Upload successful!',
			});
			setPhoto(null);
		} else {
			setMessage(null);
		}
    }, [error, success])

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
                    uploadProgress !== null && (
                        <div style={{ margin: "1em auto", width: "2em", height: "2em" }}>
                            <CircularProgressbar 
                                value={uploadProgress} 
                                strokeWidth={50} 
                                styles={buildStyles({
                                    strokeLinecap: "butt",
                                    pathColor: "#f57423",
                                    trailColor: "transparent"
                                    })} />
                        </div>
                    )
                }

                {
                    message && (
                        <div className="info-message">
                            <p>{message.text}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default PhotoUpload
