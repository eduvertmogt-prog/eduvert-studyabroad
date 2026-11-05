"use client";

import { useEffect, useState } from "react";

export function DbStatus() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/db-status")
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .then((body) => {
        if (!cancelled && body?.ok) setOpen(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!open) return null;

  return (
    <div className="db-toast" role="status">
      <p>Database connected</p>
      <button type="button" onClick={() => setOpen(false)}>
        Close
      </button>
    </div>
  );
}
