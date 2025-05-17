
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Calculation, Ingredient } from '@/types/calculator';
import { saveCalculation, getRecentCalculations } from '@/utils/storage';

export const useCalculation = () => {
  // Current calculation state
  const [currentCalculation, setCurrentCalculation] = useState<Calculation>({
    id: uuidv4(),
    name: '',
    numCookiesInBatch: 16,
    cookingTime: 0,
    ingredients: [],
    costPerUnit: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  
  const [recentCalculations, setRecentCalculations] = useState<Calculation[]>([]);
  
  useEffect(() => {
    // Load recent calculations on mount
    loadRecentCalculations();
  }, []);
  
  const loadRecentCalculations = () => {
    const recent = getRecentCalculations();
    setRecentCalculations(recent);
  };
  
  const handleNameChange = (name: string) => {
    setCurrentCalculation(prev => ({ ...prev, name }));
  };
  
  const handleNumCookiesChange = (value: string) => {
    const numCookies = parseInt(value, 10) || 0;
    setCurrentCalculation(prev => ({ ...prev, numCookiesInBatch: numCookies }));
  };
  
  const handleCookingTimeChange = (value: string) => {
    const cookingTime = parseInt(value, 10) || 0;
    setCurrentCalculation(prev => ({ ...prev, cookingTime }));
  };
  
  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: uuidv4(),
      name: '',
      quantity: 0,
      unit: 'g',
      pricePerUnit: 0,
    };
    
    setCurrentCalculation(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };
  
  const handleRemoveIngredient = (id: string) => {
    setCurrentCalculation(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i.id !== id)
    }));
  };
  
  const handleUpdateIngredient = (updatedIngredient: Ingredient) => {
    setCurrentCalculation(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(i => 
        i.id === updatedIngredient.id ? updatedIngredient : i
      )
    }));
  };
  
  const calculateCost = () => {
    let totalCost = 0;
    
    currentCalculation.ingredients.forEach(ingredient => {
      totalCost += ingredient.quantity * ingredient.pricePerUnit;
    });
    
    // Calculate per cookie/unit cost
    const costPerUnit = currentCalculation.numCookiesInBatch > 0 
      ? totalCost / currentCalculation.numCookiesInBatch 
      : 0;
    
    setCurrentCalculation(prev => ({
      ...prev,
      costPerUnit,
      updatedAt: new Date().toISOString()
    }));
  };
  
  return {
    currentCalculation,
    setCurrentCalculation,
    recentCalculations,
    loadRecentCalculations,
    handleNameChange,
    handleNumCookiesChange,
    handleCookingTimeChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleUpdateIngredient,
    calculateCost
  };
};
