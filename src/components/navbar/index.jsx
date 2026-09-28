import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit, loading } = useContext(GlobalContext);

  return (
    <nav className="mx-auto flex max-w-7xl flex-col items-center gap-5 py-6 sm:py-8 lg:flex-row lg:justify-between">
      <h2 className="text-2xl font-black tracking-tight text-stone-900">
        <NavLink to={"/"}><span className="mr-2 text-orange-600">✳</span>FoodRecipe</NavLink>
      </h2>
      <form onSubmit={handleSubmit} role="search" className="flex w-full max-w-xl rounded-full border border-stone-200 bg-white/90 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-orange-200">
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Search a dish or ingredient..."
          aria-label="Search recipes"
          className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={loading || !searchParam.trim()}
          className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
      <ul className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 p-1 text-sm font-semibold">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => `rounded-full px-4 py-2 transition ${isActive ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-950"}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className={({ isActive }) => `rounded-full px-4 py-2 capitalize transition ${isActive ? "bg-stone-900 text-white" : "text-stone-600 hover:text-stone-950"}`}
          >
            favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
