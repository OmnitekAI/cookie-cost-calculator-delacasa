
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculation, Ingredient, Language } from '@/types/calculator';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { saveCalculation, getRecentCalculations } from '@/utils/storage';
import { CalculationHeader } from './CalculationHeader';
import { IngredientList } from './IngredientList';
import { RecentCalculations } from './RecentCalculations';
import { MenuBar } from './MenuBar';

const CookieCostCalculator: React.FC = () => {
  const { language } = useLanguage();
  
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
  
  // Dialogs state
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [confirmLoadDialogOpen, setConfirmLoadDialogOpen] = useState(false);
  const [calculationToLoad, setCalculationToLoad] = useState<Calculation | null>(null);
  
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
  
  const handleSave = () => {
    if (!currentCalculation.name.trim()) {
      // Open dialog to ask for name
      setNameDialogOpen(true);
      return;
    }
    
    // Save calculation
    const calculationToSave = {
      ...currentCalculation,
      updatedAt: new Date().toISOString()
    };
    
    saveCalculation(calculationToSave);
    loadRecentCalculations(); // Refresh the list
  };
  
  const handleSaveAs = () => {
    // Always show the name dialog for "Save As"
    setNameDialogOpen(true);
  };
  
  const handleNameDialogSave = (name: string) => {
    if (name.trim()) {
      const calculationToSave = {
        ...currentCalculation,
        id: uuidv4(), // New ID for "Save As"
        name,
        updatedAt: new Date().toISOString()
      };
      
      saveCalculation(calculationToSave);
      setCurrentCalculation(calculationToSave); // Update current calculation
      loadRecentCalculations();
    }
    
    setNameDialogOpen(false);
  };
  
  const handleLoadCalculation = (calculation: Calculation) => {
    setCalculationToLoad(calculation);
    setConfirmLoadDialogOpen(true);
  };
  
  const confirmLoadCalculation = () => {
    if (calculationToLoad) {
      setCurrentCalculation(calculationToLoad);
    }
    setConfirmLoadDialogOpen(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {getTranslation('cookieCostCalculator', language)}
        </h1>
        <MenuBar onCalculationsUpdate={loadRecentCalculations} />
      </div>
      
      <CalculationHeader
        name={currentCalculation.name}
        numCookies={currentCalculation.numCookiesInBatch}
        cookingTime={currentCalculation.cookingTime || 0}
        onNameChange={handleNameChange}
        onNumCookiesChange={handleNumCookiesChange}
        onCookingTimeChange={handleCookingTimeChange}
      />
      
      <IngredientList
        ingredients={currentCalculation.ingredients}
        onRemoveIngredient={handleRemoveIngredient}
        onUpdateIngredient={handleUpdateIngredient}
      />
      
      <div className="flex justify-between mt-4">
        <Button
          onClick={handleAddIngredient}
          className="bg-cookies-blue hover:bg-blue-600"
        >
          {getTranslation('addIngredient', language)}
        </Button>
        
        <Button
          onClick={calculateCost}
          className="bg-cookies-green hover:bg-green-600"
        >
          {getTranslation('calculateCost', language)}
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="text-lg font-semibold">
          {getTranslation('costPerUnit', language)}: ${currentCalculation.costPerUnit.toFixed(2)}
        </p>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave}>
          {getTranslation('save', language)}
        </Button>
        <Button onClick={handleSaveAs} variant="outline">
          {getTranslation('saveAs', language)}
        </Button>
      </div>
      
      <RecentCalculations
        calculations={recentCalculations}
        onLoadCalculation={handleLoadCalculation}
      />
      
      {/* Name dialog */}
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getTranslation('enterName', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('nameRequired', language)}
            </DialogDescription>
          </DialogHeader>
          <Input
            defaultValue={currentCalculation.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={getTranslation('name', language)}
          />
          <DialogFooter>
            <Button 
              onClick={() => handleNameDialogSave(currentCalculation.name)}
              disabled={!currentCalculation.name.trim()}
            >
              {getTranslation('save', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm load dialog */}
      <Dialog open={confirmLoadDialogOpen} onOpenChange={setConfirmLoadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getTranslation('loadCalculation', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('confirmLoad', language)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmLoadDialogOpen(false)}>
              {getTranslation('cancel', language)}
            </Button>
            <Button onClick={confirmLoadCalculation}>
              {getTranslation('ok', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CookieCostCalculator;
