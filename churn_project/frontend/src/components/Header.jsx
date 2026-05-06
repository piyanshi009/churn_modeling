import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-icon">
        <Activity size={32} color="#6366f1" />
      </div>
      <h1 className="title">Churn Intelligence</h1>
      <p className="subtitle">
        AI-Powered Predictive Customer Analytics
      </p>
    </header>
  );
}
