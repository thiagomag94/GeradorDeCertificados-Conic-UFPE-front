import FileUploader from "@/components/FileUploader/FileUploader";
import FilesGroup from "@/components/FilesGroup/FileGroup";


export default function Home() {
  return (
    <main className="flex min-h-screen lg:flex-row flex-col items-center lg:justify-evenly pt-8 px-4 md:px-16 overflow-x-hidden">
      <div className="flex flex-col xl:flex-row justify-center items-center   ">
        <div className="flex flex-col w-full pl-4 ">
          <span className="mb-16 xl:mb-0 bg-blue-900 font-bold text-center xl:text-left text-transparent bg-clip-text text-2xl lg:text-4xl ">Gerador de Certificados do Conic</span>
          <span className={`text-center xl:text-start`}>Faça o upload do template em <b>.doc ou .docx</b> e de um arquivo <b>.txt</b> contendo todos os nomes que receberão certificado</span>
        </div>
        <FileUploader/>
      </div>
      
    </main>
  )

}
