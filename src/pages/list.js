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
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
        setLoading(false);
      }
    }

    fetchData()
  }, [])

  // Função para filtrar personagens pelo nome
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen relative">
      <img src="/images/loading.png" alt="Loading" className="w-full h-[100vh] object-cover" />
      <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
        Carregando...
      </p>
    </div>
    )
  }

  return (
    <section className="bg-[url('/images/index.png')] bg-cover h-[100vh]">
    <div className="flex items-center justify-between">
      <img src="/images/logo.png" className="mt-10 ml-5"></img>
      <input
        type="text"
        placeholder="Pesquisar personagens..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do input
        className="mt-10 mr-5 border bg-[#BB5346] border-black text-white rounded-full p-2 mb-4 w-3/4 max-w-sm" // Estilos para a barra de pesquisa
    />
    </div>
    <h1 className="text-7xl text-white font-bold mt-10 flex justify-center mb-4">ONE API</h1>
    {/* Mostrar a listagem apenas se houver um termo de pesquisa */}
    {searchTerm && filteredCharacters.length > 0 ? (
      <ul className="w-full max-w-md">
        {filteredCharacters.map((character) => (
          <li key={character.id} className="border-b p-2 text-white">
            {character.name} - {character.job}
          </li>
        ))}
      </ul>
    ) : (
      searchTerm && <p>Nenhum personagem encontrado.</p> // Mensagem se não encontrar
    )}
    <div>
  </div>
  </section>
  );
}
