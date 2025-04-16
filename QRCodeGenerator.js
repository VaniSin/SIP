import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ product }) => {
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  // Generate QR code data with product information
  const generateQRData = () => {
    if (!product) return '';
    
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      supplier: product.supplier,
      category: product.category,
      url: `https://growsmart.com/product/${product.id}`
    };
    
    return JSON.stringify(productData);
  };

  // Download QR code as image
  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    
    link.href = image;
    link.download = `${product.name.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowQR(!showQR)}
        className="flex items-center text-accent hover:text-primary transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        {showQR ? 'Hide QR Code' : 'Show QR Code'}
      </button>
      
      {showQR && (
        <div className="mt-3 p-4 border rounded-lg bg-gray-50 text-center" ref={qrRef}>
          <QRCode 
            value={generateQRData()} 
            size={200} 
            level="H" 
            includeMargin={true}
            renderAs="canvas"
          />
          <p className="mt-2 text-sm text-gray-600">Scan to view product details on mobile</p>
          <button
            onClick={downloadQR}
            className="mt-2 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-opacity-90 transition"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
