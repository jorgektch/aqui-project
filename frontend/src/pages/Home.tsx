import homeBg from '../assets/bg-home.png'
import Ellipse14 from '../assets/Ellipse-14.png'
import Ellipse15 from '../assets/Ellipse-15.png'
import Ellipse16 from '../assets/Ellipse-16.png'
import Ellipse17 from '../assets/Ellipse-17.png'
import Ellipse18 from '../assets/Ellipse-18.png'
import Ellipse19 from '../assets/Ellipse-19.png'
import Ellipse20 from '../assets/Ellipse-20.png'
import Ellipse21 from '../assets/Ellipse-21.png'
import ButtonPrimary from '../components/common/ButtonPrimary'

const entradas = [
  { id: 1, name: 'Papa a la huancaína', price: 8.99, image: Ellipse14 },
  { id: 2, name: 'Tequeños', price: 6.99, image: Ellipse15 }]
const almuerzos = [
  { id: 1, name: 'Chaufa con broaster', price: 12.99, image: Ellipse16 },
  { id: 2, name: 'Tallarines', price: 10.99, image: Ellipse17 }]
const postres = [
  { id: 1, name: 'Torta de chocolate', price: 5.99, image: Ellipse18 },
  { id: 2, name: 'Mazamorra morada', price: 4.99, image: Ellipse19 }]

const bebidas = [
  { id: 1, name: 'Chicha', price: 1.99, image: Ellipse20 },
  { id: 2, name: 'Maracuyá', price: 2.49, image: Ellipse21 }]

function Home() {
  return (
    <>
      <div className="relative w-full min-h-[580px] pb-12 flex">
        <img src={homeBg} alt="Home Background" className="absolute inset-0 w-full h-full object-cover opacity-50 -z-1" />
        <div className='px-4 mt-auto'>
          <p className="text-lg text-justify text-black relative z-10 mt-4">
            En AQUI Menú, creemos que cada persona merece una comida pensada especialmente para ella. Por eso, ofrecemos un servicio de entrega de menús personalizados, adaptados a los gustos, necesidades nutricionales y horarios de cada cliente. 
          </p>
          <a href="/carta" className="text-lg bg-neutral-800 flex items-center justify-center py-2 text-white mt-4 w-full">
            Empezar
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <div className='relative'>
          <h2 className='text-2xl font-bold text-center'>Menú del día</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Entradas</h3>
            <div className="grid grid-cols-2 gap-4">
              {entradas.map((entrada) => (
                <div key={entrada.id} className="flex flex-col items-center space-x-4 shadow-md py-4 px-6 rounded-sm">
                  <img src={entrada.image} alt={entrada.name} className="w-[full] mx-auto" />
                  <div>
                    <h4 className="text-lg font-medium text-center mt-2">{entrada.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Almuerzos</h3>
            <div className="grid grid-cols-2 gap-4">
              {almuerzos.map((almuerzo) => (
                <div key={almuerzo.id} className="flex flex-col items-center space-x-4 shadow-md py-4 px-6 rounded-sm">
                  <img src={almuerzo.image} alt={almuerzo.name} className="w-[full] mx-auto" />
                  <div>
                    <h4 className="text-lg font-medium text-center mt-2">{almuerzo.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Postres</h3>
            <div className="grid grid-cols-2 gap-4">
              {postres.map((postre) => (
                <div key={postre.id} className="flex flex-col items-center space-x-4 shadow-md py-4 px-6 rounded-sm">
                  <img src={postre.image} alt={postre.name} className="w-[full] mx-auto" />
                  <div>
                    <h4 className="text-lg font-medium text-center mt-2">{postre.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Bebidas</h3>
            <div className="grid grid-cols-2 gap-4">
              {bebidas.map((bebida) => (
                <div key={bebida.id} className="flex flex-col items-center space-x-4 shadow-md py-4 px-6 rounded-sm">
                  <img src={bebida.image} alt={bebida.name} className="w-[full] mx-auto" />
                  <div>
                    <h4 className="text-lg font-medium text-center mt-2">{bebida.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        <div className='md:col-span-2'>
        <ButtonPrimary href='/ordenar-menu' >
          Realizar pedido
        </ButtonPrimary>
        </div>
      </div>
    </div>
    </>
    
  )
}
export default Home