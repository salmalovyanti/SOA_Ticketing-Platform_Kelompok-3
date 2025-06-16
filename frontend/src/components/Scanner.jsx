import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styles/scanner.css';

const Scanner = ({ onResult }) => {
  useEffect(() => {
  const config = {
    fps: 10,
    qrbox: { width: 500, height: 300 },
    rememberLastUsedCamera: true,
  };

  const verbose = false;

  const readerElem = document.getElementById("reader");
  if (readerElem) {
    readerElem.innerHTML = "";
  }

  // 💡 Cegah re-render yang menyebabkan duplikasi
  if (!window._scannerInstance) {
    const scanner = new Html5QrcodeScanner("reader", config, verbose);
    window._scannerInstance = scanner;

    scanner.render(
      (decodedText) => {
        onResult(decodedText);
        scanner.clear();
        window._scannerInstance = null;
      },
      (errorMessage) => {
        console.warn("Scan error", errorMessage);
      }
    );
  }

  return () => {
    if (window._scannerInstance) {
      window._scannerInstance.clear().catch((err) =>
        console.error("Gagal clear scanner:", err)
      );
      window._scannerInstance = null;
    }
  };
}, []);

  return null;
};

export default Scanner;
