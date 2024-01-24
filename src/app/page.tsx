import FileUploader from "@/components/FileUploader/FileUploader";
import FilesGroup from "@/components/FilesGroup/FileGroup";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: 'Gerador de Certificados do CONIC'
  
}


export default function Home() {
  return (
    <main className="flex  flex-col justify-start  items-center px-8 py-24 lg:px-12 lg:py-12 md:px-16  ">
      <div className="flex flex-col justify-center items-center  lg:py-12  ">
        <div className="flex flex-col w-full pl-2 ">
          <span className="mb-16 xl:mb-0 bg-blue-900 font-bold text-center poppins-bold text-transparent bg-clip-text text-3xl lg:text-4xl ">CONIC Certificados</span>
          <span className={`text-center mt-2 xl:text-start`}>Faça o upload do template em <b>.doc ou .docx</b> e de um arquivo <b>.txt</b> contendo todos os nomes que receberão certificado</span>
        </div>
        <FileUploader/>
      </div>
      
    </main>
  )

}
