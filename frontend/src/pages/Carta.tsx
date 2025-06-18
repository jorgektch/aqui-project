import CartaImage from '../assets/carta.png'

function Carta() {
  return (
     <>
      <div className="container mx-auto px-4 mt-8">
        <div className='relative'>
          <h2 className='text-2xl font-bold text-center'>Tablón</h2>
        </div>
        <img src={CartaImage} alt="Carta" className="relative object-cover mx-auto w-full" />
      </div>
    </>
  )
}

export default Carta