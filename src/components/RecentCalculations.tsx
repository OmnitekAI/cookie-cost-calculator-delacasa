
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculation } from '@/types/calculator';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface RecentCalculationsProps {
  calculations: Calculation[];
  onLoadCalculation: (calculation: Calculation) => void;
}

export const RecentCalculations: React.FC<RecentCalculationsProps> = ({
  calculations,
  onLoadCalculation
}) => {
  const { language } = useLanguage();
  
  if (calculations.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          {getTranslation('recentCalculations', language)}
        </h2>
        <p className="text-gray-500">
          {getTranslation('noSavedCalculations', language)}
        </p>
      </div>
    );
  }
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">
        {getTranslation('recentCalculations', language)}
      </h2>
      <div className="space-y-2">
        {calculations.map(calculation => (
          <div key={calculation.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
            <div>
              <h3 className="font-medium">
                {calculation.name} 
                <span className="text-gray-500 ml-2">
                  ({formatCurrency(calculation.costPerUnit)} / {getTranslation('costPerUnit', language)})
                </span>
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(calculation.updatedAt).toLocaleString()}
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onLoadCalculation(calculation)}
            >
              {getTranslation('loadCalculation', language)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
