import React from 'react';
import { Fund, FundCategory } from '../types';
import { Gamepad2, TrendingUp, Building2, Briefcase } from 'lucide-react';

interface FundSectionProps {
  funds: Fund[];
}

const FundSection: React.FC<FundSectionProps> = ({ funds }) => {
  const getIcon = (category: FundCategory) => {
    switch (category) {
        case FundCategory.GAMING: return <Gamepad2 size={24} className="text-purple-500" />;
        case FundCategory.STOCK: return <TrendingUp size={24} className="text-emerald-500" />;
        case FundCategory.CORPORATE: return <Building2 size={24} className="text-blue-500" />;
        case FundCategory.CURRENT: return <Briefcase size={24} className="text-orange-500" />;
        default: return <Briefcase size={24} />;
    }
  };

  const getGradient = (category: FundCategory) => {
     switch (category) {
        case FundCategory.GAMING: return 'from-purple-500/20 to-indigo-500/5';
        case FundCategory.STOCK: return 'from-emerald-500/20 to-teal-500/5';
        case FundCategory.CORPORATE: return 'from-blue-500/20 to-cyan-500/5';
        case FundCategory.CURRENT: return 'from-orange-500/20 to-red-500/5';
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {funds.map((fund) => (
            <div key={fund.id} className="relative group bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-all duration-300">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(fund.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 shadow-sm">
                            {getIcon(fund.category)}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${fund.trend === 'up' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-rose-400 border-rose-500/30 bg-rose-500/10'}`}>
                            {fund.percentageChange > 0 ? '+' : ''}{fund.percentageChange}%
                        </div>
                    </div>
                    
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">{fund.category}</h3>
                    <h2 className="text-2xl font-bold text-white mb-2">{fund.name}</h2>
                    <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{fund.description}</p>
                    
                    <div className="flex items-end justify-between border-t border-slate-700 pt-4">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Available Balance</p>
                            <p className="text-xl font-bold text-white">₹{fund.balance.toLocaleString()}</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors font-medium">
                            Manage
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
};

export default FundSection;
