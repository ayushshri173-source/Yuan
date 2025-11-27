import React, { useState } from 'react';
import { User, IndianAccount, Fund } from './types';
import { MOCK_ACCOUNTS, MOCK_FUNDS, MOCK_TRANSACTIONS } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FundSection from './components/FundSection';
import AccountList from './components/AccountList';
import AIAdvisor from './components/AIAdvisor';
import { Crown, LayoutDashboard, Wallet, Users, LogOut, Menu, X, Bell } from 'lucide-react';

type View = 'dashboard' | 'funds' | 'accounts';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleTransfer = (account: IndianAccount) => {
    alert(`Initiating transfer to ${account.accountHolderName} (${account.bankName})... \n\n(This is a UI demo)`);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'funds', label: 'My Funds', icon: Wallet },
    { id: 'accounts', label: 'Beneficiaries', icon: Users },
  ];

  const totalBalance = MOCK_FUNDS.reduce((acc, fund) => acc + fund.balance, 0);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-200 font-sans selection:bg-yellow-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 lg:transform-none flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-2 rounded-lg text-slate-900">
                <Crown size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">KingPay</span>
            <button className="ml-auto lg:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
            </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            setCurrentView(item.id as View);
                            setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            isActive 
                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <Icon size={20} />
                        {item.label}
                    </button>
                )
            })}
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full bg-slate-700" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg text-sm transition-colors"
            >
                <LogOut size={16} />
                Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <button 
                className="lg:hidden text-slate-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <Menu size={24} />
            </button>
            
            <h1 className="text-xl font-bold text-white capitalize ml-2 lg:ml-0">
                {currentView === 'funds' ? 'My Portfolio' : currentView}
            </h1>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
                    <Bell size={20} />
                    {notifications > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-slate-950"></span>
                    )}
                </button>
            </div>
        </header>

        {/* Content Body */}
        <div className="p-6 max-w-7xl mx-auto">
            {currentView === 'dashboard' && (
                <Dashboard 
                    funds={MOCK_FUNDS} 
                    transactions={MOCK_TRANSACTIONS} 
                    totalBalance={totalBalance}
                />
            )}
            {currentView === 'funds' && (
                <FundSection funds={MOCK_FUNDS} />
            )}
            {currentView === 'accounts' && (
                <AccountList accounts={MOCK_ACCOUNTS} onTransfer={handleTransfer} />
            )}
        </div>

        {/* AI Advisor Overlay */}
        <AIAdvisor funds={MOCK_FUNDS} transactions={MOCK_TRANSACTIONS} />
      </main>
    </div>
  );
};

export default App;
