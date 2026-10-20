import React, { useEffect, useState } from 'react';
import { getAdminSamples, createResult, generateReport } from '../../services/api';
import { toast } from 'react-toastify';

const AdminResults = () => {
  const [samples, setSamples] = useState([]);
  const [sampleId, setSampleId] = useState('');
  const [form, setForm] = useState({
    ph: '', nitrogen: '', phosphorus: '', potassium: '',
    organic_carbon: '', electrical_conductivity: '', moisture: '', salinity: '',
    interpretation: '', recommendations: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdminSamples({ status: 'Testing' })
      .then((res) => setSamples(res.data.samples || []))
      .catch(() => {});
    // also load Sample Received
    getAdminSamples().then((res) => {
      const eligible = (res.data.samples || []).filter((s) =>
        ['Sample Received', 'Testing', 'Completed'].includes(s.status)
      );
      setSamples(eligible);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sampleId) {
      toast.error('Select a sample');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        sample_id: sampleId,
        ph: form.ph ? parseFloat(form.ph) : null,
        nitrogen: form.nitrogen ? parseFloat(form.nitrogen) : null,
        phosphorus: form.phosphorus ? parseFloat(form.phosphorus) : null,
        potassium: form.potassium ? parseFloat(form.potassium) : null,
        organic_carbon: form.organic_carbon ? parseFloat(form.organic_carbon) : null,
        electrical_conductivity: form.electrical_conductivity ? parseFloat(form.electrical_conductivity) : null,
        moisture: form.moisture ? parseFloat(form.moisture) : null,
        salinity: form.salinity ? parseFloat(form.salinity) : null,
        interpretation: form.interpretation || null,
        recommendations: form.recommendations || null
      };
      await createResult(payload);
      toast.success('Results saved');
      try {
        await generateReport(sampleId);
        toast.success('Report generated');
      } catch {}
      setForm({
        ph: '', nitrogen: '', phosphorus: '', potassium: '',
        organic_carbon: '', electrical_conductivity: '', moisture: '', salinity: '',
        interpretation: '', recommendations: ''
      });
      setSampleId('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Enter Test Results</h2>
      <div className="card-custom p-4" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label form-label-custom">Select Sample *</label>
            <select className="form-select form-control-custom" value={sampleId} onChange={(e) => setSampleId(e.target.value)} required>
              <option value="">Choose sample...</option>
              {samples.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.request_id} — {s.test_type} ({s.status})
                </option>
              ))}
            </select>
          </div>
          <div className="row g-3">
            {[
              { name: 'ph', label: 'pH' },
              { name: 'nitrogen', label: 'Nitrogen (kg/ha)' },
              { name: 'phosphorus', label: 'Phosphorus (kg/ha)' },
              { name: 'potassium', label: 'Potassium (kg/ha)' },
              { name: 'organic_carbon', label: 'Organic Carbon (%)' },
              { name: 'electrical_conductivity', label: 'EC (dS/m)' },
              { name: 'moisture', label: 'Moisture (%)' },
              { name: 'salinity', label: 'Salinity (dS/m)' }
            ].map((f) => (
              <div className="col-md-6" key={f.name}>
                <label className="form-label form-label-custom">{f.label}</label>
                <input
                  type="number"
                  step="any"
                  className="form-control form-control-custom"
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              </div>
            ))}
            <div className="col-12">
              <label className="form-label form-label-custom">Interpretation</label>
              <textarea className="form-control form-control-custom" rows="2" value={form.interpretation} onChange={(e) => setForm({ ...form, interpretation: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label form-label-custom">Recommendations</label>
              <textarea className="form-control form-control-custom" rows="2" value={form.recommendations} onChange={(e) => setForm({ ...form, recommendations: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary-custom mt-4" disabled={loading}>
            {loading ? 'Saving...' : 'Save Results & Generate Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResults;
