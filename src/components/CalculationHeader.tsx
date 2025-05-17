
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface CalculationHeaderProps {
  name: string;
  numCookies: number;
  cookingTime: number;
  onNameChange: (name: string) => void;
  onNumCookiesChange: (value: string) => void;
  onCookingTimeChange: (value: string) => void;
}

export const CalculationHeader: React.FC<CalculationHeaderProps> = ({
  name,
  numCookies,
  cookingTime,
  onNameChange,
  onNumCookiesChange,
  onCookingTimeChange
}) => {
  const { language } = useLanguage();

  return (
    <div className="grid gap-4 mb-6">
      <div>
        <Label htmlFor="recipe-name">{getTranslation('name', language)}</Label>
        <Input
          id="recipe-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Chocolate Chip Cookies"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="num-cookies">
            {getTranslation('numberOfCookiesInBatch', language)}
          </Label>
          <Input
            id="num-cookies"
            type="number"
            value={numCookies}
            onChange={(e) => onNumCookiesChange(e.target.value)}
            min={1}
          />
        </div>
        
        <div>
          <Label htmlFor="cooking-time">
            {getTranslation('cookingTime', language)} ({getTranslation('minutes', language)})
          </Label>
          <Input
            id="cooking-time"
            type="number"
            value={cookingTime}
            onChange={(e) => onCookingTimeChange(e.target.value)}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};
