'use client'
import React from 'react';

interface TypeFilterProps {
  onFilterChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <select className=' border-gray-400  w-max h-10  hover:-translate-y-1 hover:scale-105   border rounded-md  hover:bg-pink-600 hover:text-white text-lg shadow-pink-600  font-semibold text-center' onChange={handleFilterChange}>
      <option value="all">All</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
      <option value="electric">Electric</option>
    </select>
  );
};

export default TypeFilter;