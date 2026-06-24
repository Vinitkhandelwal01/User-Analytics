import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessions } from "../utils/api";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

function formatRelative(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDuration(first, last) {
  const secs = Math.round((new Date(last) - new Date(first)) / 1000);
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

export default function Sessions() {
  // const [page, setPage] = useState(1);
  // const fetcher = useCallback(() => fetchSessions(page, 20), [page]);
  const fetcher = useCallback(() => fetchSessions(), []);
  const { data, loading, error, refetch } = useFetch(fetcher);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  const sessions = data || [];

  return (
    <div>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.h1}>Sessions</h1>
          <p style={styles.sub}>
            {sessions.length} total sessions — click a row to view the full user journey.
          </p>
        </div>
        <button style={styles.refreshBtn} onClick={refetch}>↺ Refresh</button>
      </div>

      {sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <Th>Session ID</Th>
                <Th>Total Events</Th>
                <Th>First Seen</Th>
                <Th>Last Seen</Th>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr
                    key={s._id}
                    style={styles.row}
                    onClick={() => navigate(`/sessions/${s._id}`)}
                  >
                    <td style={{ ...styles.td, ...styles.monoTd }}>
                      {s._id.slice(0, 20)}...
                    </td>

                    <td style={styles.td}>
                      <span style={styles.badge}>
                        {s.totalEvents}
                      </span>
                    </td>

                    <td style={{ ...styles.td, ...styles.dimTd }}>
                      {formatRelative(s.firstSeen)}
                    </td>

                    <td style={{ ...styles.td, ...styles.dimTd }}>
                      {formatRelative(s.lastSeen)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Th({ children }) {
  return <th style={styles.th}>{children}</th>;
}

function EmptyState() {
  return (
    <div style={styles.empty}>
      <p style={{ fontSize: "2rem", marginBottom: 12 }}>◈</p>
      <p style={{ fontWeight: 600, marginBottom: 6 }}>No sessions yet</p>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
        Add the tracker to a webpage and start browsing to generate sessions.
      </p>
    </div>
  );
}

const styles = {
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  h1: { fontSize: "1.4rem", fontWeight: 700, marginBottom: 4 },
  sub: { color: "var(--color-text-secondary)", fontSize: "0.88rem" },
  refreshBtn: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-secondary)",
    padding: "6px 14px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontFamily: "var(--font-sans)",
  },
  tableWrap: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  th: {
    padding: "10px 14px",
    background: "var(--color-surface-2)",
    borderBottom: "1px solid var(--color-border)",
    textAlign: "left",
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    whiteSpace: "nowrap",
  },
  row: {
    cursor: "pointer",
    transition: "background 0.12s",
  },
  td: {
    padding: "11px 14px",
    borderBottom: "1px solid var(--color-border)",
    fontSize: "0.845rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  monoTd: { fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-text-secondary)" },
  urlTd: { color: "var(--color-text-secondary)", maxWidth: "240px" },
  dimTd: { color: "var(--color-text-secondary)" },
  badge: {
    background: "var(--color-surface-2)",
    border: "1px solid var(--color-border)",
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: "0.78rem",
    fontFamily: "var(--font-mono)",
  },
  clickBadge: {
    borderColor: "rgba(59,130,246,0.3)",
    color: "var(--color-accent)",
  },

  pageBtn: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    padding: "6px 14px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.83rem",
    fontFamily: "var(--font-sans)",
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: "default",
  },
  pageInfo: {
    fontSize: "0.83rem",
    color: "var(--color-text-secondary)",
  },
  empty: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "56px",
    textAlign: "center",
    color: "var(--color-text-secondary)",
  },
};
