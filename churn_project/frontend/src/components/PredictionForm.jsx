import {
  ShieldCheck,
  Activity,
  User,
  CreditCard,
  Banknote,
  Globe,
  Calendar,
  Package,
  Sparkles
} from 'lucide-react';

export default function PredictionForm({
  formData,
  handleChange,
  handlePredict,
  loading
}) {

  const getScoreColor = (score) => {
    if (score < 500) return '#ef4444';
    if (score < 700) return '#f59e0b';
    return '#10b981';
  };

  return (
    <form
      onSubmit={handlePredict}
      autoComplete="off"
      className="form-container"
    >

      <div className="form-sections-wrapper">

        {/* Demographics Section */}
        <div className="form-section">

          <h3 className="section-title">
            <User size={18} /> Demographics
          </h3>

          {/* Geography */}
          <div className="input-group">
            <label>
              <Globe size={16} /> Geography
            </label>

            <div className="select-wrapper">
              <select
                name="Geography"
                value={formData.Geography}
                onChange={handleChange}
                className="premium-input"
              >
                <option value="">Select Country</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>

          {/* Gender */}
          <div className="input-group">

            <label>
              <User size={16} /> Gender
            </label>

            <div className="radio-group">

              <label
                className={`radio-btn ${
                  formData.Gender === 'Male' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={formData.Gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>

              <label
                className={`radio-btn ${
                  formData.Gender === 'Female' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={formData.Gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>

            </div>
          </div>

          {/* Age */}
          <div className="input-group full-width">

            <div className="slider-header">
              <label>
                <Calendar size={16} /> Age
              </label>

              <span className="slider-value">
                {formData.Age || 18} years
              </span>
            </div>

            <input
              type="range"
              name="Age"
              min="18"
              max="100"
              value={formData.Age || 18}
              onChange={handleChange}
              className="premium-slider"
            />

          </div>
        </div>

        {/* Financials Section */}
        <div className="form-section">

          <h3 className="section-title">
            <Banknote size={18} /> Financials
          </h3>

          {/* Credit Score */}
          <div className="input-group full-width">

            <div className="slider-header">
              <label>
                <ShieldCheck size={16} /> Credit Score
              </label>

              <span
                className="slider-value"
                style={{
                  color: getScoreColor(formData.CreditScore || 300)
                }}
              >
                {formData.CreditScore || 300}
              </span>
            </div>

            <input
              type="range"
              name="CreditScore"
              min="300"
              max="900"
              value={formData.CreditScore || 300}
              onChange={handleChange}
              className="premium-slider"
            />

          </div>

          {/* Balance */}
          <div className="input-group">

            <label>
              <Banknote size={16} /> Balance
            </label>

            <input
              type="number"
              name="Balance"
              value={formData.Balance}
              onChange={handleChange}
              className="premium-input"
              placeholder="Enter Balance"
            />

          </div>

          {/* Salary */}
          <div className="input-group">

            <label>
              <Banknote size={16} /> Salary
            </label>

            <input
              type="number"
              name="EstimatedSalary"
              value={formData.EstimatedSalary}
              onChange={handleChange}
              className="premium-input"
              placeholder="Enter Salary"
            />

          </div>

        </div>

        {/* Engagement Section */}
        <div className="form-section">

          <h3 className="section-title">
            <CreditCard size={18} /> Engagement
          </h3>

          {/* Tenure */}
          <div className="input-group full-width">

            <div className="slider-header">
              <label>
                <Calendar size={16} /> Tenure
              </label>

              <span className="slider-value">
                {formData.Tenure || 0} years
              </span>
            </div>

            <input
              type="range"
              name="Tenure"
              min="0"
              max="10"
              value={formData.Tenure || 0}
              onChange={handleChange}
              className="premium-slider"
            />

          </div>

          {/* Products */}
          <div className="input-group">

            <label>
              <Package size={16} /> Products
            </label>

            <select
              name="NumOfProducts"
              value={formData.NumOfProducts}
              onChange={handleChange}
              className="premium-input"
            >
              <option value="">Select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>

          </div>

          {/* Credit Card */}
          <div className="input-group">

            <label>
              <CreditCard size={16} /> Credit Card
            </label>

            <select
              name="HasCrCard"
              value={formData.HasCrCard}
              onChange={handleChange}
              className="premium-input"
            >
              <option value="">Select</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>

          </div>

          {/* Active Member */}
          <div className="input-group full-width">

            <label>
              <Activity size={16} /> Active Member
            </label>

            <select
              name="IsActiveMember"
              value={formData.IsActiveMember}
              onChange={handleChange}
              className="premium-input"
            >
              <option value="">Select</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>

          </div>

        </div>

      </div>

      {/* Submit Button */}
      <div className="form-actions">

        <button
          type="submit"
          className={`btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading}
        >

          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              <Sparkles size={18} />
              Analyze Churn Risk
            </>
          )}

        </button>

      </div>

    </form>
  );
}