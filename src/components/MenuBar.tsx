
import React, { useState, useRef } from 'react';
import { Menu, Languages } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { exportCalculations, importCalculations } from '@/utils/storage';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface MenuBarProps {
  onCalculationsUpdate: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onCalculationsUpdate }) => {
  const { language, setLanguage } = useLanguage();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importData, setImportData] = useState('');
  const [exportData, setExportData] = useState('');
  
  // Reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleExport = () => {
    const data = exportCalculations();
    setExportData(data);
    setExportDialogOpen(true);
  };
  
  const handleImportClick = () => {
    setImportDialogOpen(true);
  };
  
  const handleImportFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImportData(event.target.result.toString());
      }
    };
    reader.readAsText(file);
  };
  
  const handleImportConfirm = () => {
    const success = importCalculations(importData);
    if (success) {
      toast.success(getTranslation('importSuccess', language));
      onCalculationsUpdate();
      setImportDialogOpen(false);
      setImportData('');
    } else {
      toast.error(getTranslation('invalidImportData', language));
    }
  };
  
  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportData);
    toast.success(getTranslation('exportSuccess', language));
    setExportDialogOpen(false);
  };
  
  const handleDownloadExport = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'delacasa_cookie_calculations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(getTranslation('exportSuccess', language));
    setExportDialogOpen(false);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={toggleLanguage} 
        variant="outline" 
        size="sm"
        className="flex gap-1 items-center"
      >
        <Languages size={16} />
        {language === 'en' ? 'EN' : 'ES'}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleImportClick}>
            {getTranslation('importData', language)}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExport}>
            {getTranslation('exportData', language)}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleLanguage}>
            {language === 'en' 
              ? getTranslation('spanish', language) 
              : getTranslation('english', language)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".json" 
        className="hidden" 
      />
      
      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getTranslation('importData', language)}</DialogTitle>
            <DialogDescription>
              Paste JSON data or select a file to import.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleImportFile} variant="outline" className="w-full">
              Select File
            </Button>
            <Textarea 
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste JSON data here..."
              rows={8}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              {getTranslation('cancel', language)}
            </Button>
            <Button onClick={handleImportConfirm} disabled={!importData.trim()}>
              {getTranslation('importData', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getTranslation('exportData', language)}</DialogTitle>
            <DialogDescription>
              Copy the data or download as a file.
            </DialogDescription>
          </DialogHeader>
          <Textarea 
            value={exportData}
            readOnly
            rows={8}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleCopyExport}>
              Copy to Clipboard
            </Button>
            <Button onClick={handleDownloadExport}>
              Download as File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
