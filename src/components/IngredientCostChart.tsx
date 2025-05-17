
import React from 'react';
import { Ingredient } from '@/types/calculator';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Cell, 
  ResponsiveContainer,
  LabelList,
  Legend
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface IngredientCostChartProps {
  ingredients: Ingredient[];
  totalCost: number;
}

const COLORS = [
  '#9b87f5', '#7E69AB', '#6E59A5', '#8B5CF6', 
  '#D946EF', '#F97316', '#1EAEDB', '#FEC6A1', 
  '#E5DEFF', '#FFDEE2', '#FDE1D3', '#D3E4FD'
];

export const IngredientCostChart: React.FC<IngredientCostChartProps> = ({ 
  ingredients, 
  totalCost 
}) => {
  const { language } = useLanguage();
  
  if (ingredients.length === 0 || totalCost === 0) {
    return (
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {getTranslation('ingredientCostBreakdown', language)}
        </h3>
        <p className="text-gray-500">
          {getTranslation('noIngredientsAdded', language)}
        </p>
      </div>
    );
  }
  
  // Calculate percentage contribution for each ingredient
  const data = ingredients.map((ingredient, index) => {
    const cost = ingredient.quantity * ingredient.pricePerUnit;
    const percentage = (cost / totalCost) * 100;
    
    return {
      name: ingredient.name || getTranslation('unnamedIngredient', language),
      value: percentage,
      cost: cost,
      fill: COLORS[index % COLORS.length],
    };
  }).sort((a, b) => b.value - a.value); // Sort by percentage descending
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="mt-6 mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {getTranslation('ingredientCostBreakdown', language)}
      </h3>
      
      {/* Stacked bar representation */}
      <div className="mb-4">
        <div className="flex h-8 w-full rounded-md overflow-hidden">
          {data.map((item, index) => (
            <div 
              key={`segment-${index}`}
              className="h-full flex items-center justify-center text-xs text-white font-medium"
              style={{ 
                backgroundColor: item.fill,
                width: `${item.value}%`,
                minWidth: item.value > 3 ? '3%' : '0'
              }}
              title={`${item.name}: ${item.value.toFixed(1)}% (${formatCurrency(item.cost)})`}
            >
              {item.value > 8 && item.name.substring(0, 6)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend with progress bars */}
      <div className="space-y-3">
        {data.map((item, index) => {
          // Create a custom style to set the indicator color inline
          const progressBarStyle = { 
            '--progress-color': item.fill 
          } as React.CSSProperties;
          
          return (
            <div key={`legend-${index}`} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {item.name}
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(item.cost)} ({item.value.toFixed(1)}%)
                </span>
              </div>
              <Progress
                value={item.value}
                className="h-2 bg-gray-100"
                style={progressBarStyle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
