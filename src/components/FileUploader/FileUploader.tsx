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
import excel from 'public/excel.png'
import DownloadAll from '../DonwloadAll/DownloadAll';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import { CircularProgress, LinearProgress } from '@mui/material';
import InputForm from '../InputForm/inputForm';
import LinearDeterminate from '../LinearDeterminate/LinearDeterminate';



const FileUploader = () => {
  
  
  const [files, setFiles] = useState<any>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [titleTxt, setTitleTxt] = useState<string>('')
  const [titleDoc, setTitleDoc] = useState<string>('')
  const [titleExcel, setTitleExcel] = useState<string>('')
  const [excelArray, setExcelArray] = useState<string[]>([]);

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
    const nomeEXCEL = fileNames.filter((nome)=> nome.endsWith(".xlsx"))
    setTitleExcel(nomeEXCEL[0])

    if(nomeDOCX[0] && nomeTXT[0]){
      setAlert('txt escolhido')
    }
  }, [fileNames, files])

  const handleFormData = async ()=>{
    return new Promise((resolve, reject)=>{
      const formData = new FormData()
      if (files.length>0){
        
        files.map((file:File)=> {
          formData.append("files", file)
          console.log(formData)
        
        })

        formData.append("excelProps", JSON.stringify(excelArray))
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
           const URL2 = 'http://localhost:3001'
           
           
           try{
            const formdata = await handleFormData()
            const payload = {
              files:formdata,
              excelProps: excelArray
            }
            const res1= await axios.post(`${URL2}/upload`, formdata,  {
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

              const res2 = await axios.post(`${URL2}/getFilenames`, formdata,  { 
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

            if(res1.status===400){
              setFiles([])
              setFileNames([])
              setMessage('')
              setProgress(0)
              setAlert('Envie um arquivo .txt ou .xlsx contendo os nomes e um arquivo .docx. para template')
              setStatus(res1.status)
              console.log(res1.status)
            }

            

            

           }catch(error:any){
            if (error.response) {
              // O servidor retornou um código de status diferente de 2xx
              console.log('Erro de resposta do servidor:', error.response.data);
              if(error.response.status===500){
                setStatus(error.response.status)
                console.log(error.response.status)
                setAlert('Deu algum erro no servidor')
              }
              if(error.response.status===400){
                setStatus(error.response.status)
                console.log(error.response.status)
                setAlert('Envie um arquivo .txt ou .xlsx contendo os nomes e um arquivo .docx. para template')
              }
              console.log(error.message)
             
              setFiles([])
              setFileNames([])
              setMessage('')
              setProgress(0)
              
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
           <FilesGroup titleDoc={titleDoc} titleTxt={titleTxt} titleExcel={titleExcel} docImage={doc} txtImage={txt} excelImage={excel}  alerta={alert}/>
           
           { fileNames.length<2 && message!=='Enviando arquivos...' &&<span className={`text-lg text-slate-900 text-center font-light mt-4`}>{message}</span>}
           { alert!=='escolhido' && alert!=='upload' && alert!=='submitted' && alert!=='txt escolhido' && <span className={`text-lg text-red-500 text-center font-light bottom-32 mt-4`}>{alert}</span>}
           {titleExcel && <div className='flex justify-center items-center w-full'>
              <InputForm setAlert={setAlert} setExcelArray={setExcelArray} excelArray={excelArray}/>
           </div>}
           <label htmlFor="file" className='w-full py-4 rounded-lg  bg-[#58a4b0]  text-slate-50 font-bold   text-xl text-center mt-12 drop-shadow-xl'>Escolha os arquivos</label>
           <input id="file" type="file" accept='.txt, .doc, .docx' className='hidden appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e)=>handleFileChange(e)} multiple name="input" onClick={()=>{
               if(fileNames.length>2){
               setFiles([])
               setFileNames([])
               setProgress(0)

               } 
               setMessage('')
              
               setProgress(0)
           }}/>

          
           
           
           {fileNames.length===2 &&  (alert==='submitted' || alert==='txt escolhido') && <button type="button" onClick={()=>handleUpload()} className={` w-full bg-blue-900 cursor-pointer mt-4 mb-4 px-8 py-4 rounded-lg drop-shadow-lg text-slate-50 `}>Upload</button>}
          
           { alert==='upload' && <ProgressBar value={progress} message={message}/>}
           { alert==='upload' && <div className='absolute top-0 w-full '><LinearDeterminate/></div>}
           
           {progress===100 && message!=="Arquivos enviados...aguarde os certificados" && <CircularProgress className='w-40 mt-8 mb-8'/>}
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
              {progress>0 && status===200  && message==="Certificados recebidos" && <div className='absolute text-slate-50 gap-4 right-4 top-24 w-3/6 rounded-xl flex flex-col justify-start gap-2 z-10 items-start px-16 pt-16 pb-8 drop-shadow-xl bg-gradient-to-t animate-fade from-blue-800 to-blue-600 backdrop-blur-md'>
                    <span className={`text-xl pacifico-regular  font-bold`}>{`Prontinho...seus certificados foram gerados com sucesso!`}</span>
                    <div id='buttons ' className='flex flex-row justify-start items-start w-full gap-4'>
                      { message==='Certificados recebidos' && <DownloadAll  arquivozip={arquivozip} />}
                      <button className='cursor-pointer bg-slate-200 text-blue-900  font-bold flex tracking-wider px-4 py-4 rounded-lg' onClick={()=>handleOpen()}>Gerar novamente</button>
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