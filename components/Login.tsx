import React, { useState } from 'react';
import { User } from '../types';
import { Crown, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    // Simulate API verification
    setTimeout(() => {
        setIsLoading(false);
        onLogin({
            id: 'u1',
            name: 'Vikram Roy',
            email: email,
            avatarUrl: 'https://picsum.photos/100/100'
        });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-yellow-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md relative z-10">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-900 mb-4 shadow-lg shadow-yellow-500/20">
                    <Crown size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">KingPay</h1>
                <p className="text-slate-400">Premium Wealth Management</p>
            </div>

            {step === 'email' ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sign in with Email</label>
                        <input 
                            type="email" 
                            required
                            placeholder="vikram@example.com"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {isLoading ? 'Sending...' : 'Continue'}
                        {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-600">Or continue with</span></div>
                    </div>

                    <button type="button" onClick={() => setStep('otp')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Google
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                     <div className="text-center mb-4">
                        <p className="text-slate-400 text-sm">We sent a verification code to <span className="text-white font-medium">{email}</span></p>
                     </div>
                    <div>
                        <input 
                            type="text" 
                            required
                            placeholder="1 2 3 4"
                            maxLength={4}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-center text-2xl font-bold tracking-[1em] text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Enter'}
                        {!isLoading && <CheckCircle2 size={18} />}
                    </button>

                    <button type="button" onClick={() => setStep('email')} className="w-full text-slate-500 hover:text-white text-sm transition-colors">
                        Change email address
                    </button>
                </form>
            )}
        </div>
    </div>
  );
};

export default Login;
