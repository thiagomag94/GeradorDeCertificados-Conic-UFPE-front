import FileUploader from "@/components/FileUploader/FileUploader";
import FilesGroup from "@/components/FilesGroup/FileGroup";


export default function Home() {
  return (
    <main className="flex  flex-col justify-evenly items-center  pt-8 px-4 md:px-16  ">
      <div className="flex flex-col justify-center items-center mt-32   ">
        <div className="flex flex-col w-full pl-2 ">
          <span className="mb-16 xl:mb-0 bg-blue-900 font-bold text-center  text-transparent bg-clip-text text-2xl lg:text-4xl ">Gerador de Certificados do Conic</span>
          <span className={`text-center mt-2 xl:text-start`}>Faça o upload do template em <b>.doc ou .docx</b> e de um arquivo <b>.txt</b> contendo todos os nomes que receberão certificado</span>
        </div>
        <FileUploader/>
      </div>
      
    </main>
  )

}
