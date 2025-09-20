import './index.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FeaturedRecipes from './components/RecipeList'

export default function App() {
  return (
    <>
      <Header/>
      <HomePage/>
      <FeaturedRecipes recipes={[]} loading={false} />
    </>
  )
}

