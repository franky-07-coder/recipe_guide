const FORKIFY_BASE = "https://forkify-api.herokuapp.com/api/v2/recipes";
const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

async function getJson(url, signal) {
  const response = await fetch(url, { signal });
  const data = await response.json();
  if (!response.ok) throw new Error("Recipe service request failed.");
  return data;
}

export function normalizeMealDbRecipe(meal) {
  const ingredients = [];
  for (let index = 1; index <= 20; index += 1) {
    const description = meal[`strIngredient${index}`]?.trim();
    if (description) {
      ingredients.push({
        quantity: meal[`strMeasure${index}`]?.trim() || "",
        unit: "",
        description,
      });
    }
  }

  return {
    id: `mealdb-${meal.idMeal}`,
    title: meal.strMeal,
    publisher: meal.strArea || "TheMealDB",
    image_url: meal.strMealThumb,
    ingredients,
    instructions: meal.strInstructions,
    video_url: meal.strYoutube,
    source: "mealdb",
  };
}

export async function searchRecipes(query, signal) {
  const encodedQuery = encodeURIComponent(query);
  const [forkifyResult, mealNameResult, ingredientResult] = await Promise.allSettled([
    getJson(`${FORKIFY_BASE}?search=${encodedQuery}`, signal),
    getJson(`${MEALDB_BASE}/search.php?s=${encodedQuery}`, signal),
    getJson(`${MEALDB_BASE}/filter.php?i=${encodedQuery}`, signal),
  ]);

  const recipes = [];
  const seen = new Set();

  function add(recipe) {
    if (recipe?.id && !seen.has(recipe.id)) {
      seen.add(recipe.id);
      recipes.push(recipe);
    }
  }

  if (forkifyResult.status === "fulfilled") {
    (forkifyResult.value?.data?.recipes || []).forEach((recipe) =>
      add({ ...recipe, source: "forkify" })
    );
  }

  if (mealNameResult.status === "fulfilled") {
    (mealNameResult.value?.meals || []).forEach((meal) => add(normalizeMealDbRecipe(meal)));
  }

  if (ingredientResult.status === "fulfilled") {
    (ingredientResult.value?.meals || []).forEach((meal) =>
      add({
        id: `mealdb-${meal.idMeal}`,
        title: meal.strMeal,
        publisher: "TheMealDB",
        image_url: meal.strMealThumb,
        source: "mealdb",
      })
    );
  }

  if (
    recipes.length === 0 &&
    [forkifyResult, mealNameResult, ingredientResult].every((result) => result.status === "rejected")
  ) {
    throw new Error("Recipe services are unavailable.");
  }

  return recipes;
}

export async function getRecipeDetails(id, signal) {
  if (id.startsWith("mealdb-")) {
    const mealId = encodeURIComponent(id.slice("mealdb-".length));
    const data = await getJson(`${MEALDB_BASE}/lookup.php?i=${mealId}`, signal);
    const meal = data?.meals?.[0];
    if (!meal) throw new Error("Recipe not found.");
    return normalizeMealDbRecipe(meal);
  }

  const data = await getJson(`${FORKIFY_BASE}/${encodeURIComponent(id)}`, signal);
  if (!data?.data?.recipe) throw new Error("Recipe not found.");
  return { ...data.data.recipe, source: "forkify" };
}
