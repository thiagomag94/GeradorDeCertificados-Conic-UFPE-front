import axios from "axios"


export const handleGetUrl = async (filename:string) => {
    const res = await axios.get(`http://18.228.232.180:3001/getDownloadURL/${filename}`)
    return res
    
    
    
}