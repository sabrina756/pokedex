import Link from "next/link";
import React from "react";

interface PokemonCardProps {
  id: number;
  imageUrl: string;
  name: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  imageUrl,
  name,
  types,
}) => {
  return (
    <div className="hover:bg-pink-500 hover:text-blue-800 border-yellow-600 border rounded-lg w-48 justify-center text-center ">
      
      <Link href="/Pokemon/[ID]" as={`/Pokemon/${name}`} key={name}>
  
        <p className="text-gray-600 font-medium"> ID: {id}</p>
        <p className="text-center text-white">{name}</p>
        <img src={imageUrl} alt={name} className=" justify-center " />
        <h2 className="text-xl font-bold">Type :</h2>
        <div>{types.join(", ")}</div>
      </Link>

        
      
    </div>
  );
};

export default PokemonCard;