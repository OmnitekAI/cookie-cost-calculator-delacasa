
import { Language } from "@/types/calculator";

type TranslationKey = 
  | 'cookieCostCalculator'
  | 'name'
  | 'numberOfCookiesInBatch'
  | 'cookingTime'
  | 'ingredientName'
  | 'ingredientQuantity'
  | 'unit'
  | 'pricePerUnit'
  | 'unitConversion'
  | 'remove'
  | 'addIngredient'
  | 'calculateCost'
  | 'costPerUnit'
  | 'save'
  | 'saveAs'
  | 'recentCalculations'
  | 'loadCalculation'
  | 'confirmLoad'
  | 'cancel'
  | 'english'
  | 'spanish'
  | 'menu'
  | 'importData'
  | 'exportData'
  | 'nameRequired'
  | 'enterName'
  | 'ok'
  | 'minutes'
  | 'noSavedCalculations'
  | 'importSuccess'
  | 'exportSuccess'
  | 'invalidImportData'
  | 'close';

type Translations = {
  [key in TranslationKey]: {
    en: string;
    es: string;
  }
};

export const translations: Translations = {
  cookieCostCalculator: {
    en: 'Cookie Cost Calculator',
    es: 'Calculadora de Costo de Galletas'
  },
  name: {
    en: 'Name',
    es: 'Nombre'
  },
  numberOfCookiesInBatch: {
    en: 'Number of Cookies in Batch',
    es: 'Número de Galletas en Lote'
  },
  cookingTime: {
    en: 'Cooking Time',
    es: 'Tiempo de Cocción'
  },
  ingredientName: {
    en: 'Ingredient Name',
    es: 'Nombre del Ingrediente'
  },
  ingredientQuantity: {
    en: 'Ingredient Quantity',
    es: 'Cantidad del Ingrediente'
  },
  unit: {
    en: 'Unit',
    es: 'Unidad'
  },
  pricePerUnit: {
    en: 'Price per Unit',
    es: 'Precio por Unidad'
  },
  unitConversion: {
    en: 'Unit Conversion',
    es: 'Conversión de Unidad'
  },
  remove: {
    en: 'Remove',
    es: 'Eliminar'
  },
  addIngredient: {
    en: 'Add Ingredient',
    es: 'Añadir Ingrediente'
  },
  calculateCost: {
    en: 'Calculate Cost',
    es: 'Calcular Costo'
  },
  costPerUnit: {
    en: 'Cost per Unit',
    es: 'Costo por Unidad'
  },
  save: {
    en: 'Save',
    es: 'Guardar'
  },
  saveAs: {
    en: 'Save As',
    es: 'Guardar Como'
  },
  recentCalculations: {
    en: 'Recent Calculations',
    es: 'Cálculos Recientes'
  },
  loadCalculation: {
    en: 'Load Calculation',
    es: 'Cargar Cálculo'
  },
  confirmLoad: {
    en: 'Are you sure you want to load this calculation? Unsaved changes will be lost.',
    es: '¿Estás seguro de que quieres cargar este cálculo? Los cambios no guardados se perderán.'
  },
  cancel: {
    en: 'Cancel',
    es: 'Cancelar'
  },
  english: {
    en: 'English',
    es: 'Inglés'
  },
  spanish: {
    en: 'Spanish',
    es: 'Español'
  },
  menu: {
    en: 'Menu',
    es: 'Menú'
  },
  importData: {
    en: 'Import Data',
    es: 'Importar Datos'
  },
  exportData: {
    en: 'Export Data',
    es: 'Exportar Datos'
  },
  nameRequired: {
    en: 'Please provide a name for this calculation to save it.',
    es: 'Por favor, proporciona un nombre para este cálculo para guardarlo.'
  },
  enterName: {
    en: 'Enter calculation name',
    es: 'Ingrese el nombre del cálculo'
  },
  ok: {
    en: 'OK',
    es: 'Aceptar'
  },
  minutes: {
    en: 'minutes',
    es: 'minutos'
  },
  noSavedCalculations: {
    en: 'No saved calculations',
    es: 'No hay cálculos guardados'
  },
  importSuccess: {
    en: 'Data imported successfully',
    es: 'Datos importados con éxito'
  },
  exportSuccess: {
    en: 'Data exported successfully',
    es: 'Datos exportados con éxito'
  },
  invalidImportData: {
    en: 'Invalid import data',
    es: 'Datos de importación no válidos'
  },
  close: {
    en: 'Close',
    es: 'Cerrar'
  }
};

export const getTranslation = (key: TranslationKey, language: Language): string => {
  return translations[key][language];
};
