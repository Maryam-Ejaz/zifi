// src/global.d.ts

interface SCAPI {
    init: () => void;
    startTest?: () => void; // Add this line to define the startTest method
  }
  
  interface Window {
    SCAPI?: SCAPI;
  }
  