import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRecipes } from "../api/recipes";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("recipe-guide-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("recipe-guide-favorites", JSON.stringify(favoritesList));
  }, [favoritesList]);

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    await searchForRecipes(searchParam);
  }

  async function handleQuickSearch(query) {
    setSearchParam(query);
    await searchForRecipes(query);
  }

  async function searchForRecipes(searchTerm) {
    const query = searchTerm.trim();
    if (!query || loading) return;

    setLoading(true);
    setSearchError("");
    setLastSearch(query);
    try {
      const recipes = await searchRecipes(query);
      setRecipeList(recipes);
      setSearchParam("");
      navigate("/");
    } catch {
      setSearchError("Recipe search is unavailable right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    setFavoritesList((currentFavorites) => {
      const alreadyFavorited = currentFavorites.some(
        (item) => item.id === getCurrentItem.id
      );

      return alreadyFavorited
        ? currentFavorites.filter((item) => item.id !== getCurrentItem.id)
        : [...currentFavorites, getCurrentItem];
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        searchError,
        lastSearch,
        recipeList,
        setSearchParam,
        handleSubmit,
        handleQuickSearch,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
