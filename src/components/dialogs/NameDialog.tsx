
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface NameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
  name: string;
  onNameChange: (name: string) => void;
}

export const NameDialog: React.FC<NameDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  name,
  onNameChange
}) => {
  const { language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTranslation('enterName', language)}</DialogTitle>
          <DialogDescription>
            {getTranslation('nameRequired', language)}
          </DialogDescription>
        </DialogHeader>
        <Input
          defaultValue={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={getTranslation('name', language)}
        />
        <DialogFooter>
          <Button 
            onClick={() => onSave(name)}
            disabled={!name.trim()}
          >
            {getTranslation('save', language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
