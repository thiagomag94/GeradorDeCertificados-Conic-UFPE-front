import axios from "axios"


export const handleGetUrl = async (filename:string) => {
    const res = await axios.get(`http://177.71.142.138:3001/getDownloadURL/${filename}`)
    return res
    
    
    
}