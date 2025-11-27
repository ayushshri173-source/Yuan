import { Fund, FundCategory, IndianAccount, Transaction } from './types';

export const MOCK_ACCOUNTS: IndianAccount[] = [
  {
    id: '1',
    accountHolderName: 'Rajesh Kumar',
    bankName: 'HDFC Bank',
    accountNumber: '**** **** 4532',
    ifscCode: 'HDFC0001234',
    type: 'Savings',
    isVerified: true,
  },
  {
    id: '2',
    accountHolderName: 'Priya Singh',
    bankName: 'ICICI Bank',
    accountNumber: '**** **** 9821',
    ifscCode: 'ICIC0004321',
    type: 'Current',
    isVerified: true,
  },
  {
    id: '3',
    accountHolderName: 'Amitabh Bachchan Corp',
    bankName: 'SBI',
    accountNumber: '**** **** 1122',
    ifscCode: 'SBIN0001122',
    type: 'Current',
    isVerified: true,
  },
  {
    id: '4',
    accountHolderName: 'Sneha Gupta',
    bankName: 'Axis Bank',
    accountNumber: '**** **** 6754',
    ifscCode: 'UTIB0000675',
    type: 'Savings',
    isVerified: false,
  }
];

export const MOCK_FUNDS: Fund[] = [
  {
    id: 'f1',
    name: 'Esports Growth Alpha',
    category: FundCategory.GAMING,
    balance: 450000,
    trend: 'up',
    percentageChange: 12.5,
    description: 'High-yield portfolio in emerging gaming markets and metaverse assets.'
  },
  {
    id: 'f2',
    name: 'Nifty 50 Index Tracker',
    category: FundCategory.STOCK,
    balance: 1250000,
    trend: 'up',
    percentageChange: 4.2,
    description: 'Stable tracking of top 50 Indian companies.'
  },
  {
    id: 'f3',
    name: 'Tech Giant Reserves',
    category: FundCategory.CORPORATE,
    balance: 5000000,
    trend: 'neutral',
    percentageChange: 0.8,
    description: 'Low-risk corporate deposits for long-term operational security.'
  },
  {
    id: 'f4',
    name: 'Daily Operations',
    category: FundCategory.CURRENT,
    balance: 235000,
    trend: 'down',
    percentageChange: -1.5,
    description: 'Liquid funds for day-to-day transactional needs.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    type: 'debit',
    amount: 12000,
    description: 'Transfer to Rajesh Kumar',
    date: '2023-10-24',
    status: 'completed',
    recipient: 'Rajesh Kumar'
  },
  {
    id: 't2',
    type: 'credit',
    amount: 50000,
    description: 'Dividend Payout - Stock Fund',
    date: '2023-10-23',
    status: 'completed'
  },
  {
    id: 't3',
    type: 'debit',
    amount: 450,
    description: 'Server Maintenance Fee',
    date: '2023-10-22',
    status: 'pending'
  }
];
