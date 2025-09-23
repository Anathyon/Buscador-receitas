/**
 * Traduz texto usando a API pública MyMemory.
 * É mais confiável que o endpoint não oficial do Google e ideal para projetos de portfólio.
 * Limite anônimo: ~1000 requisições/dia.
 * 
 * @param text O texto a ser traduzido.
 * @param targetLang O idioma de destino (ex: 'pt', 'es').
 * @returns O texto traduzido.
 */
export const translateText = async (text: string | null | undefined, targetLang: string): Promise<string> => {
  // Se não houver texto ou o idioma de destino for inglês, retorne o texto original.
  if (!text || targetLang === 'en') {
    return text || '';
  }

  // A API MyMemory usa o formato 'en|pt' para o par de idiomas.
  const langPair = `en|${targetLang}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Verifica se a resposta foi bem-sucedida e se o texto traduzido existe.
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    } else {
      // Se a API falhar ou não retornar uma tradução, retorna o texto original.
      console.warn('MyMemory API não retornou uma tradução válida:', data);
      return text;
    }
  } catch (error) {
    console.error("Erro ao chamar a API MyMemory:", error);
    // Em caso de erro de rede, retorna o texto original para não quebrar a UI.
    return text;
  }
};