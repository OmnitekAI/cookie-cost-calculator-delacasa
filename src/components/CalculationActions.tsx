
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface CalculationActionsProps {
  onAddIngredient: () => void;
  onCalculateCost: () => void;
  onSave: () => void;
  onSaveAs: () => void;
}

export const CalculationActions: React.FC<CalculationActionsProps> = ({
  onAddIngredient,
  onCalculateCost,
  onSave,
  onSaveAs
}) => {
  const { language } = useLanguage();
  
  return (
    <div>
      <div className="flex justify-between mt-4">
        <Button
          onClick={onAddIngredient}
          className="bg-cookies-blue hover:bg-blue-600"
        >
          {getTranslation('addIngredient', language)}
        </Button>
        
        <Button
          onClick={onCalculateCost}
          className="bg-cookies-green hover:bg-green-600"
        >
          {getTranslation('calculateCost', language)}
        </Button>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button onClick={onSave}>
          {getTranslation('save', language)}
        </Button>
        <Button onClick={onSaveAs} variant="outline">
          {getTranslation('saveAs', language)}
        </Button>
      </div>
    </div>
  );
};
