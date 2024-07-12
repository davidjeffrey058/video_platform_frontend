import React from 'react'
import { useNavigate } from 'react-router'
import { setTitle } from '../methods/title';
// import Title from '../components/title';

const Page404 = () => {
  const navigate = useNavigate();
  setTitle('404 page not found')
  return (
    <div className="center">
      <div style={{ textAlign: 'center' }}>
        <h1>404 Page not found</h1>
        <p>You're trying to access a page which does not exist</p><br />
        <button
          className='custom_btn primary'
          onClick={() => {
            navigate('/home')
          }}
        >To Home</button>
      </div>
    </div>

  )
}

export default Page404