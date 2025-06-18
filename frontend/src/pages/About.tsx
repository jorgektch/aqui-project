import aboutBG from '../assets/bg-about.png'
const anuncios = [
  { id: 1, title: 'Nuevo menú semanal disponible', content: 'Descubre nuestras nuevas opciones de menús para esta semana, con platos frescos y deliciosos.' },
  { id: 2, title: 'Promoción de almuerzos', content: 'Ordena tu almuerzo hoy y obtén un 10% de descuento en tu primera compra.' },
  { id: 3, title: 'Entrega gratuita', content: 'Disfruta de entrega gratuita en pedidos superiores a $50.' },
  { id: 4, title: 'Recetas saludables', content: 'Visita nuestro blog para encontrar recetas saludables y consejos de nutrición.' },
]

function About() {
  return (
    <>
      <div className="relative w-full min-h-[580px] pb-12 flex">
        <img src={aboutBG} alt="Home Background" className="absolute inset-0 w-full h-full object-cover opacity-50 -z-1" />
        <div className='px-4 mt-auto'>
          <p className="text-lg text-justify text-black relative z-10 mt-4">
            AQUI Menú es una empresa dedicada a la entrega de menús preparados, ofreciendo opciones frescas, balanceadas y accesibles directamente en la puerta de nuestros clientes. Nuestra misión es simplificar la rutina alimentaria, garantizando calidad, puntualidad y una experiencia gastronómica conveniente para estudiantes y demás consumidores. 
          </p>
          <a href="/carta" className="text-lg bg-neutral-800 flex items-center justify-center py-2 text-white mt-4 w-full">
            Empezar
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <div className='relative'>
          <h2 className='text-2xl font-bold text-center'>Tablón</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anuncios.map((anuncio) => (
                <div key={anuncio.id} className="flex flex-col items-start space-x-4 shadow-md py-8 px-6 rounded-xl border border-gray-400">
                  <div>
                    <h4 className="text-xl font-bold text-start mb-2">{anuncio.title}</h4>
                    <p>{anuncio.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          
      </div>
    </div>
    </>
  )
}

export default About