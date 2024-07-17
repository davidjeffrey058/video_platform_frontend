import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import Title from '../components/title';
import Icon from '../components/icon';
import HorizontalSpacer from '../components/horizontalSpacer';
import Spinner from '../components/spinner';
import PopUp from '../components/popUp';
import { useLogout } from '../hooks/useLogout';
import { setTitle } from '../methods/title';
import { Link } from 'react-router-dom';
import AddVideo from '../components/addVideo';

const VideoPage = () => {
    const { logout } = useLogout();
    const [hiddenDialogue, setHiddenDialogue] = useState(true);
    const [hideVideoDialogue, setHideVideoDialogue] = useState(true);
    const { user } = useAuthContext()
    const { data, isLoading, error } = useFetch(`api/videos/${useParams().vid}`);

    data && setTitle(data.video.title)

    return (
        <div className='App'>
            <header className="flex spc_btw">
                <Title />
                <div className='header_options'>
                    {user?.is_admin && (
                        <button className="custom_btn primary add_vid_btn" onClick={() => setHideVideoDialogue(false)}>Upload Video</button>
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

            {data && <div>
                <div className='flex spc_btw'>
                    <div>
                        <h2 className='user_name'>{`Hi, ${user.fullname} ${user.is_admin ? "(admin)" : ''}`}</h2>
                        <p className='user_email'>{user.email}</p>
                    </div>
                    <Link to={'/home'}>
                        <button className='custom_btn primary'>Home</button>
                    </Link>
                </div>

                <div className="vid flex spc_btw">
                    <video autoPlay src={data.video.url} className="video_player" controls></video>

                    <div className="info_cont">
                        <div className="vid_info">
                            <div className="title_share flex spc_btw">
                                <h3>{data.video.title}</h3>
                                {/* <button
                                        onClick={() => setHideShareDialogue(false)}
                                        className="custom_btn share_btn">Share</button>  */}
                            </div>

                            <div className="desc_cont">
                                <p>Description</p>
                                <p>{data.video.description}</p>
                            </div>
                        </div><br />
                        {/* <div className="flex spc_btw">
                                <button className={`custom_btn ${currentIndex === 0 ? "disabled" : "primary"}`} onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
                                <button className={`custom_btn ${currentIndex === data.videos.length - 1 ? "disabled" : "primary"}`} onClick={handleNext} disabled={currentIndex === data.videos.length - 1}>Next</button>
                            </div> */}
                    </div>
                </div>
            </div>}

            {isLoading && (
                <div className='center' style={{ height: '70dvh' }}>
                    <Spinner />
                </div>
            )}

            {error && !data && (
                <div className='center'><p>{error}</p></div>
            )}

            {/* Logout alert dialogue boxx */}
            <PopUp
                title={'Confirm Logout'}
                message={'Are you sure you want to logout?'}
                action={<div>
                    <button className='custom_btn outline' onClick={() => setHiddenDialogue(true)}>Cancel</button>
                    <span style={{ width: '20px', display: 'inline-block' }}></span>
                    <button className='custom_btn primary' onClick={() => logout()}>Confirm</button>
                </div>}
                hidden={hiddenDialogue}
                backgroundClose={() => setHiddenDialogue(true)}
            />

            {user && user.is_admin && (
                <PopUp
                    backgroundClose={() => setHideVideoDialogue(true)}
                    hidden={hideVideoDialogue}
                    title={'Upload a video'}
                    action={<AddVideo token={user.token} />}
                />
            )}
        </div>
    )
}

export default VideoPage