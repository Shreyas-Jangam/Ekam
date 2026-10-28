/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { QuickNavPills } from './components/QuickNavPills';
import { BottomNav } from './components/BottomNav';
import { AISnippetAssistant } from './components/AISnippetAssistant';
import { HomeView } from './modules/HomeView';
import { ExploreView } from './modules/ExploreView';
import { ActivityView } from './modules/ActivityView';
import { NotificationsView } from './modules/NotificationsView';
import { ProfileView } from './modules/ProfileView';
import { AdminView } from './modules/AdminView';
import { WeddingsModule } from './modules/WeddingsModule';
import { DealsModule } from './modules/DealsModule';
import { CarryModule } from './modules/CarryModule';
import { BooksModule } from './modules/BooksModule';
import { ChargeModule } from './modules/ChargeModule';
import { BuildModule } from './modules/BuildModule';

const MainContent: React.FC = () => {
  const { activeModule, loading, state } = useApp();

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-2xl animate-spin shadow-lg shadow-orange-500/30">
          एक
        </div>
        <p className="text-sm font-medium text-slate-400 tracking-wider">Loading Ekam Ecosystem...</p>
      </div>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <HomeView />;
      case 'explore': return <ExploreView />;
      case 'activity': return <ActivityView />;
      case 'notifications': return <NotificationsView />;
      case 'profile': return <ProfileView />;
      case 'admin': return <AdminView />;
      case 'weddings': return <WeddingsModule />;
      case 'deals': return <DealsModule />;
      case 'carry': return <CarryModule />;
      case 'books': return <BooksModule />;
      case 'charge': return <ChargeModule />;
      case 'build': return <BuildModule />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white pb-20 md:pb-8">
      <Navbar />
      <QuickNavPills />
      <main className="flex-1">
        {renderModule()}
      </main>
      <BottomNav />
      <AISnippetAssistant />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
