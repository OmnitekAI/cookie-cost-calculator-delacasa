
import CookieCostCalculator from "@/components/CookieCostCalculator";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <LanguageProvider>
        <CookieCostCalculator />
      </LanguageProvider>
    </div>
  );
};

export default Index;
