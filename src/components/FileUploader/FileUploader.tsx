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
import CloseIcon from '@mui/icons-material/Close';

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
  const [arquivozip, setArquivozip] = useState<any>()
  const [certificadosBaixados, setCertificadosBaixados] = useState<any>([])
  const [isDownloaded, setDownloaded] = useState<boolean>(false)
  const [status, setStatus] = useState<number>()
  const [isOpen, setOpen] = useState<boolean>(true)
  const router = useRouter()

 
  
  function handleFileChange(e:any) {
    setMessage("Escolha o próximo arquivo")
    if(files.length<2){
      const selectedFiles = Array.from(e.target.files)
      selectedFiles.map((file:any)=>  setFileNames((prevNames:string[])=>[...prevNames, file.name]))
      setFiles((prevFiles:File[])=> [...prevFiles, ...selectedFiles])
      
      console.log("file length", files.length)
      console.log("files", files)
    }else if (files.length ===2){
      const selectedFiles = Array.from(e.target.files)
      setFiles([...selectedFiles])
      selectedFiles.map((file:any)=>  setFileNames([file.name]))
      
    } 
  }
  
  useEffect(()=>{
   if (message!== 'Escolha o próximo arquivo' && message!==''){
    setFileNames([])
   }
    
  }, [message])
 
 


  
  useEffect(()=>{
    console.log(files)
    console.log(fileNames)
    if(fileNames.length===1 || fileNames.length=== 2){
      setAlert('escolhido')
    } else if (fileNames.length>2){
      setAlert('Escolha somente dois arquivos')
    }

    
    const nomeTXT = fileNames.filter((nome)=> nome.endsWith(".txt"))
    setTitleTxt(nomeTXT[0])
    const nomeDOC = fileNames.filter((nome)=> nome.endsWith(".doc"))
    setTitleDoc(nomeDOC[0])
    const nomeDOCX = fileNames.filter((nome)=> nome.endsWith(".docx"))
    setTitleDoc(nomeDOCX[0])
  }, [fileNames, files])

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

 
    
  const handleOpen = ()=>{
    setOpen(!isOpen)
    setFiles([])
    setFileNames([])
    setProgress(0)
    setMessage('')
    setAlert('')
  }
  

  const handleUpload = async () => {
           setAlert('upload')
           setMessage('Enviando arquivos...')
           const URL = 'http://54.232.159.147:3001'
           
           try{
            const formdata = await handleFormData()
            const res1= await axios.post(`${URL}/upload`, formdata,  {
              responseType:'blob',
              headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
              },
              onUploadProgress: (progressEvent)=>{
                if(progressEvent && progressEvent.total){
                  console.log(progressEvent.loaded)
                  console.log(progressEvent.total)
                  setProgress( Math.round((progressEvent.loaded*100)/ (progressEvent.total)))
                }
              }
            })

            
            if(res1.status===200){
              setMessage("Arquivos enviados...aguarde os certificados")
              setArquivozip(res1)
              setFiles([])
              setAlert('upload')
              setStatus(200)

              const res2 = await axios.post(`${URL}/getFilenames`, formdata,  { 
                headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
                }})
              
              if(res2.status===200){
                setMessage('Certificados recebidos')
                  setCertificados(res2.data.certificado)
                  setStatus(200)
                  setOpen(true)
              }
            }

            

           }catch(error:any){
            if (error.response) {
              // O servidor retornou um código de status diferente de 2xx
              console.log('Erro de resposta do servidor:', error.response.data);
              console.log(error.message)
              setFiles([])
              setFileNames([])
              setMessage('')
              setProgress(0)
              setAlert('Envie um arquivo .txt e um arquivo .docx.')
            } else if (error.request) {
              // A solicitação foi feita, mas não houve resposta do servidor
              console.log('Sem resposta do servidor:', error.request);
            } else {
              // Ocorreu um erro durante a configuração da solicitação
              console.log('Erro ao configurar a solicitação:', error.message);
            }
            console.log('Erro na solicitação:', error.config);
          };  

          

              
          
        

            //.then((res)=>{
              //console.log(res.data.message, ' OK!')
              //console.log(res.data.certificado)
              //setMessage("Arquivos enviados...aguarde os certificados")
              //setArquivozip(res)
              //setCertificados(res.data.certificado)
              //setCertificadosInit(res.data.certificado)
              //setArquivozip(res.data.arquivozip)
              //return res
            //})
            //.then((res)=>{
                //console.log(res.status)
                //if(res.status===200){
                 
                  //console.log(message)
                  //setFiles([])
                  //setAlert('upload')
                //}  
              //})
              
       
          
      
      
      function handleDownloadOne( fileBuffer:any, fileName:string) {
        const arrayBuffer = new Uint8Array(fileBuffer.data).buffer;
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName )
      
        setCertificadosBaixados([...certificadosBaixados, certificados.filter((certificado:any)=> certificado.nome == fileName)])
        setCertificados(certificados.filter((certificado:any)=> certificado.nome !== fileName))
      }
      
      
  }
  return (
        <div className='flex flex-col justify-between items-center w-full'>
           <FilesGroup titleDoc={titleDoc} titleTxt={titleTxt} docImage={doc} txtImage={txt} alerta={alert}/>
           
           { fileNames.length<2 && message!=='Enviando arquivos...' &&<span className={`text-lg text-slate-900 text-center font-light mt-4`}>{message}</span>}
           { alert!=='escolhido' && alert!=='upload' && <span className={`text-lg text-red-500 text-center font-light bottom-32 mt-4`}>{alert}</span>}
           <label htmlFor="file" className='w-full py-4 rounded-lg  bg-[#58a4b0]  text-slate-50 font-bold   text-xl text-center mt-32 drop-shadow-xl'>Escolha os arquivos</label>
            <input id="file" type="file" accept='.txt, .doc, .docx' className='hidden appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e)=>handleFileChange(e)} multiple name="input" onClick={()=>{
               if(fileNames.length>2){
               setFiles([])
               setFileNames([])
               setProgress(0)

               } 
               setMessage('')
              
               setProgress(0)
            }}/>
           
           
           {fileNames.length===2 && <button type="button" onClick={()=>handleUpload()} className={` w-full bg-blue-900 cursor-pointer mt-4 mb-4 px-8 py-4 rounded-lg drop-shadow-lg text-slate-50 `}>Upload</button>}
          
           { alert==='upload' && <ProgressBar value={progress} message={message}/>}
           {progress===100 && <Image src={spinner} alt={"loading"} className={`${ progress>0  && message!=="Arquivos enviados...aguarde os certificados" ? 'block' : 'hidden'}  w-20 animate-spin`}/>}
           <span  className={`${ progress>0 && message!="Arquivos enviados...aguarde os certificados"? 'block' : 'hidden'} animate-pulse`}>{progress>0 ? 'Aguarde...estamos gerando seus certificados...' : message}</span>
            {  arquivozip   && isOpen===true &&
            <div id="tela-certificados" className=' min-h-screen w-full bg-neutral-900/40 backdrop-blur-2xl gap-4 fixed top-0 left-0 right-0 flex flex-row justify-center items-center'>
              {
                message==='Certificados recebidos' && <div className=' z-0 absolute h-screen overflow-y-scroll left-0 top-0 bg-blue-900/20 border-r-4 border-slate-200/20  w-3/6 shadow-xl'>
                  <div className=' relative grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10   px-16 py-6   content-normal  '>
                    {certificados?.map((certificado:any, index:number)=> 
                        certificado?.length!==0 && <div className={`border border-slate-200 flex flex-col hover:bg-gradient-to-t hover:from-slate-400/20 hover:to-slate-50/40 text-slate-50 rounded-lg justify-center items-center cursor-pointer  ${isDownloaded ? 'hidden' : ''}`} key={index} >
                          
                          <File title={certificado?.nome} image={docx}/>
                    </div>)}
                  </div> 
                
                  
                </div> 
              }
              <Image src={spinner} alt={"loading"} className={`${ progress>0 && status===200  && message==="Arquivos enviados...aguarde os certificados" ? 'absolute left-25 top-50 ' : 'hidden'}  w-60 animate-spin`}/>
              <span  className={`${ progress>0 && message==="Arquivos enviados...aguarde os certificados"? 'block ' : 'hidden'} text-slate-200 mt-40 animate-pulse`}>Aguarde...estamos gerando seus certificados...</span>         
              {progress>0 && status===200  && message==="Certificados recebidos" && <div className='absolute text-slate-50 gap-4 right-4 top-24 w-3/6 rounded-xl flex flex-col justify-start gap-2 z-10 items-start px-16 pt-16 pb-8 drop-shadow-xl bg-gradient-to-b animate-fade from-blue-800/40 to-blue-700/60 backdrop-blur-md'>
                    <span className={`text-xl pacifico-regular  font-bold`}>{`Prontinho...seus certificados foram gerados com sucesso!`}</span>
                    <div id='buttons ' className='flex flex-row justify-start items-start w-full gap-4'>
                      { message==='Certificados recebidos' && <DownloadAll  arquivozip={arquivozip} />}
                      <button className='cursor-pointer bg-slate-200 text-blue-900  font-bold flex  px-4 py-4 rounded-lg' onClick={()=>handleOpen()}>Gerar novamente</button>
                    </div>
                    <span className={`text-xl font-extralight text-center`}><b>Total:</b>{` ${certificados?.length} certificados`}</span>
                    <span className={`text-md flex  font-normal gap-4 justify-center mt-4  p-2 rounded-lg`}><p className='text-xl'>&#10140;</p><p>{` Você pode conferir todos os certificados gerados clicando na aba ao lado e rolando a bolinha do mouse`}</p></span>
              </div>}
            </div> 
            }
       </div>
        
    )
  } 
  
  export default FileUploader;