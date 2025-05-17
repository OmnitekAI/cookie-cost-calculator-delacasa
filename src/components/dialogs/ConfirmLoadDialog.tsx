
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
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface ConfirmLoadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmLoadDialog: React.FC<ConfirmLoadDialogProps> = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  const { language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTranslation('loadCalculation', language)}</DialogTitle>
          <DialogDescription>
            {getTranslation('confirmLoad', language)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {getTranslation('cancel', language)}
          </Button>
          <Button onClick={onConfirm}>
            {getTranslation('ok', language)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
