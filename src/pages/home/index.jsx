import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { recipeList, loading, searchError, lastSearch, handleQuickSearch } = useContext(GlobalContext);

  if (loading) {
    return (
      <div className="mx-auto mt-16 max-w-7xl rounded-3xl border border-stone-200 bg-white/70 p-12 text-center" role="status">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">A moment in the kitchen</p>
        <p className="mt-3 text-2xl font-semibold text-stone-900">Finding recipes…</p>
      </div>
    );
  }

  if (searchError) {
    return (
      <p className="mx-auto mt-12 max-w-7xl rounded-2xl border border-red-200 bg-white/80 p-8 text-center text-lg text-red-700" role="alert">
        {searchError}
      </p>
    );
  }

  if (recipeList.length === 0) {
    if (lastSearch) {
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${lastSearch} recipe tutorial`)}`;

      return (
        <section className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-stone-200 bg-white/80 p-8 text-center shadow-sm sm:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Keep looking</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">No “{lastSearch}” recipes found here</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-600">Our recipe catalogs don’t have a match for this search yet. You can look for a cooking tutorial on YouTube instead.</p>
          <a href={youtubeSearchUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700">
            Search YouTube for {lastSearch} <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </section>
      );
    }

    return (
      <section className="mx-auto mt-6 grid max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_70px_-48px_rgba(41,37,36,0.5)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Good food starts here</p>
          <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-stone-900 sm:text-6xl">Find your next favorite <span className="text-orange-600">bite.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">Search by dish or ingredient and discover something delicious to make today.</p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-medium text-stone-600">
            {["Pasta", "Chicken", "Avocado", "Chocolate"].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleQuickSearch(suggestion)}
                className="rounded-full bg-orange-50 px-4 py-2 transition hover:bg-orange-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                Try {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[18rem] overflow-hidden bg-stone-200 sm:min-h-[26rem]">
          <img src={`${process.env.PUBLIC_URL}/recipe-hero.png`} alt="A bowl of golden rice with chicken, almonds and herbs" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/5 to-transparent" />
          <span className="absolute bottom-6 left-6 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-stone-800 backdrop-blur">Made for sharing</span>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl py-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Fresh inspiration</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900">Recipes to explore</h1>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipeList.map((item) => <RecipeItem key={item.id} item={item} />)}
      </div>
    </section>
  );
}
