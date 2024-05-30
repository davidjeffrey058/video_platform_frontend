import { useState } from "react";
import Title from '../components/title';
import useFetch from "../hooks/useFetch";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import PopUp from '../components/popUp';
import Icon from '../components/icon';
import HorizontalSpacer from '../components/horizontalSpacer';
import AddVideo from '../components/addVideo';
import Spinner from '../components/spinner';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user } = useAuthContext();
    const { data, isLoading, error } = useFetch(`api/videos/all`)
    const { logout } = useLogout();
    const [hiddenDialogue, setHiddenDialogue] = useState(true);
    const [hideVideoDialogue, setHideVideoDialogue] = useState(true);

    const handleNext = () => {
        if (data && currentIndex < data.videos.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="App">
            <header className="flex spc_btw">
                <Title />
                <div className='header_options'>
                    {user?.is_admin && (
                        <button className="custom_btn primary add_vid_btn" onClick={() => setHideVideoDialogue(false)}>Add Video</button>
                    )}
                    {user && (
                        <button className="custom_btn logout outline" onClick={() => setHiddenDialogue(false)}>Log Out</button>
                    )}
                </div>

                <div className="flex header_options_mobile">
                    {user?.is_admin && (
                        <Icon className='add_vid_icon' onClick={() => setHideVideoDialogue(false)} icon={'add'} title={'Add video'} />
                    )}
                    <HorizontalSpacer />
                    {user && (
                        <Icon onClick={() => setHiddenDialogue(false)} className='logout_icon' icon={'logout'} title={'Logout'} />
                    )}
                </div>
            </header>

            {isLoading && (
                <div className='center' style={{ height: '70dvh' }}>
                    <Spinner />
                </div>
            )}

            {data && data.videos.length > 0 && (
                <div>
                    <h2 className='user_name'>{`Hi, ${user.fullname} ${user.is_admin ? "(admin)" : ''}`}</h2>
                    <p className='user_email'>{user.email}</p>
                    <div className="vid flex spc_btw">
                        <video src={data.videos[currentIndex].url} className="video_player" controls></video>

                        <div className="info_cont">
                            <div className="vid_info">
                                <div className="title_share flex spc_btw">
                                    <h3>{data.videos[currentIndex].title}</h3>
                                    <button disabled className="custom_btn disabled">Share</button>
                                </div>

                                <div className="desc_cont">
                                    <p>Description</p>
                                    <p>{data.videos[currentIndex].description}</p>
                                </div>
                            </div><br />
                            <div className="flex spc_btw">
                                <button className={`custom_btn ${currentIndex === 0 ? "disabled" : "primary"}`} onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
                                <button className={`custom_btn ${currentIndex === data.videos.length - 1 ? "disabled" : "primary"}`} onClick={handleNext} disabled={currentIndex === data.videos.length - 1}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {data && data.videos.length === 0 && (
                <div className='center'>No video posted yet</div>
            )}

            {error && !data && (
                <div className='center'><p>{error}</p></div>
            )}

            <PopUp
                title={'Confirm Logout'}
                message={'Are you sure you want to logout?'}
                action={<div>
                    <button className='custom_btn outline' onClick={() => setHiddenDialogue(true)}>Cancel</button>
                    <span style={{ width: '20px', display: 'inline-block' }}></span>
                    <button className='custom_btn primary' onClick={handleLogout}>Confirm</button>
                </div>}
                hidden={hiddenDialogue}
                backgroundClose={() => setHiddenDialogue(true)}
            />

            {user && user.is_admin && (
                <PopUp
                    backgroundClose={() => setHideVideoDialogue(true)}
                    hidden={hideVideoDialogue}
                    title={'Add a video'}
                    action={<AddVideo token={user.token} />}
                />
            )}
        </div>
    );
}

export default Home;
