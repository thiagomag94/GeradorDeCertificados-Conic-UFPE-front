'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import doc from 'public/doc.png';
import txt from  'public/txt.png';
import FilesGroup from '../FilesGroup/FileGroup';
import ProgressBar from '../ProgressBar/ProgressBar';
import spinner from 'public/spinner.png';
import Image from 'next/image';
import Link from 'next/link';
import File from '../Files/File';
import docx from 'public/doc.png';
import DownloadAll from '../DonwloadAll/DownloadAll';
import { saveAs } from 'file-saver';
import DownloadAllFirebase from '../DonwloadAllFirebase/DownloadAll';
import { handleGetUrl } from '@/service/getURL';

const FileUploader = () => {
  
  
  const [files, setFiles] = useState<any>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [titleTxt, setTitleTxt] = useState<string>('')
  const [titleDoc, setTitleDoc] = useState<string>('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [progress, setProgress] = useState<number>(0)
  const [certificadosInit, setCertificadosInit] = useState<any>()
  const [certificados, setCertificados] = useState<any>()
  const [certificadosBaixados, setCertificadosBaixados] = useState<any>([])
  const [isDownloaded, setDownloaded] = useState<boolean>(false)
  const router = useRouter()

 
  
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
    if(certificadosBaixados?.length===certificados?.length){
      router.push('/')
    }

  }, [certificadosBaixados?.lenght])

  
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
      
      
          await handleFormData().then((res:any)=>{
            axios.post('https://gerador-de-certificados-conic-ufpe.vercel.app/upload', res, {
              headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
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
              setCertificadosInit(res.data.certificado)
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
      
      async function handleDownloadOne( fileName:string) {
        const res = await handleGetUrl(fileName)
        
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
      
        setCertificadosBaixados([...certificadosBaixados, certificados.filter((certificado:any)=> certificado.nome == fileName)])
        setCertificados(certificados.filter((certificado:any)=> certificado.nome !== fileName))
      }
    

  return (
        <div className='flex flex-col justify-between items-center w-full overflow-x-hidden'>
           <FilesGroup titleDoc={titleDoc} titleTxt={titleTxt} docImage={doc} txtImage={txt} alerta={alert}/>
           <label htmlFor="file" className='w-full py-8 rounded-lg border-2 bg-blue-900   text-slate-50 font-bold border-cyan-400  text-xl text-center mt-8 drop-shadow-xl'>Escolha os arquivos</label>
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
            className={`${files.length===2 ? 'block' : 'hidden'} cursor-pointer mt-4 mb-4 px-8 py-4 rounded-lg drop-shadow-lg bg-slate-50`}>
              Upload
           </button>
           
            {  certificados && certificadosInit.length !== certificadosBaixados.length && 
            <div className='min-h-screen w-full bg-neutral-900/40 backdrop-blur-2xl gap-4 fixed top-0 left-0 right-0 flex justify-center items-center'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-32  w-3/6  px-16 py-6 rounded-xl  content-normal h-[24rem] overflow-y-scroll'>
                    
                    {certificados.map((certificado:any, index:number)=> 
                        certificado.length!==0 && <div className={`flex flex-col hover:bg-gradient-to-t hover:from-slate-400/20 hover:to-slate-50/40 text-slate-50 rounded-lg justify-center items-center cursor-pointer  ${isDownloaded ? 'hidden' : ''}`} key={index} onClick={()=>handleDownloadOne(certificado.nome)}>
                          
                          <File title={certificado.nome} image={docx}/>
                        </div>)}
                   
                  </div>
                  <div className='flex flex-col justify-center items-center gap-4 w-1/5'>
                    <div className='flex flex-col gap-4 justify-center w-full  p-8 items-start bg-gradient-to-b from-slate-200 to-purple-400 text-purple-900 rounded-lg'>
                      <DownloadAllFirebase/>
                    </div>
                    
                  </div>
            </div> 
            }
        </div>
        
    )
  } 
  
  export default FileUploader;