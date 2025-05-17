
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface CostDisplayProps {
  costPerUnit: number;
}

export const CostDisplay: React.FC<CostDisplayProps> = ({ costPerUnit }) => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded">
      <p className="text-lg font-semibold">
        {getTranslation('costPerUnit', language)}: ${costPerUnit.toFixed(2)}
      </p>
    </div>
  );
};
