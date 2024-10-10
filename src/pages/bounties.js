import { useState, useEffect } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedCharacters = [258, 289, 187, 96, 85, 247, 81, 32, 1, 54, 59, 82]; // IDs dos personagens que você deseja mostrar

  useEffect(() => {
    const url = 'https://api.api-onepiece.com/v2/characters/en';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        console.log(result); // Verifique o que está sendo retornado
        setCharacters(result);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Cria um array na ordem de selectedCharacters e filtra apenas os que existem na lista de characters
  const orderedCharacters = selectedCharacters.map(id => 
    characters.find(character => character.id === id)
  ).filter(character => character !== undefined); // Remove qualquer personagem não encontrado

  const getImageSrc = (characterID) => {
    const extensions = ['jpg','png','webp']
    for(let ext of extensions){
      const path = `/images/wanted/${characterID}.${ext}`
      if(typeof window!=undefined){
        const img = new Image()
        img.src = path
        if(img.complete){
          return path
        }
      }      
    }
    return '/images/wanted/1.webp';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-300 to-pink-800 relative">
      <div className="flex py-8 ml-20">
        <img src="/images/ROGER.png" alt="Rei dos Piratas" className="w-auto h-[90vh] ml-20 object-cover"/>
      <h1 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }} className="text-white text-5xl ml-20 mt-5">PERSONAGENS DE ONE PIECE <br/> COM AS MAIORES RECOMPENSAS</h1>
      </div>
      <div className="absolute mt-[10%] top-10 w-full flex flex-wrap justify-center">
      {orderedCharacters.length > 0 ? (
          orderedCharacters.map((character) => (
            <div key={character.id} className="w-64 h-auto mt-[2%] m-4 p-5 bg-[#DFC6B0] rounded shadow-lg hover:shadow-2xl hover:scale-110 transition-transform duration-300"> 
            <h2 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}>WANTED</h2>
            <img src={getImageSrc(character.id)} className="w-64 h-auto"/>
            <h2>DEAD OR ALIVE</h2>
            <h2 className="text-lg font-bold">{character.name}</h2>
            <p>{character.job}</p>
            <h2>{character.bounty}</h2>
          </div>
          ))
      ) : (
        <p>Nenhum personagem encontrado.</p>
      )}
    </div>
    </div>
  );
}

// import { useState, useEffect } from 'react';

// export default function Characters() {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCharacters, setSelectedCharacters] = useState([258, 289, 187, 96, 85, 247, 81, 32, 1, 54, 59, 82]); // IDs dos personagens que você deseja mostrar (como números)

//   useEffect(() => {
//     const url = 'https://api.api-onepiece.com/v2/characters/en';

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Erro na requisição');
//         }
//         const result = await response.json();
//         console.log(result); // Verifique o que está sendo retornado
//         setCharacters(result);
//         setLoading(false);
//       } catch (error) {
//         console.error('Erro ao buscar os dados:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Carregando...</p>;
//   }

//   // Filtra personagens com base nos IDs selecionados
//   const filteredCharacters = characters.filter(character => selectedCharacters.includes(character.id)); // Comparando como números

//   return (
//     <div>
//       <h1>Personagens de One Piece</h1>
//       {filteredCharacters.length > 0 ? (
//         <ul>
//           {filteredCharacters.map((character) => (
//             <li key={character.id}>
//               {character.name} - {character.job}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Nenhum personagem encontrado.</p>
//       )}
//     </div>
//   );
// }

