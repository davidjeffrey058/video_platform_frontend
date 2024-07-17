import { url } from '../methods/urls';
import { useState } from 'react';

const AddVideo = ({
    token
}) => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const [uploadState, setUploadState] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadSuccess(null);
        setUploadError(null);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('title', videoTitle);
        formData.append('description', videoDescription);
        try {
            const response = await fetch(`${url}/api/videos/upload`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setUploadSuccess(data.message);
            } else {
                setUploadError(data.error);
            }
        } catch (error) {
            setUploadError(error.message)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) setVideoFile(file);
    }

    return (
        <form className='add_video_form' onSubmit={handleSubmit}>
            <input disabled={isLoading} type="file" accept="video/*" onChange={handleFileInputChange} required /><br />

            {/* Video title */}
            <input disabled={isLoading} className='input_field' type="text" required placeholder='Video title'
                onChange={(e) => setVideoTitle(e.target.value)} value={videoTitle} /><br />

            {/* video description */}
            <textarea disabled={isLoading} style={{ height: '100px' }} className='input_field' placeholder='Description'
                onChange={(e) => setVideoDescription(e.target.value)} required value={videoDescription}></textarea><br />

            <input disabled={isLoading} className={`custom_btn ${isLoading ? 'disabled' : 'primary'}`} type="submit" value={'Upload video'} /> <br />

            {/* {progress && <div>
                <div className='progress_bar'>
                    <div style={{ width: `${progress}%` }} className='progress_track'></div>
                </div>
                <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: '200', textAlign: 'left' }}>{`${uploadState}: ${progress}%`}</p>
            </div>} */}
            {isLoading && <p style={{ fontSize: '12px' }}>Uploading video...</p>}
            {uploadError && <div className='error'>{uploadError}</div>}
            {uploadSuccess && <div className='success'>{uploadSuccess}</div>}
        </form>
    )
}

export default AddVideo;