import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import { uploadFileApi } from './Api/uploadApi';
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";

const get_post_url = 'http://localhost:8000'
const API_URL = 'http://localhost:8000'


function App() {

  const [file, setFile] = useState('')
  const [getImages, setImg] = useState([])
  const [progress, setProgress] = useState(null)
  const [showProgress, setShow] = useState(false)


  const inputRef = useRef();

  const uploadFilesBTN = async () => {
    inputRef.current.click();

  }

  const submitImg = async () => {
    setShow(true)
    let data = new FormData();
    data.append('file', file);

    const uploadData = await axios.post(`${API_URL}/upload`, data, {
      onUploadProgress: (data) => {
        setProgress(Math.round((data.loaded / data.total) * 100))

      }
    })

    console.log(uploadData.data)
    setProgress(null)
    setTimeout(() => {
      setShow(false)
    }, 2000)
    getImagesFromBackend()

    // const response = await uploadFileApi(data)
    // if (response.success === true) {
    //   alert('file uploaded successfully')
    //   getImagesFromBackend()
    // }
    // console.log(response)

  }

  // =========== get Images ==============

  const getImagesFromBackend = async () => {

    const res = await axios({
      method: "GET",
      url: `${get_post_url}/getImagesData`
    });

    // console.log(res.data.data[0].link)
    setImg(res.data.data);
  }

  useEffect(() => {
    (async () => await getImagesFromBackend())()
  }, [setFile, progress, setProgress])
  return (
    <div className='App'>

      <h1>file shearing app</h1>

      <button onClick={() => uploadFilesBTN()} className='UploadBtn' >Upload</button>
      <div>
      </div>
      <input
        type='file'
        ref={inputRef}
        onChange={(e) => setFile(e.target.files[0])}
        name='file'

        style={{ display: 'none' }}
      />

      {
        showProgress &&
        <div style={{ width: '80%' }}>
          <ProgressBar completed={progress} />;
        </div>

      }

      <button className='btn btn-success mt-3' style={{ width: '150px', height: '40px' }} onClick={() => submitImg()}>Submit Image</button>


      <div className='d-flex flex-row justify-content-center align-item-center flex-wrap' style={{ width: '100%', height: '70vh', padding: '1rem', marginTop: '1rem', overflowY: 'scroll' }}>
        {
          getImages.map((item, ind) => {
            return (
              <img src={item.link} alt='img not found' className='' style={{ width: 'auto', height: '300px', objectFit: 'cover', margin: '1rem', borderRadius: '.7rem', }} />
            )
          })
        }
      </div>

    </div>
  )
}

export default App
