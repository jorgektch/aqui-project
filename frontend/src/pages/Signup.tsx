import { useEffect, useState } from 'react';
import bgLogin from '../assets/login-bg.png'
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { tokens } = useAuth();
  useEffect(() => {
      // Redirigir si ya hay un token de autenticación
      if (tokens) {
        navigate('/');
      }
    }, [tokens, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el registro, por ejemplo, enviando los datos a una API
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Aquí podrías hacer una llamada a la API para registrar al usuario
    axiosInstance.post('/auth/register/', {
      email,
      password,
    })
      .then((response) => {
        console.log('Registro exitoso:', response.data);
        // Redirigir o mostrar un mensaje de éxito
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error('Error al registrarse:', error);
      });
  };
  return (
    <section className='bg-neutral-800 min-h-screen text-white flex flex-col items-center justify-center'>

      <img src={bgLogin} alt="Login Background" className="absolute top-0 w-full h-auto max-h-[300px] object-cover object-bottom opacity-50 " />
      <div className="relative w-full min-h-[580px] pb-12 flex mx-auto max-w-md">
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-12 px-8'>
          <div className='w-full '>
            <label htmlFor="name" className="block  font-light text-[#f3f3f3]">Nombre</label>
            <input onChange={(e) => setName(e.target.value)} type="name" id="name" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>
          <div className='w-full '>
            <label htmlFor="email" className="block  font-light text-[#f3f3f3]">Correo</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full border-b p-2 outline-none" placeholder="" />
          </div>
          <div className='w-full '>
            <label htmlFor="password" className="block font-light text-[#f3f3f3]">Contraseña</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full border-b p-2 outline-none" placeholder="" />
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
