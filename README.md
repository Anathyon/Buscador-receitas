# 🍳 RecipeApp | Plataforma de Receitas Global

Aplicação moderna e responsiva desenvolvida em **TypeScript + React**, que funciona como uma plataforma global de busca e visualização de receitas.

O projeto conecta-se à API **TheMealDB** para fornecer dados de culinária autênticos e utiliza a **API Gemini** para traduzir o conteúdo dinamicamente, garantindo uma experiência envolvente e acessível em múltiplos idiomas.

🌐 **Uma aplicação que quebra barreiras linguísticas na cozinha!**

---

## 📌 Funcionalidades

- ✅ **Busca Dinâmica de Receitas**: Pesquisa instantânea por nome da refeição, ingrediente ou categoria.  
- ✅ **Tradução em Tempo Real**: Utiliza a API Gemini para traduzir dinamicamente a receita completa (ingredientes, medidas e instruções) para **Português, Inglês e Espanhol**.  
- ✅ **Detalhes Completos da Receita**: Exibe ingredientes, medidas, instruções passo a passo, área de origem e link para vídeo no YouTube.
- ✅ **Gerenciamento de Favoritos**: Salve suas receitas preferidas para acesso rápido e fácil a qualquer momento.
- ✅ **Exportação para PDF**: Baixe receitas completas com um layout otimizado e profissional para impressão ou compartilhamento.
- ✅ **Experiência Visual Fluida**: Utilização de *Loading Skeletons* para um carregamento suave e agradável da interface.
- ✅ **Filtros por Categoria e Ingrediente**: Permite refinar a busca com base em listas predefinidas da API TheMealDB.  
- ✅ **Layout Totalmente Responsivo**: Design adaptável para funcionar perfeitamente em dispositivos móveis, tablets e desktops.  
- ✅ **Internacionalização (i18n)**: Interface e conteúdo traduzidos para **Português, Inglês e Espanhol**.  

---

## 🧪 Tecnologias Utilizadas

| Ferramenta         | Descrição                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **React**          | Criação da interface com componentes reutilizáveis                         |
| **TypeScript**     | Lógica e tipagem estática                                                  |
| **Tailwind CSS**   | Estilização rápida e responsiva, focada na experiência do usuário (UI)      |
| **Zustand**        | Gerenciamento de estado global leve, intuitivo e performático              |
| **React Icons**    | Ícones modernos e acessíveis                                               |
| **React-Intl**     | Biblioteca para Internacionalização (i18n)                                 |
| **html2pdf.js**    | Geração de PDFs de alta qualidade diretamente do navegador                 |
| **TheMealDB API**  | Fonte de dados confiável para receitas e filtros                           |
| **Google Gemini API** | Serviço de tradução dinâmica para texto e informações estruturadas     |
| **Vite**           | Build rápido e otimizado para o projeto                                    |

---

## 🖼️ Layout Responsivo

> 💻 Desktop | 📱 Mobile

| Desktop             | Mobile              |
|---------------------|---------------------|
<div align="center">
  <img src="https://github.com/Anathyon/Buscador-receitas/blob/main/projeto-de-receitas/public/assets/Descktop-app.png" width="400" alt="Versão Desktop" />
  <img src="https://github.com/Anathyon/Buscador-receitas/blob/main/projeto-de-receitas/public/assets/Mobile-app.jpg" width="250" alt="Versão Mobile" />
</div>

---

## 📦 Instalação Local

Para rodar este projeto na sua máquina, você precisará de uma chave de API para o serviço de tradução.

### Pré-requisitos

- **Node.js (versão 18+)**  
- **Conta no Google AI Studio** para obter a chave da Gemini API.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/recipe-app.git
cd recipe-app

# Instale as dependências
npm install

# Configure a chave da API (crie um arquivo .env.local na raiz do projeto)
# IMPORTANTE: No contexto do Canvas, essa chave é fornecida automaticamente.
# Para rodar localmente, siga o modelo:
VITE_GEMINI_API_KEY="SUA_CHAVE_AQUI"

# Execute em modo de desenvolvimento
npm run dev
```

Acesse em: [https://buscador-receitas-theta.vercel.app/](https://buscador-receitas-theta.vercel.app/)

---

## 🤝 Contribuições

Contribuições são bem-vindas!  
Se você tiver sugestões, melhorias de UI/UX, ou correções de bugs, sinta-se à vontade para:

- Abrir uma **Issue** descrevendo a melhoria.  
- Abrir um **Pull Request** com suas alterações.  

---

## 👨💻 Autor

Desenvolvido com dedicação por: **Anathyon Erysson**  

📫 **E-mail:** anathyon@protonmail.com  
🔗 **LinkedIn:** (https://www.linkedin.com/in/anathyonerysson/)
