import type { Category } from "@shared";

export const filterCategories = (categories?: Category[]) =>
  categories?.filter(c => c.name !== "No category");
