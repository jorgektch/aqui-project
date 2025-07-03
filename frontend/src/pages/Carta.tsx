import React, { useState } from 'react';
import MenuCard from '../components/MenuCard';
import Leaf from '../assets/leaf.png';
import Ellipse14 from '../assets/Ellipse-14.png';
import Ellipse15 from '../assets/Ellipse-15.png';
import Ellipse16 from '../assets/Ellipse-16.png';
import Ellipse17 from '../assets/Ellipse-17.png';
import Ellipse18 from '../assets/Ellipse-18.png';
import Ellipse19 from '../assets/Ellipse-19.png';

interface MenuItem {
  id: number;
  image: string;
  title: string;
  rating: number;
  description: string;
}

const initialMenus: MenuItem[] = [
  {
    id: 1,
    image: Ellipse14,
    title: 'Papa a la huancaína',
    rating: 4,
    description: 'Entrada típica peruana con salsa de ají amarillo y queso.',
  },
  {
    id: 2,
    image: Ellipse15,
    title: 'Tequeños',
    rating: 4,
    description: 'Deditos de masa rellenos de queso, acompañados de guacamole.',
  },
  {
    id: 3,
    image: Ellipse16,
    title: 'Arroz chaufa con pollo broaster',
    rating: 4,
    description: 'Arroz salteado al estilo oriental con pollo crujiente.',
  },
  {
    id: 4,
    image: Ellipse17,
    title: 'Tallarin saltado',
    rating: 4,
    description: 'Fideos salteados con verduras y carne al estilo chifa.',
  },
  {
    id: 5,
    image: Ellipse18,
    title: 'Torta de chocolate',
    rating: 4,
    description: 'Postre dulce con intenso sabor a chocolate.',
  },
  {
    id: 6,
    image: Ellipse19,
    title: 'Mazamorra morada',
    rating: 4,
    description: 'Postre peruano de maíz morado y frutas secas.',
  },
];

const Carta: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    if (selectedMenu) {
      // Actualizar el rating en el array de menus
      const updatedMenus = menus.map(menu =>
        menu.id === selectedMenu.id
          ? { ...menu, rating: newRating }
          : menu
      );
      setMenus(updatedMenus);
      
      // Actualizar el menú seleccionado
      setSelectedMenu({ ...selectedMenu, rating: newRating });
    }
  };

  const handleStarClick = (rating: number) => {
    handleRatingChange(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderInteractiveStars = () => {
    const stars = [];
    const currentRating = selectedMenu ? selectedMenu.rating : 0;
    const displayRating = hoverRating || currentRating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          className={`text-4xl transition-colors duration-200 hover:scale-110 ${
            i <= displayRating ? 'text-black' : 'text-gray-300'
          }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        >
          {i <= displayRating ? '★' : '☆'}
        </button>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-8 mb-12">
        <div className="relative text-center">
          <img src={Leaf} alt="Decoración" className="mx-auto mb-1 w-12 h-12" />
          <h2 className="text-3xl font-bold">Platos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {menus.map((menu) => (
            <div key={menu.id} onClick={() => setSelectedMenu(menu)} className="cursor-pointer">
              <MenuCard image={menu.image} title={menu.title} rating={menu.rating} />
            </div>
          ))}
        </div>
      </div>

      {selectedMenu && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center relative transform transition-all duration-300 scale-100 opacity-100 animate-fade-in">
            <button
              className="absolute top-2 right-4 text-2xl font-bold text-gray-600 hover:text-black"
              onClick={() => setSelectedMenu(null)}
            >
              ×
            </button>
            <img
              src={selectedMenu.image}
              alt={selectedMenu.title}
              className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedMenu.title}</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Califica este plato:</p>
              <div className="flex justify-center gap-1">
                {renderInteractiveStars()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Haz clic en las estrellas para calificar
              </p>
            </div>
            
            <p className="text-lg text-gray-700">{selectedMenu.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Carta;