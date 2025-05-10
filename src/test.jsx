import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function X_App() {
  const contentRef = useRef(null);

  const handlePrint = async () => {
    // Wait for the canvas to be generated from the DOM
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png'); // Convert canvas to image

    // Initialize jsPDF and add the image to the PDF
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10); // Add image to PDF at coordinates (10, 10)
    pdf.save('document.pdf'); // Save the PDF as "document.pdf"
  };

  return (
    <div>
      <button onClick={handlePrint}>Download PDF</button>

      {/* Content to capture and print */}
      <div ref={contentRef}>
        <h1>Hello World</h1>
        <p>This is the content to print to PDF.</p>
      </div>
    </div>
  );
}

export default X_App;
