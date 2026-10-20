import React, { useEffect, useState } from 'react';
import { getMyReports, downloadReportPdf } from '../../services/api';
import { toast } from 'react-toastify';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyReports()
      .then((res) => setReports(res.data.reports || []))
      .catch(() => toast.error('Failed to load reports'))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (id, reportId) => {
    try {
      const res = await downloadReportPdf(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `Soil-Test-Report-${reportId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch {
      toast.error('Failed to download PDF');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  return (
    <div>
      <h2 className="mb-4">Reports</h2>
      {reports.length === 0 ? (
        <div className="card-custom p-5 text-center text-muted">No reports available yet.</div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Request ID</th>
                <th>Test Type</th>
                <th>Generated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td className="fw-semibold">{r.report_id}</td>
                  <td>{r.soil_samples?.request_id || '—'}</td>
                  <td>{r.soil_samples?.test_type || '—'}</td>
                  <td>{new Date(r.generated_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-primary-custom" onClick={() => handleDownload(r.id, r.report_id)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
