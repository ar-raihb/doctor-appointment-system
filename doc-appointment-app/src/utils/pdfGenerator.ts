
export const downloadPrescriptionPDF = (prescription: any, doctorName: string) => {
  // Create a simple HTML content for the prescription
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Prescription - ${prescription.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .prescription-info {
          margin-bottom: 20px;
        }
        .medications {
          border: 1px solid #ddd;
          margin: 20px 0;
        }
        .medication-item {
          border-bottom: 1px solid #eee;
          padding: 10px;
        }
        .medication-item:last-child {
          border-bottom: none;
        }
        .instructions {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #007bff;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Medical Prescription</h1>
        <p>MedCare Healthcare System</p>
      </div>
      
      <div class="prescription-info">
        <p><strong>Prescription ID:</strong> ${prescription.id}</p>
        <p><strong>Doctor:</strong> ${doctorName}</p>
        <p><strong>Date:</strong> ${new Date(prescription.createdAt).toLocaleDateString()}</p>
        <p><strong>Diagnosis:</strong> ${prescription.diagnosis}</p>
      </div>
      
      <h3>Medications:</h3>
      <div class="medications">
        ${prescription.medications.map((med: any) => `
          <div class="medication-item">
            <h4>${med.name} - ${med.dosage}</h4>
            <p><strong>Frequency:</strong> ${med.frequency}</p>
            <p><strong>Duration:</strong> ${med.duration}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="instructions">
        <h3>Instructions:</h3>
        <p>${prescription.instructions}</p>
      </div>
      
      <div style="margin-top: 40px; text-align: center; color: #666;">
        <p>This is a computer-generated prescription. Please consult your doctor for any clarifications.</p>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prescription-${prescription.id}-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
