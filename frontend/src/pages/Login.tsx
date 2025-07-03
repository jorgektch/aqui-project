import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgLogin from '../assets/login-bg.png'
import { useAuth } from '../auth/AuthContext';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, tokens } = useAuth();
  useEffect(() => {
    // Redirigir si ya hay un token de autenticación
    if (tokens) {
      navigate('/');
    }
  }, [tokens, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        // Redirigir o mostrar un mensaje de éxito
        console.log('Inicio de sesión exitoso');
        navigate('/');
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        console.error('Error al iniciar sesión:', error);
      });
  };
  return (
    <section className='bg-neutral-800 min-h-screen text-white flex flex-col items-center justify-center'>

      <img src={bgLogin} alt="Login Background" className="absolute top-0 w-full h-auto max-h-[300px] object-cover object-bottom opacity-50 " />
      <div className="relative w-full min-h-[580px] pb-12 flex mx-auto max-w-md">
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-12 px-8'>
          <div className='w-full '>
            <label htmlFor="email" className="block  font-light text-[#f3f3f3]">Correo</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>
          <div className='w-full '>
            <label htmlFor="password" className="block font-light text-[#f3f3f3]">Contraseña</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>

          <button className='bg-[#f3f3f3] text-neutral-800 w-full py-3 px-4 rounded-sm cursor-pointer' >
            Iniciar sesión
          </button>
          <span className='text-center text-sm text-[#fefefe] font-light'>¿No tienes cuenta? <a href="/signup" className=' font-semibold'>Registrate</a></span>
        </form>
      </div>
    </section>
  )
}

export default Login


