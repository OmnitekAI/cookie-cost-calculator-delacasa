
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Share, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalculationActionsProps {
  onAddIngredient: () => void;
  onCalculateCost: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onShare: () => void;
  onNew: () => void;
}

export const CalculationActions: React.FC<CalculationActionsProps> = ({
  onAddIngredient,
  onCalculateCost,
  onSave,
  onSaveAs,
  onShare,
  onNew
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
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
        <Button onClick={onNew} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          {getTranslation('new', language)}
        </Button>
        <Button onClick={onSave}>
          {getTranslation('save', language)}
        </Button>
        <Button onClick={onSaveAs} variant="outline">
          {getTranslation('saveAs', language)}
        </Button>
        <Button onClick={onShare} variant="secondary">
          <Share className="mr-2 h-4 w-4" />
          {getTranslation('share', language)}
        </Button>
      </div>
    </div>
  );
};
