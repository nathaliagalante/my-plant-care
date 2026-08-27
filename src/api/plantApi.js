export async function searchPlants(query) {
  const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY;

  if (!API_KEY) {
    console.error("Chave da API não encontrada. Adicione VITE_PERENUAL_API_KEY no arquivo .env");
    return [];
  }

  try {
    const res = await fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${query}`);
    const data = await res.json();

    console.log("Resposta da API Perenual:", data);

    if (!data.data || data.data.length === 0) return [];

    // Mapeia os dados da API real para o formato que a Dashboard espera
    return data.data.map(plant => ({
      name: plant.scientific_name[0] || "Desconhecido",
      common: plant.common_name || "Sem nome popular",
      water: plant.watering || "A cada 7 dias",
      light: "Luz indireta",
      sunlight: "Indireta",
      fertilization: "30 dias", // A Perenual detalha isso em outro endpoint, então usamos um fallback
      image: plant.default_image?.thumbnail || plant.default_image?.original_url
    }));
  } catch (error) {
    console.error("Erro ao buscar plantas:", error);
    throw error;
  }
}