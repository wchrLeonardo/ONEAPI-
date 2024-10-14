import ContentChild from "./content"

const Increment = () => {
    return (
     <section className="bg-[url('/images/increment-page.jpg')] bg-cover bg-no-repeat bg-center w-full h-[70vh]">
        <h1 style={{ fontFamily: 'Nico Moji' }} className="text-center text-white text-4xl p-6">Sua recompensa</h1>
         <ContentChild/>
     </section>
    )
  }
  
  export default Increment


  