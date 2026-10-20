import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSampleById, getResultBySample } from '../../services/api';

const SampleDetail = () => {
  const { id } = useParams();
  const [sample, setSample] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSampleById(id),
      getResultBySample(id).catch(() => null)
    ])
      .then(([sRes, rRes]) => {
        setSample(sRes.data.sample);
        if (rRes) setResult(rRes.data.result);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;
  if (!sample) return <div className="alert alert-warning">Sample not found. <Link to="/dashboard/samples">Back</Link></div>;

  return (
    <div>
      <Link to="/dashboard/samples" className="small mb-3 d-inline-block">← Back to samples</Link>
      <h2 className="mb-4">Sample: {sample.request_id}</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card-custom p-4">
            <h5 className="mb-3">Sample Information</h5>
            <p><strong>Status:</strong> {sample.status}</p>
            <p><strong>Soil Type:</strong> {sample.soil_type}</p>
            <p><strong>Test Type:</strong> {sample.test_type}</p>
            <p><strong>Location:</strong> {sample.sample_location}</p>
            <p><strong>Crop:</strong> {sample.crop_name || '—'}</p>
            <p><strong>Land Area:</strong> {sample.land_area || '—'}</p>
            <p><strong>Collection Date:</strong> {sample.collection_date || '—'}</p>
            <p><strong>Notes:</strong> {sample.additional_notes || '—'}</p>
            <p className="mb-0"><strong>Submitted:</strong> {new Date(sample.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-custom p-4">
            <h5 className="mb-3">Test Results</h5>
            {result ? (
              <ul className="list-unstyled mb-0">
                {result.ph != null && <li>pH: {result.ph}</li>}
                {result.nitrogen != null && <li>Nitrogen: {result.nitrogen} kg/ha</li>}
                {result.phosphorus != null && <li>Phosphorus: {result.phosphorus} kg/ha</li>}
                {result.potassium != null && <li>Potassium: {result.potassium} kg/ha</li>}
                {result.organic_carbon != null && <li>Organic Carbon: {result.organic_carbon}%</li>}
                {result.electrical_conductivity != null && <li>EC: {result.electrical_conductivity} dS/m</li>}
                {result.moisture != null && <li>Moisture: {result.moisture}%</li>}
              </ul>
            ) : (
              <p className="text-muted mb-0">Results not available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDetail;
