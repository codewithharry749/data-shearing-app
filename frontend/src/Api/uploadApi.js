import axios from 'axios';


const API_URL = 'http://localhost:8000'

export const uploadFileApi = async (data) => {

    const uploadData = await axios.post(`${API_URL}/upload`, data, {
        onUploadProgress: (data) => {
            const progress = Math.round((data.loaded / data.total) * 100);
            console.log(progress)
        }
    });
    return uploadData.data

}


