'use client'
import Image from "next/image";
import File from "../Files/File";

const FilesGroup = (props:any) => {
    const {titleTxt, titleDoc,titleExcel, docImage, txtImage,excelImage, alerta} = props
    
    return (
          <div className={` ${alerta==='escolhido' ? '' : 'hidden'} border-2 border-cyan-600/10 flex  justify-center items-center w-full bg-blue-600/60 text-slate-50 rounded-lg p-4 mt-4`}>
            {titleTxt && <File title={titleTxt} image={txtImage} />}
            {titleDoc && <File title={titleDoc} image={docImage} />}
            {titleExcel && <File title={titleExcel} image={excelImage} />}
             
          </div>
          
      )
    } 
    
    export default FilesGroup;