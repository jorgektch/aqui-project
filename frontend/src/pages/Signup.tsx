import bgLogin from '../assets/login-bg.png'
function Signup() {
  return (
    <section className='bg-neutral-800 min-h-screen text-white flex flex-col items-center justify-center'>

      <img src={bgLogin} alt="Login Background" className="absolute top-0 w-full h-auto max-h-[300px] object-cover object-bottom opacity-50 " />
      <div className="relative w-full min-h-[580px] pb-12 flex mx-auto max-w-md">
        <form className='w-full flex flex-col items-center justify-center gap-12 px-8'>
          <div className='w-full '>
            <label htmlFor="name" className="block  font-light text-[#f3f3f3]">Nombre</label>
            <input type="name" id="name" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>
          <div className='w-full '>
            <label htmlFor="email" className="block  font-light text-[#f3f3f3]">Correo</label>
            <input type="email" id="email" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>
          <div className='w-full '>
            <label htmlFor="password" className="block font-light text-[#f3f3f3]">Contraseña</label>
            <input type="password" id="password" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>

          <button className='bg-[#f3f3f3] text-neutral-800 w-full py-3 px-4 rounded-sm cursor-pointer' >
            Registrarse
          </button>
          <span className='text-center text-sm text-[#fefefe] font-light'>¿Ya tienes cuenta? <a href="/login" className=' font-semibold'>Inicia sesión</a></span>
        </form>
      </div>
    </section>
  )
}

export default Signup
