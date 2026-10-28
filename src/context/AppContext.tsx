import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, EkamModule, Language } from '../types';
import { t } from '../utils/i18n';

interface AppContextType {
  state: AppState;
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

const initialMockState: AppState = {
  currentUser: {
    id: 'user_001',
    name: 'Aarav Deshmukh',
    email: 'aarav.deshmukh@ekam.in',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra',
    role: 'Customer / Planner',
    credits: 150,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  weddings: [
    {
      id: 'wed_01',
      title: 'Deshmukh & Kulkarni Wedding Celebration',
      couple: 'Aarav & Rutuja',
      date: '2026-12-15',
      location: 'JW Marriott, Senapati Bapat Road, Pune',
      budget: 2500000,
      expectedGuests: 400,
      confirmedGuests: 280,
      noShowRiskBuffer: 60,
      foodWastageSavedINR: 85000,
      functions: [
        { id: 'fn_01', name: 'Sangeet Night', date: '2026-12-14', time: '19:00', venue: 'Grand Ballroom, JW Marriott Pune', rsvpCount: 280, vegCount: 180, nonVegCount: 100 },
        { id: 'fn_02', name: 'Traditional Wedding Ceremony', date: '2026-12-15', time: '09:30', venue: 'Royal Lawn, Koregaon Park, Pune', rsvpCount: 320, vegCount: 210, nonVegCount: 110 },
        { id: 'fn_03', name: 'Reception Banquet', date: '2026-12-15', time: '19:30', venue: 'The Taj Mahal Palace, Colaba, Mumbai', rsvpCount: 340, vegCount: 220, nonVegCount: 120 }
      ],
      households: [
        { id: 'hh_01', name: 'Kulkarni Family (Nashik)', membersCount: 4, status: 'Confirmed', mealPref: 'Veg', arrivalTime: '2026-12-14 14:00' },
        { id: 'hh_02', name: 'Patil Group (Nagpur)', membersCount: 3, status: 'Confirmed', mealPref: 'Jain', arrivalTime: '2026-12-14 18:00' },
        { id: 'hh_03', name: 'Joshi Family (Thane)', membersCount: 2, status: 'Pending', mealPref: 'Non-Veg', arrivalTime: 'TBD' }
      ]
    }
  ],
  deals: [
    {
      id: 'deal_01',
      title: 'Electric SUV / Sedan Maharashtra Group Buy (Tata Nexon EV / Mahindra BE.6)',
      category: 'Passenger Vehicles',
      targetCohort: 20,
      joinedCount: 16,
      estimatedSaving: '₹1,25,000 + Free Wall Charger',
      status: 'Active Deal Negotiation',
      description: 'Avoid dealership discount haggling across Pune and Mumbai showrooms. 20 buyers combined approach dealers for wholesale pricing.',
      suppliers: [
        { name: 'Arya Motors Pune (SB Road)', quotedPrice: 1650000, discount: 'Free ceramic coating + 3yr maintenance + Free Wall Box' },
        { name: 'Concorde Motors Mumbai (Worli)', quotedPrice: 1675000, discount: 'Cash discount ₹50,000 + Extended Warranty' }
      ],
      endDate: '2026-11-30'
    },
    {
      id: 'deal_02',
      title: 'Konkan Organic Alphonso Mangoes & Agro-Staples Bulk Cohort',
      category: 'Groceries & Staples',
      targetCohort: 50,
      joinedCount: 42,
      estimatedSaving: '₹3,500 monthly saving per household',
      status: 'Active Cohort',
      description: 'Direct farm-to-doorstep bulk purchase of Kolhapur jaggery, Wada Kolam rice, and Konkan produce.',
      suppliers: [
        { name: 'Maharashtra Farmers Direct Collective', quotedPrice: 4200, discount: 'Direct wholesale pricing (28% off retail)' }
      ],
      endDate: '2026-11-05'
    }
  ],
  carry: [
    {
      id: 'carry_01',
      itemTitle: 'MacBook Pro M3 Max (Sealed Box from Apple SFO)',
      category: 'Electronics & Gadgets',
      route: 'San Francisco (SFO) to Mumbai (BOM)',
      travellerName: 'Vikram Deshmukh (Frequent Flyer, 4.9⭐)',
      reward: '₹5,000 suitcase side-hustle tip + verified trust',
      status: 'Matched & In Transit',
      description: 'Bringing requested tech gadget legally from US to Mumbai airport terminal.'
    },
    {
      id: 'carry_02',
      itemTitle: 'Authentic Paithani Silk Saree',
      category: 'Apparel & Handlooms',
      route: 'Yeola (Nashik) to Pune (FC Road)',
      travellerName: 'Aniket Kulkarni',
      reward: '₹1,200 tip',
      status: 'Looking for Traveller',
      description: 'Direct handloom courier via trusted inter-city commuter.'
    }
  ],
  books: [
    {
      id: 'book_01',
      title: 'Chhava (Historical Epic Novel on Chhatrapati Sambhaji Maharaj)',
      author: 'Shivaji Sawant',
      edition: 'Standard Edition',
      condition: 'Like New',
      location: 'FC Road, Pune',
      creditValue: 25,
      price: '₹350 or 25 Credits',
      owner: 'Aarav Deshmukh',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'book_02',
      title: 'Mrutyunjay (Epic Novel on Karna)',
      author: 'Shivaji Sawant',
      edition: 'Collector’s Edition',
      condition: 'Good',
      location: 'Dadar West, Mumbai',
      creditValue: 40,
      price: '₹450 or 40 Credits',
      owner: 'Rutuja Joshi',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'book_03',
      title: 'Panipat (Historical Novel)',
      author: 'Vishwas Patil',
      edition: 'Paperback',
      condition: 'Fair',
      location: 'CIDCO, Nashik',
      creditValue: 20,
      price: '₹250 or 20 Credits',
      owner: 'Siddhesh Patil',
      status: 'Reserved',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'
    }
  ],
  charge: [
    {
      id: 'chg_01',
      title: 'Koregaon Park Home EV Charger (7.4 kW AC)',
      connector: 'Type 2 / Bharat AC001',
      owner: 'Mr. R. K. Joshi (Koregaon Park Resident)',
      rate: '₹14 / kWh (Save ₹6 vs commercial DC fast chargers)',
      location: 'North Main Road, Koregaon Park, Pune',
      status: 'Available Now',
      rating: 4.9,
      batteryEmergencyHelp: 'Saved 5 EV owners stranded with low battery in Pune East!',
      slots: ['09:00 AM - 11:00 AM', '02:00 PM - 04:00 PM', '06:00 PM - 08:00 PM', '10:00 PM - 06:00 AM (Overnight)']
    },
    {
      id: 'chg_02',
      title: 'Bandra West Resident EV Hub',
      connector: 'CCS-2 (Fast AC 11kW)',
      owner: 'Sameer Kulkarni',
      rate: '₹15 / kWh',
      location: 'Linking Road, Bandra West, Mumbai',
      status: 'In Use',
      rating: 4.7,
      batteryEmergencyHelp: 'Reliable weekend top-up station in Mumbai.',
      slots: ['01:00 PM - 03:00 PM', '05:00 PM - 07:00 PM']
    }
  ],
  build: [
    {
      id: 'build_01',
      title: 'Surplus Vitrified Anti-Skid Tiles (600x600mm)',
      category: 'Tiles & Flooring',
      quantity: '37 Unused Boxes (592 sq.ft)',
      condition: 'Unopened Factory Packaging (Hinjewadi IT Park Project Surplus)',
      price: '₹45 / sq.ft (65% off retail market price)',
      location: 'Hinjewadi Phase 1, Pune',
      seller: 'L&T Construction Maharashtra Yard',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'build_02',
      title: 'Extra Bags of OPC 53 Grade Cement & Teak Beams',
      category: 'Cement & Timber',
      quantity: '12 Bags Cement + 4 Burma Teak Scantlings',
      condition: 'Fresh Stock (Stored Dry)',
      price: '₹320 / bag & ₹150/sq.ft',
      location: 'Thane West, Mumbai Metropolitan Region',
      seller: 'Godrej Builders Surplus',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f249e?auto=format&fit=crop&w=400&q=80'
    }
  ],
  notifications: [
    { id: 'not_01', title: 'Wedding RSVP Confirmed (Pune)', message: 'Kulkarni Family confirmed 4 attendees for the Traditional Wedding Ceremony.', time: '10 mins ago', read: false, module: 'weddings' },
    { id: 'not_02', title: 'Maharashtra EV Deal Update', message: '2 new buyers joined the Pune/Mumbai SUV cohort. Total dealer discount negotiated: ₹1.25 Lakh!', time: '1 hour ago', read: false, module: 'deals' },
    { id: 'not_03', title: 'Battery Rescue Alert', message: 'Koregaon Park host accepted your EV charging slot request. Range anxiety averted!', time: '2 hours ago', read: false, module: 'charge' },
    { id: 'not_04', title: 'Surplus Material Reserved', message: 'Contractor requested 37 unused tile boxes in Hinjewadi. ₹18,000 saved from waste!', time: '5 hours ago', read: true, module: 'build' }
  ],
  adminStats: {
    totalUsers: 24850,
    activeListings: 3140,
    transactionsToday: 582,
    disputesPending: 1,
    platformVolumeINR: '3.45 Cr'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialMockState);
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState<EkamModule>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Namaste! I am your Ekam Maharashtra assistant. How can I help you today across Weddings, Deals, Carry, Books, Charge, or Build?' }
  ]);
  const [selectedItemDetail, setSelectedItemDetail] = useState<any | null>(null);

  const refreshState = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const data = await res.json();
        setState(data);
      }
    } catch (err) {
      console.warn('Backend server not connected (static hosting mode), using local resilient state.');
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
      if (res.ok) {
        const data = await res.json();
        setAiMessages([...newMsgs, { role: 'assistant', text: data.response || 'No response from assistant.' }]);
        return;
      }
    } catch (err) {
      // Fallback
    }

    setAiMessages([...newMsgs, { role: 'assistant', text: `[Ekam Maharashtra AI Advisor] Based on Maharashtra market standards, I recommend verifying local supplier terms, checking regional transport logistics, and confirming all transaction details securely.` }]);
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
