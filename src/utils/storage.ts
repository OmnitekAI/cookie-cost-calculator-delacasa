
import { Calculation } from "@/types/calculator";

const STORAGE_KEY = 'delacasa_cookie_calculations';

export const saveCalculation = (calculation: Calculation): void => {
  try {
    const existingData = getCalculations();
    const existingIndex = existingData.findIndex(c => c.id === calculation.id);
    
    if (existingIndex !== -1) {
      // Update existing
      existingData[existingIndex] = calculation;
    } else {
      // Add new
      existingData.push(calculation);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error("Failed to save calculation:", error);
  }
};

export const getCalculations = (): Calculation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Calculation[];
  } catch (error) {
    console.error("Failed to get calculations:", error);
    return [];
  }
};

export const getRecentCalculations = (limit: number = 5): Calculation[] => {
  const calculations = getCalculations();
  
  // Sort by updatedAt date descending (most recent first)
  return calculations
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

export const exportCalculations = (): string => {
  const calculations = getCalculations();
  return JSON.stringify(calculations);
};

export const importCalculations = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    // Basic validation - check if it's an array of calculation-like objects
    if (!Array.isArray(data) || !data.every(isCalculationLike)) {
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, jsonData);
    return true;
  } catch (error) {
    console.error("Failed to import calculations:", error);
    return false;
  }
};

// Basic validation for imported data
const isCalculationLike = (obj: any): boolean => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.numCookiesInBatch === 'number' &&
    Array.isArray(obj.ingredients)
  );
};
