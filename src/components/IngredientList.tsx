
import React from 'react';
import { Ingredient } from '@/types/calculator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface IngredientListProps {
  ingredients: Ingredient[];
  onRemoveIngredient: (id: string) => void;
  onUpdateIngredient: (ingredient: Ingredient) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onRemoveIngredient,
  onUpdateIngredient
}) => {
  const { language } = useLanguage();

  const handleIngredientChange = (
    id: string,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updatedIngredient = ingredients.find(ingredient => ingredient.id === id);
    
    if (updatedIngredient) {
      // Convert numeric string values to numbers
      const parsedValue = 
        field === 'name' || field === 'unit' 
          ? value 
          : typeof value === 'string' 
            ? parseFloat(value) || 0 
            : value;
            
      onUpdateIngredient({
        ...updatedIngredient,
        [field]: parsedValue
      });
    }
  };

  return (
    <div className="mt-4">
      {ingredients.length > 0 && (
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2">
              <span className="text-sm font-medium">
                {getTranslation('ingredientName', language)}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium">
                {getTranslation('ingredientQuantity', language)}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium">
                {getTranslation('unit', language)}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium">
                {getTranslation('pricePerUnit', language)}
              </span>
            </div>
            <div className="col-span-3">
              <span className="text-sm font-medium">
                {getTranslation('unitConversion', language)}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {ingredients.map((ingredient) => (
        <div 
          key={ingredient.id} 
          className="grid grid-cols-12 gap-2 items-center mt-2"
        >
          <div className="col-span-2">
            <Input
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}
              placeholder="Flour"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={ingredient.quantity || ''}
              onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', e.target.value)}
              placeholder="250"
              min={0}
              step="0.01"
            />
          </div>
          <div className="col-span-2">
            <Input
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(ingredient.id, 'unit', e.target.value)}
              placeholder="g"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={ingredient.pricePerUnit || ''}
              onChange={(e) => handleIngredientChange(ingredient.id, 'pricePerUnit', e.target.value)}
              placeholder="4.2"
              min={0}
              step="0.01"
            />
          </div>
          <div className="col-span-3">
            <Input
              type="number"
              value={ingredient.unitConversion || ''}
              onChange={(e) => handleIngredientChange(ingredient.id, 'unitConversion', e.target.value)}
              placeholder="1"
              min={0}
              step="0.01"
            />
          </div>
          <div className="col-span-1">
            <Button
              variant="destructive"
              className="w-full bg-cookies-red hover:bg-red-600"
              onClick={() => onRemoveIngredient(ingredient.id)}
            >
              {getTranslation('remove', language)}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
