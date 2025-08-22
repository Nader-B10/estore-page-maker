import React, { useState, useEffect } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface SaveIndicatorProps {
  lastSaved?: Date;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
}

export default function SaveIndicator({ lastSaved, isSaving, hasUnsavedChanges }: SaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (lastSaved && !isSaving) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved, isSaving]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
        <Clock className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">جاري الحفظ...</span>
      </div>
    );
  }

  if (showSaved && lastSaved) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
        <Check className="w-4 h-4" />
        <span className="text-sm font-medium">تم الحفظ {formatTime(lastSaved)}</span>
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">تغييرات غير محفوظة</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
        <Check className="w-4 h-4" />
        <span className="text-sm">آخر حفظ: {formatTime(lastSaved)}</span>
      </div>
    );
  }

  return null;
}