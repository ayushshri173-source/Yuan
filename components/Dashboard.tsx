import React from 'react';
import { Fund, Transaction } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, CreditCard, Shield } from 'lucide-react';

interface DashboardProps {
  funds: Fund[];
  transactions: Transaction[];
  totalBalance: number;
}

const data = [
  { name: 'Mon', value: 4000000 },
  { name: 'Tue', value: 4200000 },
  { name: 'Wed', value: 4100000 },
  { name: 'Thu', value: 4800000 },
  { name: 'Fri', value: 5000000 },
  { name: 'Sat', value: 5500000 },
  { name: 'Sun', value: 6935000 },
];

const Dashboard: React.FC<DashboardProps> = ({ funds, transactions, totalBalance }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet size={64} className="text-yellow-500" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Net Worth</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">₹{totalBalance.toLocaleString()}</span>
                <span className="text-emerald-400 text-sm flex items-center font-medium">
                    <ArrowUpRight size={16} className="mr-1" /> +12.5%
                </span>
            </div>
            <p className="text-slate-500 text-xs mt-2">Updated just now</p>
        </div>

        {/* Portfolio Health */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={64} className="text-blue-500" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Portfolio Health</h3>
            <div className="mt-2">
                <span className="text-3xl font-bold text-white">Excellent</span>
            </div>
             <p className="text-slate-500 text-xs mt-2">Risk Level: Moderate</p>
             <div className="w-full bg-slate-700 h-1.5 mt-4 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-[85%]"></div>
             </div>
        </div>

        {/* Security Status */}
         <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield size={64} className="text-emerald-500" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Security Status</h3>
            <div className="mt-2">
                <span className="text-3xl font-bold text-emerald-400">Verified</span>
            </div>
             <p className="text-slate-500 text-xs mt-2">2FA Active • KyC Verified</p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity size={20} className="text-yellow-500" />
                Asset Growth
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/100000}L`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#eab308' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
             <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-500" />
                Recent Activity
            </h3>
            <div className="space-y-4">
                {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${t.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {t.type === 'credit' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">{t.description}</p>
                                <p className="text-xs text-slate-500">{t.date}</p>
                            </div>
                        </div>
                        <span className={`text-sm font-bold ${t.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {t.type === 'credit' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                View All Transactions
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
