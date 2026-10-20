const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/supabase');

exports.generateReport = async (req, res) => {
  try {
    const { sample_id } = req.body;

    const { data: sample } = await supabaseAdmin
      .from('soil_samples')
      .select('*, users(full_name, email, mobile, location)')
      .eq('id', sample_id)
      .single();

    if (!sample) {
      return res.status(404).json({ success: false, message: 'Sample not found.' });
    }

    const { data: result } = await supabaseAdmin
      .from('soil_test_results')
      .select('*')
      .eq('sample_id', sample_id)
      .single();

    if (!result) {
      return res.status(400).json({ success: false, message: 'Test results not available yet.' });
    }

    const reportId = `RPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const reportUuid = uuidv4();

    const { data: report, error } = await supabaseAdmin
      .from('reports')
      .insert([{
        id: reportUuid,
        report_id: reportId,
        sample_id,
        user_id: sample.user_id,
        result_id: result.id,
        status: 'Generated',
        generated_at: new Date().toISOString()
      }])
      .select('*')
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to generate report.' });
    }

    // Update sample status
    await supabaseAdmin
      .from('soil_samples')
      .update({ status: 'Report Available', updated_at: new Date().toISOString() })
      .eq('id', sample_id);

    // Notify user
    await supabaseAdmin.from('notifications').insert([{
      id: uuidv4(),
      user_id: sample.user_id,
      title: 'Report Available',
      message: `Your soil testing report ${reportId} is ready for download.`,
      type: 'success',
      is_read: false
    }]);

    res.status(201).json({ success: true, message: 'Report generated successfully.', report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getMyReports = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('reports')
      .select('*, soil_samples(request_id, soil_type, test_type, sample_location)')
      .eq('user_id', req.user.id)
      .order('generated_at', { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch reports.' });
    }

    res.json({ success: true, reports: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = supabaseAdmin
      .from('reports')
      .select('*, soil_samples(*), soil_test_results(*), users(full_name, email, mobile, location)')
      .eq('id', id);

    if (req.user.role !== 'admin') {
      query = query.eq('user_id', req.user.id);
    }

    const { data: report, error } = await query.single();
    if (error || !report) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;

    let query = supabaseAdmin
      .from('reports')
      .select(`
        *,
        soil_samples(*),
        soil_test_results(*),
        users(full_name, email, mobile, location)
      `)
      .eq('id', id);

    if (req.user.role !== 'admin') {
      query = query.eq('user_id', req.user.id);
    }

    const { data: report, error } = await query.single();
    if (error || !report) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    const sample = report.soil_samples;
    const result = report.soil_test_results;
    const user = report.users;

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Soil-Test-Report-${report.report_id}.pdf`);
    doc.pipe(res);

    // Header
    doc.fillColor('#2d6a4f').fontSize(22).text('SOIL TESTING', { align: 'center' });
    doc.fontSize(12).fillColor('#555').text('Professional Soil Analysis Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.strokeColor('#2d6a4f').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown();

    // Report Info
    doc.fillColor('#000').fontSize(10);
    doc.text(`Report ID: ${report.report_id}`, { continued: true });
    doc.text(`Generated: ${new Date(report.generated_at).toLocaleDateString()}`, { align: 'right' });
    doc.moveDown();

    // User Info
    doc.fillColor('#2d6a4f').fontSize(14).text('Customer Information');
    doc.fillColor('#000').fontSize(10);
    doc.text(`Name: ${user?.full_name || 'N/A'}`);
    doc.text(`Email: ${user?.email || 'N/A'}`);
    doc.text(`Mobile: ${user?.mobile || 'N/A'}`);
    doc.text(`Location: ${user?.location || 'N/A'}`);
    doc.moveDown();

    // Sample Info
    doc.fillColor('#2d6a4f').fontSize(14).text('Sample Information');
    doc.fillColor('#000').fontSize(10);
    doc.text(`Request ID: ${sample?.request_id || 'N/A'}`);
    doc.text(`Soil Type: ${sample?.soil_type || 'N/A'}`);
    doc.text(`Test Type: ${sample?.test_type || 'N/A'}`);
    doc.text(`Sample Location: ${sample?.sample_location || 'N/A'}`);
    doc.text(`Crop: ${sample?.crop_name || 'N/A'}`);
    doc.text(`Collection Date: ${sample?.collection_date || 'N/A'}`);
    doc.text(`Test Date: ${result?.test_date ? new Date(result.test_date).toLocaleDateString() : 'N/A'}`);
    doc.moveDown();

    // Results Table
    doc.fillColor('#2d6a4f').fontSize(14).text('Test Results');
    doc.moveDown(0.3);

    const parameters = [
      { name: 'pH', value: result?.ph, unit: '', ref: '6.0 - 7.5 (Ideal)' },
      { name: 'Nitrogen (N)', value: result?.nitrogen, unit: 'kg/ha', ref: '280 - 560' },
      { name: 'Phosphorus (P)', value: result?.phosphorus, unit: 'kg/ha', ref: '10 - 25' },
      { name: 'Potassium (K)', value: result?.potassium, unit: 'kg/ha', ref: '110 - 280' },
      { name: 'Organic Carbon', value: result?.organic_carbon, unit: '%', ref: '0.5 - 0.75' },
      { name: 'Electrical Conductivity', value: result?.electrical_conductivity, unit: 'dS/m', ref: '< 1.0' },
      { name: 'Moisture', value: result?.moisture, unit: '%', ref: '15 - 25' },
      { name: 'Salinity', value: result?.salinity, unit: 'dS/m', ref: '< 4.0' }
    ];

    // Table header
    const startY = doc.y;
    doc.fillColor('#2d6a4f').fontSize(10).font('Helvetica-Bold');
    doc.text('Parameter', 50, startY);
    doc.text('Result', 200, startY);
    doc.text('Unit', 280, startY);
    doc.text('Reference Range', 340, startY);
    doc.moveTo(50, startY + 15).lineTo(545, startY + 15).stroke();
    doc.font('Helvetica').fillColor('#000');

    let y = startY + 25;
    parameters.forEach((p) => {
      if (p.value !== null && p.value !== undefined) {
        doc.text(p.name, 50, y);
        doc.text(String(p.value), 200, y);
        doc.text(p.unit, 280, y);
        doc.text(p.ref, 340, y);
        y += 18;
      }
    });

    doc.y = y + 10;
    doc.moveDown();

    if (result?.interpretation) {
      doc.fillColor('#2d6a4f').fontSize(14).text('Interpretation');
      doc.fillColor('#000').fontSize(10).text(result.interpretation, { align: 'justify' });
      doc.moveDown();
    }

    if (result?.recommendations) {
      doc.fillColor('#2d6a4f').fontSize(14).text('Recommendations');
      doc.fillColor('#000').fontSize(10).text(result.recommendations, { align: 'justify' });
      doc.moveDown();
    }

    // Footer
    doc.moveDown(2);
    doc.strokeColor('#2d6a4f').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fillColor('#555').fontSize(9).text('Soil Testing Laboratory | Professional Soil Analysis Services', { align: 'center' });
    doc.text('This is a computer-generated report. For queries contact support@soiltesting.com', { align: 'center' });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to generate PDF.' });
  }
};
