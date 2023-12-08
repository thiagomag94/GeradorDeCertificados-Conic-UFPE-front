'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import doc from 'public/doc.png'
import txt from  'public/txt.png'
import FilesGroup from '../FilesGroup/FileGroup';
import ProgressBar from '../ProgressBar/ProgressBar';
import spinner from 'public/spinner.png'
import Image from 'next/image';
import Link from 'next/link';
import File from '../Files/File';
import docx from 'public/doc.png'

const FileUploader = () => {
  
  
  const [files, setFiles] = useState<any>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [titleTxt, setTitleTxt] = useState<string>('')
  const [titleDoc, setTitleDoc] = useState<string>('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [progress, setProgress] = useState<number>(0)
  const [certificados, setCertificados] = useState<any>()
  const [certificadosBaixados, setCertificadosBaixados] = useState<any>([])
  const [isDownloaded, setDownloaded] = useState<boolean>(false)
  

 
  
  function handleFileChange(e:any) {
   
    if(files.length<2){
      const selectedFiles = Array.from(e.target.files)
      selectedFiles.map((file:any)=>  setFileNames((prevNames:string[])=>[...prevNames, file.name]))
      setFiles((prevFiles:File[])=> [...prevFiles, ...selectedFiles])
      
    }else{
      const selectedFiles = Array.from(e.target.files)
      setFiles([...selectedFiles])


    }
      
  }
  
  useEffect(()=>{
    setFileNames([])

  }, [message])
 
  useEffect(()=>{
    console.log('mudou o alert', alert)

  }, [alert])
  useEffect(()=>{
    console.log('mudou o alert', alert)

  }, [certificados])

  
  useEffect(()=>{
    console.log('array de nomes', fileNames)
    console.log('arquivos', files)
    if(fileNames.length===2){
      setAlert('escolhido')
    }

    
    const nomeTXT = fileNames.filter((nome)=> nome.endsWith(".txt"))
    setTitleTxt(nomeTXT[0])
    const nomeDOC = fileNames.filter((nome)=> nome.endsWith(".doc"))
    setTitleDoc(nomeDOC[0])
    const nomeDOCX = fileNames.filter((nome)=> nome.endsWith(".docx"))
    setTitleDoc(nomeDOCX[0])
  }, [fileNames])

  const handleFormData = async ()=>{
    return new Promise((resolve, reject)=>{
      const formData = new FormData()
      if (files.length>0){

        files.map((file:File)=> {
          formData.append("files", file)
        })
        resolve(formData)
      }
    })
  }

  
  
  const handleUpload = async () => {
      
      
          await handleFormData().then((res)=>{
            axios.post('https://gerador-de-certificados-conic-ufpe.vercel.app/upload', res, {
              headers: {
              'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (progressEvent)=>{
                if(progressEvent && progressEvent.total){
                  console.log(progressEvent.loaded)
                  console.log(progressEvent.total)
                  const percentCompleted = Math.round((progressEvent.loaded*100)/ (progressEvent.total))
                
                  setTimeout(()=>setProgress(percentCompleted),3000)
                }
              }
            })
            .then((res)=>{
          
              console.log(res.data.message, ' OK!')
              console.log(res.data.certificado)
              setCertificados(res.data.certificado)
              return res.data.message
            })
            .then((res)=>{
                setMessage(res)
                if(res==="Arquivos enviados...aguarde os certificados"){
                  
                  setFiles([])
                  setAlert('upload')
                }  
              })
              
        }).catch(error => {
          // Captura e trata o erro da solicitação
          if (error.response) {
            // O servidor retornou um código de status diferente de 2xx
            console.log('Erro de resposta do servidor:', error.response.data);
          } else if (error.request) {
            // A solicitação foi feita, mas não houve resposta do servidor
            console.log('Sem resposta do servidor:', error.request);
          } else {
            // Ocorreu um erro durante a configuração da solicitação
            console.log('Erro ao configurar a solicitação:', error.message);
          }
          console.log('Erro na solicitação:', error.config);
        });  
      }
      
      function handleDownload( fileBuffer:any, fileName:string) {
        const arrayBuffer = new Uint8Array(fileBuffer.data).buffer;
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
      
        link.click();
      
        // Limpa o objeto URL após o download
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        setCertificadosBaixados([...certificadosBaixados, certificados.filter((certificado:any)=> certificado.nome == fileName)])
        setCertificados(certificados.filter((certificado:any)=> certificado.nome !== fileName))
      }
    

  return (
        <div className='flex flex-col justify-between items-center w-full overflow-x-hidden'>
           <FilesGroup titleDoc={titleDoc} titleTxt={titleTxt} docImage={doc} txtImage={txt} alerta={alert}/>
           <label htmlFor="file" className='w-full py-8 rounded-lg border-2 bg-gradient-to-r  from-indigo-400 text-slate-50 font-bold to-cyan-400 border-cyan-400 bg-slate-300 text-xl text-center mt-8'>Escolha os arquivos</label>
            <input id="file" type="file" accept='.txt, .doc, .docx' className='hidden appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e)=>handleFileChange(e)} multiple name="input" onClick={()=>{
               if(fileNames.length>1){
               setFiles([])
               setFileNames([])
               }
               setMessage('')
               setAlert('')
               setProgress(0)
            }}/>
           
           
           <button type="button" onClick={()=>handleUpload()} 
            className={`${files.length===2 ? 'block' : 'hidden'} cursor-pointer mt-4 mb-4 px-8 py-4 rounded-lg shadow-xl bg-slate-50`}>
              Upload
           </button>
           <ProgressBar message={message} value={progress} alert={alert}/>
           <span className='text-lg lg:text-3xl xl:text-xl  mt-4 absolute bottom-16 p-8  w-full text-center animate-pulse'>{ progress===100 ? <span className='px-4 py-2 rounded-lg bg-purple-800 text-center text-slate-50 w-full'>{message}</span> : ''}</span>
           <div className={`${progress===100 ? '' : 'hidden'} absolute bottom-8 xl:bottom-32`}>
            <Image alt="spinner" className='animate-spin w-24 ' src={spinner}/>
           </div>
            {  certificados  && <div className='min-h-screen w-full bg-neutral-900/40 backdrop-blur-lg gap-4 fixed top-0 left-0 right-0 flex justify-center items-center'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-32  w-3/6  px-16 py-6 rounded-xl  content-normal h-[24rem] overflow-y-scroll'>
                    
                    {certificados.map((certificado:any, index:number)=> 
                        certificado.arquivo && <div className={`flex flex-col hover:bg-gradient-to-t hover:from-slate-400/20 hover:to-slate-50/40 text-slate-50 rounded-lg justify-center items-center cursor-pointer h-4/6 ${isDownloaded ? 'hidden' : ''}`} key={index} onClick={()=>handleDownload(certificado.arquivo, certificado.nome)}>
                          
                          <File title={certificado.nome} image={docx}/>
                        </div>)}
                   
                  </div>
                  <div className='flex flex-col gap-4 justify-center w-1/5 p-8 items-start bg-gradient-to-b from-slate-200 to-purple-400 text-purple-900 rounded-lg'>
                    <span className='font-bold'>Total de arquivos: <span className="text-neutral-900">{certificados.length}</span></span>
                    <span className='font-bold'>Arquivos baixados: <span className="text-neutral-900">{certificadosBaixados?.length}</span></span>
                    <span className='font-bold'>Arquivos restantes: <span className="text-neutral-900">{certificados.length}</span> </span>
                  </div>
              </div> 
            }
        </div>
        
    )
  } 
  
  export default FileUploader;