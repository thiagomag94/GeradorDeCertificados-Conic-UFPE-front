import FileUploader from "@/components/FileUploader/FileUploader";
import FilesGroup from "@/components/FilesGroup/FileGroup";


export default function Home() {
  return (
    <main className="flex min-h-screen lg:flex-row flex-col items-center lg:justify-evenly pt-8 px-4 md:px-16 gap-16 md:gap-32 overflow-x-hidden">
      <div className="flex flex-col w-full pl-4">
        <span className="mb-16 xl:mb-0 bg-gradient-to-r  via-purple-800 from-indigo-600 to-cyan-400 font-bold text-center xl:text-left text-transparent bg-clip-text text-2xl lg:text-4xl ">Gerador de Certificados do Conic</span>
        <span className={``}>Faça o upload do template em <b>.doc ou .docx</b> e de um arquivo <b>.txt</b> contendo todos os nomes que receberão certificado</span>
      </div>
      <FileUploader/>
      
    </main>
  )

}
