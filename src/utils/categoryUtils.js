export const CATEGORIES = {
  BOOKS: "Books",
  FILMS: "Films",
  NOTES: "Notes",
};

export const CATEGORY_COLORS = {
  [CATEGORIES.BOOKS]: "hsl(106, 47%, 64%)",
  [CATEGORIES.FILMS]: "hsl(196, 83%, 75%)",
  [CATEGORIES.NOTES]: "#ffd82b",
};

export const getCategoryFromPath = (path) => {
  const categories = Object.values(CATEGORIES);
  return (
    categories.find((category) => path.includes(category)) || CATEGORIES.NOTES
  );
};

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS[CATEGORIES.NOTES];
};
