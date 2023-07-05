export default function ConvertIsInDietToBoolena(meal) {
  meal.is_in_diet = meal.is_in_diet === 1 ? true : false;

  return meal;
}
