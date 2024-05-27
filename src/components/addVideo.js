import { url } from '../methods/urls';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../services/firebase';
import { useState } from 'react';

const AddVideo = ({
    token
}) => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [progress, setProgress] = useState(null);

    const [uploadState, setUploadState] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const handleSubmit = async (e) => {
        setUploadSuccess(null);
        setUploadError(null);
        e.preventDefault();

        const storage = getStorage(app);
        const storageRef = ref(storage, `videos/${videoFile.name}`);

        const uploadVideo = uploadBytesResumable(storageRef, videoFile);

        uploadVideo.on('state_changed',
            (snapshot) => {
                setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                switch (snapshot.state) {
                    case 'paused':
                        setUploadState('Paused');
                        break;
                    case 'running':
                        setUploadState('Uploading');
                        break;
                    default:
                        setUploadState('error');
                }
            }, (error) => {
                setProgress(null);
                setUploadError(error.message);
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(uploadVideo.snapshot.ref);

                    const response = await fetch(`${url}/api/videos`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: videoTitle,
                            description: videoDescription,
                            url: downloadUrl
                        })
                    });

                    const json = await response.json();
                    setProgress(null);
                    setVideoFile(null);
                    setVideoTitle(null);
                    setVideoDescription(null);

                    if (response.ok) {
                        setUploadState('Uploaded');
                        setUploadSuccess(json.message);
                    } else {
                        setUploadError(json.error);
                    }

                } catch (error) {
                    setProgress(null);
                    setUploadError(error.message)
                }
            }
        )
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) setVideoFile(file);
    }

    return (
        <form className='add_video_form' onSubmit={handleSubmit}>
            <input disabled={progress} type="file" accept="video/*" onChange={handleFileInputChange} required /><br />

            {/* Video title */}
            <input disabled={progress} className='input_field' type="text" required placeholder='Video title'
                onChange={(e) => setVideoTitle(e.target.value)} value={videoTitle} /><br />

            {/* video description */}
            <textarea disabled={progress} style={{ height: '100px' }} className='input_field' placeholder='Description'
                onChange={(e) => setVideoDescription(e.target.value)} required value={videoDescription}></textarea><br />

            <input disabled={progress} className={`custom_btn ${progress ? 'disabled' : 'primary'}`} type="submit" value={'Add video'} /> <br />

            {progress && <div>
                <div className='progress_bar'>
                    <div style={{ width: `${progress}%` }} className='progress_track'></div>
                </div>
                <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: '200', textAlign: 'left' }}>{`${uploadState}: ${progress}%`}</p>
            </div>}

            {uploadError && <div className='error'>{uploadError}</div>}
            {uploadSuccess && <div className='success'>{uploadSuccess}</div>}
        </form>
    )
}

export default AddVideo;