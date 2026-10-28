import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, EkamModule, Language } from '../types';
import { t } from '../utils/i18n';

interface AppContextType {
  state: AppState | null;
  loading: boolean;
  activeModule: EkamModule;
  setActiveModule: (mod: EkamModule) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
  refreshState: () => Promise<void>;
  aiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;
  aiMessages: { role: 'user' | 'assistant'; text: string }[];
  sendAiMessage: (prompt: string, moduleName: string) => Promise<void>;
  selectedItemDetail: any | null;
  setSelectedItemDetail: (item: any | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<EkamModule>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Namaste! I am your Ekam assistant. How can I help you today across Weddings, Deals, Carry, Books, Charge, or Build?' }
  ]);
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(null);

  const refreshState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.error('Failed to fetch app state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  const translate = (key: string) => t(language, key);

  const sendAiMessage = async (prompt: string, moduleName: string) => {
    if (!prompt.trim()) return;
    const newMsgs = [...aiMessages, { role: 'user' as const, text: prompt }];
    setAiMessages(newMsgs);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, moduleName })
      });
      const data = await res.json();
      setAiMessages([...newMsgs, { role: 'assistant', text: data.response || 'No response from assistant.' }]);
    } catch (err) {
      setAiMessages([...newMsgs, { role: 'assistant', text: 'Sorry, I encountered an error connecting to the AI advisor.' }]);
    }
  };

  return (
    <AppContext.Provider value={{
      state,
      loading,
      activeModule,
      setActiveModule,
      language,
      setLanguage,
      translate,
      refreshState,
      aiChatOpen,
      setAiChatOpen,
      aiMessages,
      sendAiMessage,
      selectedItemDetail,
      setSelectedItemDetail
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
