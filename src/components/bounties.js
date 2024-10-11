import { useState, useEffect } from "react"

export default function Bounties() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const selectedCharacters = [
    258, 289, 187, 96, 85, 247, 81, 32, 1, 54, 59, 82,
  ]; // IDs dos personagens que você deseja mostrar

  useEffect(() => {
    const url = "https://api.api-onepiece.com/v2/characters/en"

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Erro na requisição")
        }
        const result = await response.json()
        console.log(result); // Verifique o que está sendo retornado
        setCharacters(result);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error)
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Cria um array na ordem de selectedCharacters e filtra apenas os que existem na lista de characters
  const orderedCharacters = selectedCharacters
    .map((id) => characters.find((character) => character.id === id))
    .filter((character) => character !== undefined); // Remove qualquer personagem não encontrado

  const getImageSrc = (characterID) => {
    const extensions = ["jpg", "png", "webp"]
    for (let ext of extensions) {
      const path = `/images/wanted/${characterID}.${ext}`
      if (typeof window != undefined) {
        const img = new Image();
        img.src = path;
        if (img.complete) {
          return path;
        }
      }
    }
    return "/images/wanted/1.webp";
  };

  return (
    <section className="flex flex-col h-full bg-gradient-to-br relative from-red-500 via-yellow-300 to-pink-800">
      <div className="z-0 flex py-8 ml-20 fixed">
        <img
          src="/images/ROGER.png"
          alt="Rei dos Piratas"
          className="w-auto h-[90vh] ml-20 object-cover"
        />
      </div>
      <h1
          style={{ fontFamily: "Times New Roman", fontWeight: "bold" }}
          className="text-white text-4xl mt-10 absolute right-20"
        >
          PERSONAGENS DE ONE PIECE <br/> COM AS MAIORES RECOMPENSAS
        </h1>
      <div className="mt-[12%] top-10 w-full flex flex-wrap justify-center z-10">
        {orderedCharacters.length > 0 ? (
          orderedCharacters.map((character) => (
            <div
              key={character.id}
              className="cards"
            >
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold" }} className="text-2xl">
                WANTED
              </h2>
              <img src={getImageSrc(character.id)} className="w-64 h-auto" />
              <h2 style={{ fontFamily: "Times New Roman", fontWeight: "bold" }}>DEAD OR ALIVE</h2>
              <h2 className="text-name">{character.name}</h2>
              <p>{character.job}</p>
              <h2>{character.bounty}</h2>
            </div>
          ))
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </div>
    </section>
  );
}
