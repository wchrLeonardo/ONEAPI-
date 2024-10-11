import { useState, useEffect } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

  useEffect(() => {
    const url = 'https://api.api-onepiece.com/v2/characters/en';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        console.log(result); // Para verificar a resposta da API
        setCharacters(result); // Armazenando os dados diretamente, já que é um array
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para filtrar personagens pelo nome
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Personagens de One Piece</h1>
      <input
        type="text"
        placeholder="Pesquisar personagem pelo nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do input
      />
      {filteredCharacters.length > 0 ? (
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.id}>
              {character.name} - {character.job} - {character.id}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum personagem encontrado.</p>
      )}
    </div>
  );
}
