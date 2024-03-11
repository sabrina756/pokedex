'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TypeFilter from '@/components/TypeFilter/TypeFilter';
import PokemonList from '@/components/PokemonList/PokemonList';

const Page: React.FC = () => {
  const [pokemons, setPokemons] = useState<{ id: number; imageUrl: string; name: string; types: string[] }[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
        const data = await response.json();
        const fetchedPokemons = await Promise.all(data.results.map(async (pokemon: { name: string; url: string }) => {
          const detailsResponse = await fetch(pokemon.url);
          const detailsData = await detailsResponse.json();
          return {
            id: parseInt(pokemon.url.split('/').slice(-2)[0]),
            imageUrl: detailsData.sprites.front_default,
            name: pokemon.name,
            types: detailsData.types.map((type: { type: { name: string } }) => type.type.name),
          };
        }));
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  return (
    <div>
      <h1 className='text-xxl text-5xl font-bold xl:first-letter: text-center text-pink-500'>POKEDEX</h1>
      <Link href="/app/Pokemon/[ID]" as="/app/Pokemon/id">
       
     
      <TypeFilter onFilterChange={handleFilterChange} />
      <PokemonList pokemons={pokemons.filter(pokemon => filterType === 'all' || pokemon.types.includes(filterType))} />
      </Link>
    </div>
  );
};

export default Page;
