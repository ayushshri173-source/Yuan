export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export enum FundCategory {
  GAMING = 'Gaming Fund',
  STOCK = 'Stock Fund',
  CORPORATE = 'Corporate Saving',
  CURRENT = 'Current Account'
}

export interface Fund {
  id: string;
  name: string;
  category: FundCategory;
  balance: number;
  trend: 'up' | 'down' | 'neutral';
  percentageChange: number;
  description: string;
}

export interface IndianAccount {
  id: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string; // Last 4 digits visible
  ifscCode: string;
  type: 'Savings' | 'Current';
  isVerified: boolean;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
}
