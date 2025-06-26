import React from 'react';

interface MenuCardProps {
  image: string;
  title: string;
  rating: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ image, title, rating }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-6">
      <img
        src={image}
        alt={title}
        className="w-28 h-28 rounded-lg object-cover"
      />
      <div>
        <div className="text-3xl flex mb-2">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
        <p className="text-2xl font-semibold text-gray-800">{title}</p>
      </div>
    </div>
  );
};

export default MenuCard;
