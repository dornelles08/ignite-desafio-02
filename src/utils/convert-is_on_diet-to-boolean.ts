export default function ConvertIsOnDietToBoolena(meal) {
  meal.is_on_diet = meal.is_on_diet === 1 ? true : false;

  return meal;
}
