import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSessionEvents } from "../utils/api";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

const EVENT_COLORS = {
  page_view: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#10b981" },
  click: { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", text: "#3b82f6" },
};

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDateTime(ts) {
  return new Date(ts).toLocaleString("en-IN");
}

export default function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const fetcher = useCallback(() => fetchSessionEvents(sessionId), [sessionId]);
  const { data, loading, error, refetch } = useFetch(fetcher);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={refetch} />;

  const { session, events = [] } = data || {};

  return (
    <div>
      {/* Back button */}
      <button style={styles.backBtn} onClick={() => navigate("/sessions")}>
        ← Back to Sessions
      </button>

      {/* Session meta */}
      <div style={styles.metaCard}>
        <div style={styles.metaRow}>
          <div style={styles.metaItem}>
            <p style={styles.metaLabel}>Session ID</p>
            <p className="mono" style={styles.metaValue}>{session?.session_id}</p>
          </div>
          <div style={styles.metaItem}>
            <p style={styles.metaLabel}>Total Events</p>
            <p style={styles.metaValue}>{session?.event_count}</p>
          </div>
          <div style={styles.metaItem}>
            <p style={styles.metaLabel}>First Seen</p>
            <p style={{ ...styles.metaValue, fontSize: "0.82rem" }}>{formatDateTime(session?.first_seen)}</p>
          </div>
          <div style={styles.metaItem}>
            <p style={styles.metaLabel}>Last Seen</p>
            <p style={{ ...styles.metaValue, fontSize: "0.82rem" }}>{formatDateTime(session?.last_seen)}</p>
          </div>
        </div>

        {/* Breakdown pills */}
        <div style={styles.pills}>
          {Object.entries(session?.event_breakdown || {}).map(([type, count]) => {
            const c = EVENT_COLORS[type] || {};
            return (
              <span key={type} style={{ ...styles.pill, background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                {type}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* User journey timeline */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>User Journey — {events.length} events</h2>
        <div style={styles.timeline}>
          {events.map((ev, i) => {
            const colors = EVENT_COLORS[ev.event_type] || {};
            return (
              <div key={ev._id} style={styles.timelineItem}>
                {/* Left column: index + connector */}
                <div style={styles.timelineLeft}>
                  <div style={{ ...styles.timelineNode, background: colors.text || "var(--color-accent)" }}>
                    {i + 1}
                  </div>
                  {i < events.length - 1 && <div style={styles.timelineConnector} />}
                </div>

                {/* Right column: event card */}
                <div style={{ ...styles.eventCard, borderColor: colors.border || "var(--color-border)" }}>
                  <div style={styles.eventHeader}>
                    <span style={{ ...styles.eventBadge, background: colors.bg, color: colors.text }}>
                      {ev.event_type}
                    </span>
                    <span style={styles.eventTime}>{formatTime(ev.timestamp)}</span>
                  </div>

                  <p className="mono" style={styles.eventUrl}>{ev.page_url}</p>

                  {ev.event_type === "click" && (
                    <p style={styles.coordLine}>
                      Click at ({ev.click_x}, {ev.click_y})
                      {ev.viewport_width && (
                        <span style={styles.dimText}> — viewport {ev.viewport_width}×{ev.viewport_height}</span>
                      )}
                      {ev.meta?.target_tag && (
                        <span style={styles.dimText}> on &lt;{ev.meta.target_tag}&gt;</span>
                      )}
                      {ev.meta?.target_text && (
                        <span style={styles.dimText}> "{ev.meta.target_text}"</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  backBtn: {
    background: "transparent",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-secondary)",
    padding: "6px 14px",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.83rem",
    fontFamily: "var(--font-sans)",
    marginBottom: 20,
  },
  metaCard: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "20px",
    marginBottom: 24,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px 32px",
    marginBottom: 14,
  },
  metaItem: {},
  metaLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 3,
  },
  metaValue: {
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  pills: { display: "flex", gap: 8, flexWrap: "wrap" },
  pill: {
    padding: "3px 10px",
    borderRadius: 4,
    fontSize: "0.78rem",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
  },
  section: {},
  sectionTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    marginBottom: 16,
  },
  timeline: { display: "flex", flexDirection: "column" },
  timelineItem: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
  },
  timelineLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    width: 28,
  },
  timelineNode: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    minHeight: 12,
    background: "var(--color-border)",
    margin: "3px 0",
  },
  eventCard: {
    flex: 1,
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    padding: "12px 14px",
    marginBottom: 10,
  },
  eventHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  eventBadge: {
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: "0.74rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  eventTime: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.74rem",
    color: "var(--color-text-muted)",
  },
  eventUrl: {
    fontSize: "0.8rem",
    color: "var(--color-text-secondary)",
    wordBreak: "break-all",
    marginBottom: 4,
  },
  coordLine: {
    fontSize: "0.79rem",
    color: "var(--color-text-secondary)",
    marginTop: 4,
  },
  dimText: {
    color: "var(--color-text-muted)",
  },
};
