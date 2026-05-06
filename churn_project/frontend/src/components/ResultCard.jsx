import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  const prob = result.probability;
  let riskData;

  if (prob < 0.35) {
    riskData = {
      className: 'risk-low',
      title: 'Customer is Secure',
      icon: <ShieldCheck size={36} />,
      message: 'This customer shows stable engagement and loyalty.',
      action: false
    };
  } else if (prob <= 0.65) {
    riskData = {
      className: 'risk-medium',
      title: 'Customer Needs Attention',
      icon: <AlertTriangle size={36} />,
      message: 'Moderate churn indicators detected.',
      action: true
    };
  } else {
    riskData = {
      className: 'risk-high',
      title: 'Customer is Likely to Churn',
      icon: <ShieldAlert size={36} />,
      message: 'High churn risk detected.',
      action: true
    };
  }

  // Calculate SVG stroke dashes for the semi-circle
  const radius = 80;
  const circumference = Math.PI * radius; // Semi-circle path length
  const dashOffset = circumference * (1 - prob);

  return (
    <div className={`result-container slide-up ${riskData.className}`}>
      <div className="result-header">
        {riskData.icon}
        <h2>{riskData.title}</h2>
      </div>

      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          <path
            className="gauge-bg"
            fill="none"
            d="M 20 100 A 80 80 0 0 1 180 100"
          />
          <path
            className="gauge-fill"
            fill="none"
            d="M 20 100 A 80 80 0 0 1 180 100"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="gauge-value">
          <span className="percent">{(prob * 100).toFixed(1)}</span>
          <span className="symbol">%</span>
        </div>
        <div className="gauge-label">
          Probability
        </div>
      </div>

      <div className="result-details">
        <p>{riskData.message}</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button className="btn-secondary" onClick={onReset} style={{ width: 'auto' }}>
            <ArrowLeft size={16} /> Evaluate Another
          </button>
        </div>
      </div>
    </div>
  );
}
