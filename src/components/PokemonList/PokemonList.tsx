import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import Link from 'next/link';
interface PokemonListProps {
  pokemons: { id: number; imageUrl: string; name: string; types: string[] }[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {pokemons.map((pokemon) => (
        
        
        <PokemonCard key={pokemon.id} {...pokemon} />
      
      
        
      ))}
    </div>
  );
};

export default PokemonList;