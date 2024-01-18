import axios from "axios"


export const handleGetUrl = async (filename:string) => {
    const res = await axios.get(`http://localhost:3001/getDownloadURL/${filename}`)
    return res
    
    
    
}