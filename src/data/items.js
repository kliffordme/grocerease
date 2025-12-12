import { normalizeCategory } from "../utils/normalizeCategory";

export const items = {
  [normalizeCategory("Beverages")]: [
    { id: 1, name: "Coke", price: 40 },
    { id: 2, name: "Sprite", price: 40 },
  ],

  [normalizeCategory("Grocery")]: [
    { id: 3, name: "Bread", price: 50 },
    { id: 4, name: "Rice", price: 60 },
  ],

  [normalizeCategory("Pharmacy")]: [
    { id: 5, name: "Biogesic", price: 8 },
    { id: 6, name: "Neozep", price: 10 },
  ],

  [normalizeCategory("Pets")]: [
    { id: 7, name: "Dog Food", price: 120 },
  ],

  [normalizeCategory("Appliances")]: [
    { id: 8, name: "Electric Fan", price: 1200 },
  ],

  [normalizeCategory("Healthy")]: [
    { id: 9, name: "Organic Juice", price: 150 },
  ],

  [normalizeCategory("Baby & Kids")]: [
    { id: 10, name: "Diapers", price: 250 },
  ],

  [normalizeCategory("Alcohol")]: [
    { id: 11, name: "Beer", price: 80 },
  ],
};
