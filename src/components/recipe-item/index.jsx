import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <article className="group flex w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_16px_50px_-28px_rgba(41,37,36,0.42)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-24px_rgba(41,37,36,0.38)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src={item?.image_url}
          alt={item?.title || "Recipe"}
          loading="lazy"
          className="block h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-800 shadow-sm backdrop-blur">
          {item?.publisher || "From the kitchen"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-7 text-stone-900">
          {item?.title}
        </h3>
        <Link
          to={`/recipe-item/${item?.id}`}
          className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          View recipe <span aria-hidden="true" className="text-lg">↗</span>
        </Link>
      </div>
    </article>
  );
}
