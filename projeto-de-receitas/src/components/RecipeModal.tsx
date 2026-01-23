import React, { useState } from 'react';
import { FaTimes, FaYoutube, FaUtensils, FaHourglassHalf, FaGlobeAmericas, FaHeart, FaRegHeart, FaFilePdf, FaSpinner } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFavoriteStore } from '../store/useFavoriteStore';
import type { Recipe } from '../types/recipe';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

/**
 * Modal de detalhes da receita.
 * Exibe imagem, ingredientes, instruções e link para o YouTube.
 */
const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorited = isFavorite(recipe.idMeal);
  const intl = useIntl();
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };
  /**
   * Extrai ingredientes e medidas do objeto da receita.
   */
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient,
          measure: measure || '',
        });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    // 1. Definição do template de estilos (CSS puro e seguro)
    const pdfStylesFiltered = `
      body { 
        margin: 0; 
        padding: 0; 
        font-family: Arial, sans-serif; 
        background: #ffffff; 
        color: #1a202c; 
      }
      .pdf-container { 
        width: 210mm; 
        background: #ffffff; 
        margin: 0 auto;
        box-sizing: border-box;
      }
      .pdf-header { 
        background-color: #f97316; 
        padding: 40px; 
        text-align: center; 
        color: #ffffff;
      }
      .pdf-image { 
        width: 150px; 
        height: 150px; 
        border-radius: 75px; 
        border: 4px solid #ffffff; 
        object-fit: cover; 
        margin-bottom: 15px;
      }
      .pdf-title { 
        margin: 0; 
        font-size: 30px; 
        font-weight: bold; 
        text-transform: uppercase;
      }
      .pdf-meta { 
        margin-top: 10px; 
        font-size: 16px; 
        opacity: 0.9;
      }
      .pdf-body { 
        padding: 40px; 
      }
      .pdf-section-title { 
        font-size: 22px; 
        font-weight: bold; 
        color: #111827; 
        border-bottom: 2px solid #f97316; 
        padding-bottom: 8px; 
        margin: 30px 0 20px 0;
      }
      .pdf-section-title:first-child { 
        margin-top: 0; 
      }
      .pdf-ingredients-container { 
        margin-bottom: 30px; 
      }
      .pdf-ingredient-item { 
        width: 45%; 
        float: left; 
        background: #f3f4f6; 
        padding: 10px 15px; 
        margin: 0 2% 10px 0; 
        border-radius: 8px; 
        border: 1px solid #e5e7eb;
        font-size: 14px;
      }
      .pdf-ingredient-name { 
        font-weight: bold; 
      }
      .pdf-ingredient-measure { 
        color: #ea580c; 
        float: right;
      }
      .pdf-clearfix { 
        clear: both; 
      }
      .pdf-instructions { 
        line-height: 1.6; 
        color: #4b5563; 
        text-align: justify; 
        white-space: pre-wrap;
        font-size: 14px;
      }
      .pdf-footer { 
        text-align: center; 
        padding: 30px; 
        color: #9ca3af; 
        font-size: 11px; 
        border-top: 1px solid #f3f4f6; 
        margin-top: 40px;
      }
    `;

    // 2. Montagem da estrutura HTML isolada
    const pdfHtml = `
      <div class="pdf-container">
        <div class="pdf-header">
          <img src="${recipe.strMealThumb}" class="pdf-image" crossorigin="anonymous" />
          <h1 class="pdf-title">${recipe.strMeal}</h1>
          <p class="pdf-meta">${recipe.strArea} • ${recipe.strCategory}</p>
        </div>
        <div class="pdf-body">
          <h2 class="pdf-section-title">${intl.formatMessage({ id: 'modal.ingredientsTitle' })}</h2>
          <div class="pdf-ingredients-container">
            ${ingredients.map(item => `
              <div class="pdf-ingredient-item">
                <span class="pdf-ingredient-name">${item.ingredient}</span>
                <span class="pdf-ingredient-measure">${item.measure}</span>
              </div>
            `).join('')}
            <div class="pdf-clearfix"></div>
          </div>
          <h2 class="pdf-section-title">${intl.formatMessage({ id: 'modal.instructionsTitle' })}</h2>
          <div class="pdf-instructions">${recipe.strInstructions}</div>
        </div>
        <div class="pdf-footer">
          ${intl.formatMessage({ id: 'header.appName' })} © 2026 • Premium Recipe Export
        </div>
      </div>
    `;

    // 3. Renderização via Iframe com Biblioteca Injetada
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = '210mm';
    iframe.style.height = '1000px';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      setIsGenerating(false);
      document.body.removeChild(iframe);
      return;
    }

    doc.open();
    // Injetamos o script diretamente no iframe para isolamento de cores (oklch)
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${pdfStylesFiltered}</style>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        </head>
        <body>${pdfHtml}</body>
      </html>
    `);
    doc.close();

    try {
      // 4. Aguardar carregamento da biblioteca e da imagem
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject('Timeout ao carregar recursos do PDF'), 10000);
        const img = doc.querySelector('img');
        
        const checkReady = () => {
          const win = iframe.contentWindow as any;
          if (win.html2pdf && (!img || img.complete)) {
            clearTimeout(timeout);
            resolve(true);
          } else {
            setTimeout(checkReady, 500);
          }
        };
        checkReady();
      });

      // 5. Geração final usando a instância da biblioteca DENTRO do iframe
      // Importante: A biblioteca html2pdf dentro do iframe retorna o PDF como blob.
      // O download deve ser disparado pela janela PRINCIPAL para evitar bloqueios de segurança do navegador.
      const win = iframe.contentWindow as any;
      const element = doc.body;
      const opt = {
        margin: 0,
        filename: `${recipe.strMeal.replace(/\s+/g, '_')}_Recipe.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Gerar o PDF como Blob
      const pdfBlob = await win.html2pdf().set(opt).from(element).output('blob');
      
      // Criar URL e forçar download via link na janela principal
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = opt.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Libera a memória do Blob
      setTimeout(() => URL.revokeObjectURL(url), 100);

    } catch (err) {
      console.error('Erro na exportação de PDF:', err);
      const errorMessage = intl.formatMessage({ id: 'modal.errorPDF' });
      alert(errorMessage);
    } finally {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-100 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
          <div className="absolute top-4 right-4 z-50 flex gap-3 md:top-6 md:right-6">
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center ${
                favorited 
                  ? 'bg-white text-red-500 hover:bg-gray-50' 
                  : 'bg-white text-gray-400 hover:text-red-500 hover:bg-gray-50'
              }`}
              title={favorited ? "Remove from Favorites" : "Add to Favorites"}
            >
              {favorited ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
            </button>
            <button
              onClick={onClose}
              className="bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-50 p-3 rounded-full transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center"
            >
              <FaTimes size={22} />
            </button>
          </div>

        {/* Lado Esquerdo: Imagem e Infos contextuais */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="bg-orange-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full w-fit mb-3">
              {recipe.strCategory}
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow-md">{recipe.strMeal}</h2>
            <div className="flex items-center text-white/90 text-sm font-medium">
              <FaGlobeAmericas className="mr-2" />
              <span>{recipe.strArea}</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Conteúdo Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="flex flex-col sm:flex-row gap-3">
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold py-4 px-6 transition-all shadow-lg hover:shadow-red-200"
              >
                <FaYoutube size={24} className="mr-3" />
                <FormattedMessage id="modal.watchVideo" />
              </a>
            )}

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`flex-1 flex items-center justify-center rounded-2xl font-bold py-4 px-6 transition-all shadow-lg ${
                isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-orange-200 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="mr-3 animate-spin" size={24} />
                  <FormattedMessage id="modal.generatingPDF" defaultMessage="Generating..." />
                </>
              ) : (
                <>
                  <FaFilePdf size={24} className="mr-3" />
                  <FormattedMessage id="modal.downloadPDF" defaultMessage="Download PDF" />
                </>
              )}
            </button>
          </div>

          {/* Seção de Ingredientes */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaUtensils className="text-orange-500 mr-3" />
              <FormattedMessage id="modal.ingredientsTitle" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredients.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50 hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
                  <span className="font-semibold text-gray-700 text-sm">{item.ingredient}</span>
                  <span className="text-orange-600 font-bold text-xs">{item.measure}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Instruções */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaHourglassHalf className="text-orange-500 mr-3" />
              <FormattedMessage id="modal.instructionsTitle" />
            </h3>
            <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap text-justify">
              {recipe.strInstructions}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
