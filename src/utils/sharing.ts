
import { Calculation } from '@/types/calculator';

// Encode a calculation object to a URL-safe string
export const encodeCalculation = (calculation: Calculation): string => {
  // Create a simplified version of the calculation without the id
  const shareableCalculation = {
    name: calculation.name,
    numCookiesInBatch: calculation.numCookiesInBatch,
    cookingTime: calculation.cookingTime,
    ingredients: calculation.ingredients.map(ing => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
      pricePerUnit: ing.pricePerUnit
    })),
    costPerUnit: calculation.costPerUnit
  };
  
  try {
    const jsonString = JSON.stringify(shareableCalculation);
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error('Error encoding calculation:', error);
    return '';
  }
};

// Decode a URL-safe string back to a calculation object
export const decodeCalculation = (encodedString: string): Calculation | null => {
  try {
    const jsonString = decodeURIComponent(atob(encodedString));
    const decodedData = JSON.parse(jsonString);
    
    // Generate new IDs for the calculation and ingredients
    const calculation: Calculation = {
      id: crypto.randomUUID(), // Using crypto.randomUUID instead of uuid for simplicity
      name: decodedData.name || 'Shared Calculation',
      numCookiesInBatch: decodedData.numCookiesInBatch || 16,
      cookingTime: decodedData.cookingTime || 0,
      ingredients: (decodedData.ingredients || []).map((ing: any) => ({
        id: crypto.randomUUID(),
        name: ing.name || '',
        quantity: ing.quantity || 0,
        unit: ing.unit || 'g',
        pricePerUnit: ing.pricePerUnit || 0
      })),
      costPerUnit: decodedData.costPerUnit || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return calculation;
  } catch (error) {
    console.error('Error decoding calculation:', error);
    return null;
  }
};

// Create a shareable URL with the calculation encoded in the hash
export const createShareableLink = (calculation: Calculation): string => {
  const baseUrl = window.location.origin;
  const encodedCalculation = encodeCalculation(calculation);
  return `${baseUrl}/?share=${encodedCalculation}`;
};

// Get the encoded calculation from the URL if present
export const getSharedCalculationFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('share');
};
