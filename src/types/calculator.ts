
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  unitConversion?: number;
}

export interface Calculation {
  id: string;
  name: string;
  numCookiesInBatch: number;
  cookingTime?: number;
  ingredients: Ingredient[];
  costPerUnit: number;
  createdAt: string;
  updatedAt: string;
}

export type Language = 'en' | 'es';
