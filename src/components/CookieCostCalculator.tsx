
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Calculation } from '@/types/calculator';
import { useLanguage } from '@/contexts/LanguageContext';
import { saveCalculation } from '@/utils/storage';
import { getTranslation } from '@/utils/translations';
import { CalculationHeader } from './CalculationHeader';
import { IngredientList } from './IngredientList';
import { RecentCalculations } from './RecentCalculations';
import { MenuBar } from './MenuBar';
import { NameDialog } from './dialogs/NameDialog';
import { ConfirmLoadDialog } from './dialogs/ConfirmLoadDialog';
import { CalculationActions } from './CalculationActions';
import { CostDisplay } from './CostDisplay';
import { useCalculation } from '@/hooks/useCalculation';
import { createShareableLink, decodeCalculation, getSharedCalculationFromUrl } from '@/utils/sharing';
import { useToast } from '@/hooks/use-toast';

const CookieCostCalculator: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const {
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
  } = useCalculation();
  
  // Dialogs state
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [confirmLoadDialogOpen, setConfirmLoadDialogOpen] = useState(false);
  const [calculationToLoad, setCalculationToLoad] = useState<Calculation | null>(null);
  
  // Check for shared calculation on component mount
  useEffect(() => {
    const sharedCalculationParam = getSharedCalculationFromUrl();
    if (sharedCalculationParam) {
      const decodedCalculation = decodeCalculation(sharedCalculationParam);
      if (decodedCalculation) {
        setCurrentCalculation(decodedCalculation);
        toast({
          title: getTranslation('sharedCalculationLoaded', language) || "Shared calculation loaded",
          description: decodedCalculation.name,
        });
      }
    }
  }, []);
  
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
  
  const handleShare = () => {
    // Generate shareable link
    const shareableLink = createShareableLink(currentCalculation);
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: getTranslation('linkCopied', language) || "Link copied to clipboard",
        description: getTranslation('shareDescription', language) || "Share this link to let others see your calculation",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      // Show the link in a dialog or alert as fallback
      toast({
        title: getTranslation('shareableLink', language) || "Shareable Link",
        description: shareableLink,
        variant: "destructive",
      });
    });
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
      
      <CalculationActions
        onAddIngredient={handleAddIngredient}
        onCalculateCost={calculateCost}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onShare={handleShare}
      />
      
      <CostDisplay costPerUnit={currentCalculation.costPerUnit} />
      
      <RecentCalculations
        calculations={recentCalculations}
        onLoadCalculation={handleLoadCalculation}
      />
      
      <NameDialog
        open={nameDialogOpen}
        onOpenChange={setNameDialogOpen}
        onSave={handleNameDialogSave}
        name={currentCalculation.name}
        onNameChange={handleNameChange}
      />
      
      <ConfirmLoadDialog
        open={confirmLoadDialogOpen}
        onOpenChange={setConfirmLoadDialogOpen}
        onConfirm={confirmLoadCalculation}
      />
    </div>
  );
};

export default CookieCostCalculator;
