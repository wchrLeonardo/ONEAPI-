import { useState, useEffect } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [name, setName] = useState('')
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const url = 'https://api.api-onepiece.com/v2/characters/en'

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Erro na requisição')
        }
        const result = await response.json();
        console.log(result) // Para verificar a resposta da API
        setCharacters(result) // Armazenando os dados diretamente, já que é um array
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Função para filtrar personagens pelo nome
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setShowModal(false); // Fecha o modal após o envio
  };

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

{showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Insira seu nome</h2>
            <form onSubmit={handleModalSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Digite seu nome"
              />
              <button type="submit" className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}



      <div className="flex items-center justify-between">
  <img src="/images/logo.png" alt="Logo" className="ml-5 mt-10" />
  
    <p style={{ fontFamily: 'Nico Moji' }} className='text-white text-2xl'>Bem vindo {name || 'Usuário'}</p>

  <div className="relative w-3/4 max-w-sm mr-5">
    <input
      type="text"
      placeholder="Pesquisar personagens..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor do input
      className="w-full bg-[#BB5346] text-white rounded-full p-2 pl-10 mb-4 focus:outline-none" 
    />
    <img
      src="/images/lupa.png"
      alt="Lupa"
      className="absolute left-3 top-5 transform -translate-y-1/2 w-5 h-5" // Posiciona o ícone no meio verticalmente
    />
  </div>
</div>
    <h1 style={{ fontFamily: 'Nico Moji' }} className="text-7xl text-white font-bold mt-10 flex justify-center mb-4">ONE API</h1>
    {/* Mostrar a listagem apenas se houver um termo de pesquisa */}
    <div className='flex justify-center'>
    <div className='flex flex-col justify-center h-auto space-y-4 '>
    {searchTerm && filteredCharacters.length > 0 ? (
        <div className='space-y-2 max-h-[60vh] overflow-y-scroll custom-scroll'>
        {filteredCharacters.map((character) => (
          <div key={character.id} className="bg-white items-center flex justify-between border-b p-2 text-black gap-20">
            <img src='/images/personas.jpg' className='w-16'></img>
            <p>{character.name}</p>
             <p>{character.bounty}</p>
          </div>
        ))}
        </div>
    ) : (
      searchTerm && <p style={{ fontFamily: 'Nico Moji' }}className='mt-20 text-white text-3xl'>Nenhum personagem encontrado.</p> 
      )} 
      </div>
      </div>
  </section>
  );
}
