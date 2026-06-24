import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          color: "var(--color-text-secondary)",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "var(--color-text-primary)",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        {value}
      </p>
    </div>
  );
}