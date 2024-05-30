import React from 'react'
import Title from '../components/title';
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import PopUp from '../components/popUp';
import Icon from '../components/icon';
import HorizontalSpacer from '../components/horizontalSpacer';
import AddVideo from '../components/addVideo';
import Spinner from '../components/spinner';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading, error } = useFetch(`api/videos?current=${currentPage}`);
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [hiddenDialogue, setHiddenDialogue] = useState(true);
    const [hideVideoDialogue, setHideVideoDialogue] = useState(true);

    const handleNext = () => {
        if (currentPage !== data.doc_count - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrev = () => {
        if (currentPage !== 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleLogout = () => {
        logout();
    }



    return (

        <div className="App">
            <div>
                <header className="flex spc_btw">
                    <Title />
                    <div className='header_options'>
                        {user.is_admin && <button className="custom_btn primary add_vid_btn" onClick={() => setHideVideoDialogue(false)}>Add Video</button>}
                        <button className="custom_btn logout outline" onClick={() => setHiddenDialogue(false)}>Log Out</button>
                    </div>

                    <div className="flex header_options_mobile">
                        {user.is_admin && <Icon className='add_vid_icon' onClick={() => setHideVideoDialogue(false)} icon={'add'} title={'Add video'} />}
                        <HorizontalSpacer />
                        <Icon onClick={() => setHiddenDialogue(false)} className='logout_icon' icon={'logout'} title={'Logout'} />
                    </div>
                </header>

                {/* When the data is loading */}
                {isLoading && <div className='center' style={{ height: '70dvh' }}>
                    <Spinner />
                </div>}

                {/* When there is data */}
                {data && data.doc_count > 0 && <div>
                    <h2 className='user_name'>{user && `Hi, ${user.fullname} ${user.is_admin ? "(admin)" : ''}`}</h2>
                    <p className='user_email'>{user.email}</p>
                    <div className="vid flex spc_btw">
                        <video src={data.result.url} className="video_player" controls></video>

                        <div className="info_cont">
                            <div className="vid_info">
                                {/* Video title and share button */}
                                <div className="title_share flex spc_btw">
                                    <h3>{data.result.title}</h3>
                                    <button disabled className="custom_btn disabled">Share</button>
                                </div>

                                {/* Description Section */}
                                <div className="desc_cont">
                                    <p>Description</p>
                                    <p>{data.result.description}</p>
                                </div>

                            </div><br />
                            {/* Next and previous button */}
                            <div className="flex spc_btw">
                                <button className={`custom_btn ${currentPage === 0 ? "disabled" : "primary"}`} onClick={handlePrev}>Prev</button>
                                <button className={`custom_btn ${currentPage === data.doc_count - 1 ? "disabled" : "primary"}`} onClick={handleNext}>Next</button>
                            </div>
                        </div>


                    </div>

                </div>}

                {data && data.doc_count === 0 && <div className='center'>No video posted yet</div>}

                {/* When there is an error */}
                {error && !data && <div className='center'><p>{error}</p></div>}
            </div>

            {/* Login popup */}
            <PopUp
                title={'Confim Logout'}
                message={'Are you sure you want to logout?'}
                action={<div>
                    <button className='custom_btn outline' onClick={() => setHiddenDialogue(true)}>Cancel</button>
                    <span style={{ width: '20px', display: 'inline-block' }}></span>
                    <button className='custom_btn primary' onClick={handleLogout}>Confirm</button>
                </div>}
                hidden={hiddenDialogue}
                backgroundClose={() => setHiddenDialogue(true)}
            />


            {/* Add video popup */}
            {user.is_admin && <PopUp
                backgroundClose={() => setHideVideoDialogue(true)}
                hidden={hideVideoDialogue}
                title={'Add a video'}
                action={<AddVideo token={user.token} />}
            />}
        </div>
    );
}

export default Home;