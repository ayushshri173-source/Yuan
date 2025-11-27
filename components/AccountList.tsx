import React, { useState } from 'react';
import { IndianAccount } from '../types';
import { Send, UserCheck, AlertCircle, Search, Plus } from 'lucide-react';

interface AccountListProps {
  accounts: IndianAccount[];
  onTransfer: (account: IndianAccount) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onTransfer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter(acc => 
    acc.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-xl font-bold text-white">Beneficiaries</h2>
            <p className="text-slate-400 text-sm">Manage your Indian bank accounts</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search name or bank..." 
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition-colors">
                <Plus size={18} />
                <span className="hidden md:inline">Add New</span>
            </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                <tr>
                    <th className="px-6 py-4 font-medium">Account Holder</th>
                    <th className="px-6 py-4 font-medium">Bank Details</th>
                    <th className="px-6 py-4 font-medium">IFSC Code</th>
                    <th className="px-6 py-4 font-medium text-center">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
                {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-slate-700/30 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                                    {account.accountHolderName.charAt(0)}
                                </div>
                                <span className="font-medium text-slate-200">{account.accountHolderName}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-slate-200">{account.bankName}</p>
                            <p className="text-xs text-slate-500">{account.accountNumber}</p>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-slate-400">
                            {account.ifscCode}
                        </td>
                        <td className="px-6 py-4 text-center">
                            {account.isVerified ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <UserCheck size={12} /> Verified
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <AlertCircle size={12} /> Pending
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => onTransfer(account)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-200 hover:text-white hover:bg-yellow-600 rounded-lg transition-all text-sm font-medium"
                            >
                                <Send size={14} /> Pay
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredAccounts.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                No accounts found matching your search.
            </div>
        )}
      </div>
    </div>
  );
};

export default AccountList;
