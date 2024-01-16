import axios from "axios"


export const handleGetUrl = async (filename:string) => {
    const res = await axios.get(`https://gerador-de-certificados-conic-ufpe.vercel.app/getDownloadURL/${filename}`)
    return res
    
    
    
}