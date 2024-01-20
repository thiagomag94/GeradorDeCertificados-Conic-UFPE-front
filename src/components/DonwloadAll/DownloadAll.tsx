'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import JSZip from 'jszip';
import {saveAs} from 'file-saver'
import { arrayBuffer } from 'stream/consumers';

const DownloadAll = (props:any) => {
  
  const {certificados, arquivozip} = props
 
  const router = useRouter()

 


  const downloadFiles = () => {
    
    
    console.log(arquivozip)
    console.log(arquivozip.data)
    if (arquivozip){
      //const arrayBuffer = new Uint8Array(arquivozip.data).buffer;
      //console.log("Arraybuffer", arrayBuffer)
      const blob = new Blob([arquivozip.data], { type: 'application/zip' });
        //certificados.map((certificado:any)=>{
            //const arrayBuffer = new Uint8Array(certificado.arquivo.data).buffer;
            //const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
            //zip.file(certificado.nome, blob);
        //})
        saveAs(blob, "certificados.zip")}




    
    //zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        //saveAs(content, "example.zip");
    //});
  }
   
  
    

  return (
        <div className='cursor-pointer bg-gradient-to-l from-indigo-600 to-indigo-900 text-slate-200 font-bold flex flex-col px-4 py-4 rounded-lg ' onClick={downloadFiles}>
           baixar todos
        </div>
        
    )
  }
  
  export default DownloadAll;