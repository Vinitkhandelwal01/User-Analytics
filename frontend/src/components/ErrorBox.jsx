import React from "react";

export default function ErrorBox({ message, onRetry }) {
  return (
    <div style={styles.box}>
      <p style={styles.icon}>⚠</p>
      <p style={styles.msg}>{message}</p>
      {onRetry && (
        <button style={styles.btn} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

const styles = {
  box: {
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.25)",
    borderRadius: "var(--radius)",
    padding: "32px",
    textAlign: "center",
  },
  icon: {
    fontSize: "1.5rem",
    marginBottom: 8,
    color: "var(--color-danger)",
  },
  msg: {
    color: "var(--color-text-secondary)",
    fontSize: "0.88rem",
    marginBottom: 16,
  },
  btn: {
    background: "var(--color-surface-2)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    padding: "6px 16px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
};
