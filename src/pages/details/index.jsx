import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import { getRecipeDetails as fetchRecipeDetails } from "../../api/recipes";

export default function Details() {
  const { id } = useParams();
  const { favoritesList, handleAddToFavorite } = useContext(GlobalContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getRecipeDetails() {
      setLoading(true);
      setError("");
      setRecipe(null);

      try {
        setRecipe(await fetchRecipeDetails(id, controller.signal));
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("We couldn’t load this recipe. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getRecipeDetails();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="mx-auto mt-16 max-w-7xl rounded-3xl border border-stone-200 bg-white/70 p-12 text-center text-xl text-stone-800" role="status">Loading recipe…</p>;
  }

  if (error) {
    return <p className="mx-auto mt-16 max-w-7xl rounded-2xl border border-red-200 bg-white/80 p-8 text-center text-lg text-red-700" role="alert">{error}</p>;
  }

  const isFavorite = favoritesList.some((item) => item.id === recipe.id);
  const tutorialSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${recipe.title} recipe cooking tutorial`)}`;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="self-start overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-2 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-100">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="block h-full w-full object-cover transition duration-700 hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
        </div>
      </div>
      <div className="flex flex-col rounded-[2rem] border border-stone-200 bg-white/80 p-7 shadow-sm sm:p-10">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{recipe.publisher}</span>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl">{recipe.title}</h1>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipe)}
            className="mt-5 inline-flex w-fit rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="mt-9 block text-xl font-bold text-stone-900">Ingredients</span>
          <ul className="mt-4 flex flex-col gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient.description}-${index}`} className="flex gap-3 rounded-xl bg-orange-50/70 px-4 py-3 text-stone-700">
                <span className="text-base font-semibold">
                  {ingredient.quantity} {ingredient.unit} {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
          {recipe.instructions && (
            <>
              <span className="mt-9 block text-xl font-bold text-stone-900">Instructions</span>
              <p className="mt-4 whitespace-pre-line leading-7 text-stone-700">{recipe.instructions}</p>
            </>
          )}
        </div>
      </div>
      <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white/80 p-5 shadow-sm sm:p-7 lg:col-span-2" aria-labelledby="tutorial-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">Watch and cook</span>
            <h2 id="tutorial-heading" className="mt-2 text-2xl font-black tracking-tight text-stone-900">Video tutorial</h2>
          </div>
          <a href={tutorialSearchUrl} target="_blank" rel="noreferrer" className="rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
            Find tutorials on YouTube <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="text-sm leading-6 text-stone-600">Open YouTube results for this recipe and choose a cooking tutorial you like.</p>
      </section>
    </div>
  );
}
