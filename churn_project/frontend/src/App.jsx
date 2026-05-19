import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';

function App() {

  const [formData, setFormData] = useState({
    Geography: "",
    Gender: "",
    Age: "",
    CreditScore: "",
    Balance: "",
    EstimatedSalary: "",
    Tenure: "",
    NumOfProducts: "",
    HasCrCard: "",
    IsActiveMember: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    // Convert numeric fields properly
    if (
      type === 'number' ||
      type === 'range' ||
      name === 'HasCrCard' ||
      name === 'IsActiveMember' ||
      name === 'NumOfProducts'
    ) {
      parsedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue
    }));

    // Hide previous result when inputs change
    setShowResult(false);
    setResult(null);

    if (error) setError(null);
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);
    setShowResult(false);

    // Validation check
    for (const key in formData) {
      if (formData[key] === "") {
        setError("Please fill all fields.");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('https://churn-modeling-3.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from the server.');
      }

      const data = await response.json();

      setResult(data);
      setShowResult(true);

    } catch (err) {

      setError(
        err.message ||
        'An error occurred while connecting to the server.'
      );

      setShowResult(false);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="aurora-bg"></div>

      <div className="glass-panel main-panel">
        <Header />

        {!showResult ? (
          <>
            <PredictionForm
              formData={formData}
              handleChange={handleChange}
              handlePredict={handlePredict}
              loading={loading}
            />

            {error && (
              <div className="alert-box error slide-up">
                <ShieldAlert size={24} />

                <div>
                  <strong>Error</strong>
                  <p>{error}</p>
                </div>

              </div>
            )}
          </>
        ) : (
          <ResultCard
            result={result}
            onReset={() => {
              setShowResult(false);
              setResult(null);
            }}
          />
        )}

      </div>
    </div>
  );
}

export default App;