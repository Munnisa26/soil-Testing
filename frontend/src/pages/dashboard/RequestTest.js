import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSample } from '../../services/api';
import { toast } from 'react-toastify';

const RequestTest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    soil_type: '',
    test_type: '',
    sample_location: '',
    land_area: '',
    crop_name: '',
    collection_date: new Date().toISOString().slice(0, 10),
    additional_notes: ''
  });
  const [file, setFile] = useState(null);

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky', 'Other'];
  const testTypes = [
    'Soil pH Test', 'NPK Test', 'Nitrogen Test', 'Phosphorus Test', 'Potassium Test',
    'Electrical Conductivity Test', 'Organic Carbon Test', 'Soil Moisture Test',
    'Soil Salinity Test', 'Micronutrient Test', 'Complete Soil Analysis'
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.soil_type || !form.test_type || !form.sample_location) {
      toast.error('Please fill required fields.');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (file) fd.append('document', file);
      const res = await createSample(fd);
      toast.success(`Request submitted! ID: ${res.data.sample.request_id}`);
      navigate('/dashboard/samples');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-1">Request Soil Test</h2>
      <p className="text-muted mb-4">Submit a new soil testing request. A unique Request ID will be generated.</p>

      <div className="card-custom p-4" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label form-label-custom">Soil Type *</label>
              <select name="soil_type" className="form-select form-control-custom" value={form.soil_type} onChange={handleChange} required>
                <option value="">Select soil type</option>
                {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-custom">Test Type *</label>
              <select name="test_type" className="form-select form-control-custom" value={form.test_type} onChange={handleChange} required>
                <option value="">Select test type</option>
                {testTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label form-label-custom">Sample Location *</label>
              <input type="text" name="sample_location" className="form-control form-control-custom" value={form.sample_location} onChange={handleChange} placeholder="Field / village / GPS coordinates" required />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-custom">Land Area</label>
              <input type="text" name="land_area" className="form-control form-control-custom" value={form.land_area} onChange={handleChange} placeholder="e.g. 2 acres" />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-custom">Crop Name</label>
              <input type="text" name="crop_name" className="form-control form-control-custom" value={form.crop_name} onChange={handleChange} placeholder="e.g. Wheat, Rice" />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-custom">Sample Collection Date</label>
              <input type="date" name="collection_date" className="form-control form-control-custom" value={form.collection_date} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label form-label-custom">Document Upload</label>
              <input type="file" className="form-control form-control-custom" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="col-12">
              <label className="form-label form-label-custom">Additional Notes</label>
              <textarea name="additional_notes" className="form-control form-control-custom" rows="3" value={form.additional_notes} onChange={handleChange} placeholder="Any special instructions..." />
            </div>
          </div>
          <button type="submit" className="btn btn-primary-custom mt-4" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestTest;
