const PdfViewer = ({ pdfUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        className="w-full h-[700px] rounded-lg"
      />
    </div>
  );
};

export default PdfViewer;