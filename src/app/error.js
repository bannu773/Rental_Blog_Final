"use client";

import React from "react";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#fff' }}>
        <h1 style={{ color: '#d32f2f', fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h1>
        <p style={{ color: '#333', marginBottom: '2rem' }}>
          {error?.message || "An unexpected error occurred. Please try again later."}
        </p>
        <button
          onClick={() => reset()}
          style={{ padding: '0.5rem 1.5rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}

// Optionally, you can add error logging here
// export function reportError(error) {
//   // Send error to your logging service
// } 