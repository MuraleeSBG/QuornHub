export const tags = [
  "Gluten Free",
  "Vegan",
  "Nut Free",
  "Lactose Free",
  "< 15 Minutes",
];

export const getTags = (recipe) => {
  const tags = [];
  if (recipe.isLactoseFree) {
    tags.push("Lactose Free");
  }
  if (recipe.isVegan) {
    tags.push("Vegan");
  }
  if (recipe.isGlutenFree) {
    tags.push("Gluten Free");
  }
  if (recipe.isDairyFree) {
    tags.push("Dairy Free");
  }
  if (recipe.isNutFree) {
    tags.push("Nut Free");
  }
  return tags;
};
