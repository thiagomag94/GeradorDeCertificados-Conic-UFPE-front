'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import {storage} from '../../../firebase'
import JSZip from 'jszip';
import {saveAs} from 'file-saver'
import axios from 'axios';
import { handleGetUrl } from '@/service/getURL';


const DownloadAllFirebase =  () => {
  const [fileLink, setfileLink] = useState('')

 
  const router = useRouter()

  const handleDownload = async() =>{
    
    
     const res = await handleGetUrl('certificados-zip')
     console.log(res.data.downloadURL)
      const downloadURL = res?.data.downloadURL;

      // Cria um elemento de link para download
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadURL;

      // Define o atributo 'download' para indicar que é um link de download
      downloadLink.download = 'certificados-zip.zip';

      // Adiciona o link ao DOM (não é necessário adicionar ao corpo da página)
      document.body.appendChild(downloadLink);
      
       // Simula um clique no link para iniciar o download
      downloadLink.click();

      // Remove o link do DOM após o download
      document.body.removeChild(downloadLink);
      

   
  }

 


  return (
        <div className='cursor-pointer bg-gradient-to-l from-purple-600 to-purple-900 text-slate-200 font-bold flex flex-col px-6 py-4 rounded-lg mt-4' onClick={handleDownload}>
           baixar Firebase
        </div>
        
    )
  }
  
  export default DownloadAllFirebase