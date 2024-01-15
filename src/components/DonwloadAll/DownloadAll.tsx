'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';
import {saveAs} from 'file-saver'

const DownloadAll = (props:any) => {
  
  const {certificados} = props
 
  const router = useRouter()

 


  const downloadFiles = () => {
    
    const zip = new JSZip();
    if (certificados.length !==0){
       
        certificados.map((certificado:any)=>{
            const arrayBuffer = new Uint8Array(certificado.arquivo.data).buffer;
            const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
            zip.file(certificado.nome, blob);
        })
    }
    
    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
  }
   
  
    

  return (
        <div className='cursor-pointer bg-gradient-to-l from-purple-600 to-purple-900 text-slate-200 font-bold flex flex-col px-6 py-4 rounded-lg mt-4' onClick={downloadFiles}>
           baixar todos
        </div>
        
    )
  }
  
  export default DownloadAll;