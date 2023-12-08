'use client'
import Image from "next/image";


const File = (props:any) => {
    const {title, image} = props
    
    return (
          <div className={`  w-4/5`}>
            <div className={` flex flex-col justify-center items-center pb-2 `}>
                <Image src={image} alt="imagem dos arquivos de upload" className="drop-shadow-xl"/>
                <span className="text-center">{title}</span>
            </div>
            
            
             
          </div>
          
      )
    } 
    
    export default File;