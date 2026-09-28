import { useContext } from "react";
import RecipeItem from "../../components/recipe-item";
import { GlobalContext } from "../../context";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <section className="mx-auto max-w-7xl py-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Your personal collection</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900">Favorite recipes</h1>
      {favoritesList.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritesList.map((item) => <RecipeItem key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="mt-7 rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-xl font-bold text-stone-900">Your collection is waiting.</p>
          <p className="mt-2 text-stone-600">Save recipes you love and they’ll be right here.</p>
        </div>
      )}
    </section>
  );
}
