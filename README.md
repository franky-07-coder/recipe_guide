# 🍳 Recipe Guide

Recipe Guide is a **React-based recipe discovery web application** that allows users to search for recipes, view detailed recipe information, and save recipes to a favorites list.

The application uses the **Forkify API** to fetch recipe data and **React Context API** to manage application state across different pages.

## ✨ Features

- 🔍 **Recipe Search**
  - Search for recipes by entering an ingredient, dish, or food item.
  - Results are fetched dynamically from the Forkify API.

- 🍽️ **Recipe Results**
  - Displays recipe cards with:
    - Recipe image
    - Recipe title
    - Publisher
    - Recipe details button

- 📖 **Recipe Details**
  - View detailed information about a selected recipe.
  - Displays the recipe image, publisher, title, and ingredients.

- ❤️ **Favorites**
  - Add recipes to a favorites list.
  - Remove recipes from favorites.
  - View all saved recipes from the Favorites page.

- 🧭 **Client-Side Routing**
  - Separate routes for Home, Favorites, and Recipe Details.

## 🛠️ Technologies Used

- **React.js** - Frontend library
- **React Router DOM** - Client-side routing
- **React Context API** - Global state management
- **Tailwind CSS** - Styling and responsive UI
- **Forkify API** - Recipe data and search
- **JavaScript (ES6+)**
- **HTML5 / CSS3**

## 📂 Project Structure

```text
recipe_guide/
│
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── navbar/
│   │   │   └── index.jsx
│   │   └── recipe-item/
│   │       └── index.jsx
│   │
│   ├── context/
│   │   └── index.jsx
│   │
│   ├── pages/
│   │   ├── home/
│   │   │   └── index.jsx
│   │   ├── favorites/
│   │   │   └── index.jsx
│   │   └── details/
│   │       └── index.jsx
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
│
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/franky-07-coder/recipe_guide.git
```

Navigate to the project directory:

```bash
cd recipe_guide
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

## 🔄 How It Works

1. Enter a food item or ingredient in the search bar.
2. The application sends a request to the Forkify API.
3. Matching recipes are displayed as recipe cards.
4. Select **Recipe Details** to view the complete recipe information.
5. Add a recipe to **Favorites** if you want to save it.
6. Open the **Favorites** section to view saved recipes.

## 🧠 State Management

The application uses **React Context API** for centralized state management.

The global context manages:

- Search input
- Recipe search results
- Loading state
- Selected recipe details
- Favorites list

This allows different components and pages to access and update shared application data without passing props through multiple component levels.

## 🌐 API

Recipe data is provided by the **Forkify API**.

The application uses the API to:

- Search recipes
- Retrieve individual recipe details
- Fetch ingredient information

API endpoints used by the application include:

```text
https://forkify-api.herokuapp.com/api/v2/recipes?search={query}
```

and

```text
https://forkify-api.herokuapp.com/api/v2/recipes/{recipeId}
```

## 📱 Responsive Design

The interface uses Tailwind CSS utility classes to provide a responsive layout across different screen sizes, including desktop and mobile devices.

## 🧪 Testing

The project includes React Testing Library and Jest-based testing support.

Run the test suite with:

```bash
npm test
```

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

The production files will be generated in the `build` directory.

## 🚀 Deployment

The project includes GitHub Pages deployment support through the `gh-pages` package.

Build and deploy using:

```bash
npm run deploy
```

## 📌 Future Improvements

Potential improvements include:

- Persisting favorites using `localStorage`
- Adding recipe categories and filters
- Adding pagination or infinite scrolling
- Improving loading and error states
- Adding more detailed recipe information
- Improving accessibility
- Adding authentication and user-specific favorites

## 👨‍💻 Author

**Francis**

A React-based project developed to practice API integration, component-based development, routing, and global state management.

---

⭐ If you found this project useful, feel free to explore the repository and try it yourself.