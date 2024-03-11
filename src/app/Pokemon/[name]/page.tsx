
'use client'

import ErrorComponent from '@/app/Pokemon/[name]/error';
import Loading from '@/app/Pokemon/[name]/loading';
import axios from 'axios';
import Image from 'next/image'; // Importer le composant Image de next/image
import React, { useEffect, useState } from 'react';

interface PokemonSpeciesDetails {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  varieties: { is_default: boolean; pokemon: { name: string; url: string } }[];
  shape: { name: string };
  color: { name: string };
  egg_groups: { name: string }[];
}

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  description: string;
  abilities: string[];
  hiddenAbilities: string[];
  height: number;
  weight: number;
  shape: string;
  color: string;
  eggGroups: string[];
}

const PokemonDetailsPage: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pathSegments = window.location.pathname.split('/');
        const pokemonName = pathSegments[pathSegments.length - 1];

        if (pokemonName && typeof pokemonName === 'string') {
          const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
          const speciesData: PokemonSpeciesDetails = speciesResponse.data;
          const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || "No description available";
          const pokemonVariety = speciesData.varieties.find(variety => variety.is_default);
          const pokemonUrl = pokemonVariety?.pokemon.url;

          if (pokemonUrl) {
            const pokemonResponse = await axios.get(pokemonUrl);
            const pokemonData = pokemonResponse.data;

            const abilities = pokemonData.abilities.map((ability: { ability: { name: string } }) => ability.ability.name);
            const hiddenAbilities = pokemonData.abilities.filter((ability: { is_hidden: boolean }) => ability.is_hidden).map((ability: { ability: { name: string } }) => ability.ability.name);

            setPokemonDetails({
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.types,
              sprites: pokemonData.sprites,
              description: description.replace(/'/g, "&apos;"), // Échapper les apostrophes
              abilities: abilities,
              hiddenAbilities: hiddenAbilities,
              height: pokemonData.height,
              weight: pokemonData.weight,
              shape: speciesData.shape.name,
              color: speciesData.color.name,
              eggGroups: speciesData.egg_groups.map(group => group.name),
            });
          }
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération des détails :`, error);
        setError("404 page NotFound");
      }
    };

    fetchPokemonDetails();
  }, []);

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (!pokemonDetails) {
    return <Loading />;
  }

  return (
    <div style={{ textAlign: 'center', alignItems: 'center', fontSize: '20px', color: '#333', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <h1 style={{ color: 'black', marginBottom: '20px', textTransform: 'capitalize', fontSize: '3rem' }}>{pokemonDetails.name}</h1>
    <p style={{ fontSize: '2rem' }}>ID : {pokemonDetails.id}</p>
    <p style={{ fontSize: '2rem' }}>Types : {pokemonDetails.types.map((type, index) => <span key={index} style={{ backgroundColor: '#e0e0e0', borderRadius: '5px', padding: '2px 6px', marginRight: '5px' }}>{type.type.name}</span>)}</p>
    <img src={pokemonDetails.sprites.front_default} alt={`${pokemonDetails.name} sprite`} style={{ display: "flex", justifyContent: 'center', margin: 'auto', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px', width: '200px', height: '200px' }} />
    {/* Utilisez directement la balise <img> */}
    <p style={{ fontSize: '2rem' }}>Description: {pokemonDetails.description}</p>
    <p style={{ fontSize: '2rem' }}>Poids : {pokemonDetails.weight / 10} kg</p>
    <p style={{ fontSize: '2rem' }}>Taille : {pokemonDetails.height / 10} m</p>
    <p style={{ fontSize: '2rem' }}>Capacités : {pokemonDetails.abilities.map((ability, index) => <span key={index} style={{ backgroundColor: '#e0e0e0', borderRadius: '5px', padding: '2px 6px', marginRight: '5px' }} >{ability}</span>)}</p>
    <p style={{ fontSize: '2rem' }}>Couleur : {pokemonDetails.color}</p>
    <p style={{ fontSize: '2rem' }}>Groupes d'œufs : {pokemonDetails.eggGroups.join(', ')}</p>
  </div>
  );
};

export default PokemonDetailsPage;
