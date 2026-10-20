import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMySamples, getResultBySample } from '../../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Results = () => {
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMySamples()
      .then((res) => {
        const completed = (res.data.samples || []).filter((s) =>
          ['Completed', 'Report Available'].includes(s.status)
        );
        setSamples(completed);
      })
      .finally(() => setLoading(false));
  }, []);

  const loadResult = async (sample) => {
    setSelected(sample);
    try {
      const res = await getResultBySample(sample.id);
      setResult(res.data.result);
    } catch {
      setResult(null);
    }
  };

  const chartData = result
    ? {
        labels: ['pH', 'N', 'P', 'K', 'OC %', 'EC', 'Moisture'],
        datasets: [
          {
            label: 'Values',
            data: [
              result.ph || 0,
              result.nitrogen || 0,
              result.phosphorus || 0,
              result.potassium || 0,
              result.organic_carbon || 0,
              result.electrical_conductivity || 0,
              result.moisture || 0
            ],
            backgroundColor: 'rgba(45, 106, 79, 0.7)'
          }
        ]
      }
    : null;

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  return (
    <div>
      <h2 className="mb-4">Test Results</h2>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card-custom p-3">
            <h6 className="mb-3">Completed Samples</h6>
            {samples.length === 0 ? (
              <p className="text-muted small">No completed tests yet.</p>
            ) : (
              samples.map((s) => (
                <button
                  key={s.id}
                  className={`btn btn-sm w-100 text-start mb-2 ${selected?.id === s.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => loadResult(s)}
                >
                  {s.request_id} — {s.test_type}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="col-lg-8">
          {result ? (
            <div className="card-custom p-4">
              <h5 className="mb-3">Results for {selected?.request_id}</h5>
              <div className="table-responsive mb-4">
                <table className="table table-bordered">
                  <thead className="table-success">
                    <tr>
                      <th>Parameter</th>
                      <th>Result</th>
                      <th>Unit</th>
                      <th>Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p: 'pH', v: result.ph, u: '', r: '6.0–7.5' },
                      { p: 'Nitrogen', v: result.nitrogen, u: 'kg/ha', r: '280–560' },
                      { p: 'Phosphorus', v: result.phosphorus, u: 'kg/ha', r: '10–25' },
                      { p: 'Potassium', v: result.potassium, u: 'kg/ha', r: '110–280' },
                      { p: 'Organic Carbon', v: result.organic_carbon, u: '%', r: '0.5–0.75' },
                      { p: 'EC', v: result.electrical_conductivity, u: 'dS/m', r: '<1.0' },
                      { p: 'Moisture', v: result.moisture, u: '%', r: '15–25' }
                    ].map((row) =>
                      row.v != null ? (
                        <tr key={row.p}>
                          <td>{row.p}</td>
                          <td>{row.v}</td>
                          <td>{row.u}</td>
                          <td>{row.r}</td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
              {chartData && (
                <div className="chart-container mb-3">
                  <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              )}
              {result.interpretation && (
                <div className="mb-2"><strong>Interpretation:</strong> {result.interpretation}</div>
              )}
              {result.recommendations && (
                <div><strong>Recommendations:</strong> {result.recommendations}</div>
              )}
            </div>
          ) : (
            <div className="card-custom p-5 text-center text-muted">
              Select a completed sample to view results
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
