import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className='mt-8' style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        title="PDF Viewer"
        style={{ width: '100%', height: '100%' }}
      >
        Your browser does not support PDF viewing. You can download the PDF <a href={pdfUrl}>here</a>.
      </iframe>
    </div>
  );
};

export default PDFViewer;