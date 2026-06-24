import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV = [
  { to: "/overview", label: "Overview", icon: "⬡" },
  { to: "/sessions", label: "Sessions", icon: "◈" },
  { to: "/heatmap", label: "Heatmap", icon: "◉" },
];

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <span style={styles.brandDot} />
        <span style={styles.brandName}>User Analytics</span>
      </div>

      <nav style={styles.nav}>
        <p style={styles.navLabel}>Analytics</p>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}

export default function Layout({ children }) {
  return (
    <div style={styles.shell}>
      <Sidebar />
      <div style={styles.main}>
        <header style={styles.topbar}>
          <span style={styles.topbarTitle}>
            <PageTitle />
          </span>
          <span style={styles.topbarStatus}>
            <span style={styles.statusDot} />
            Analytics Dashboard
          </span>
        </header>
        <main style={styles.content}>{children}</main>
      </div>
    </div>
  );
}

function PageTitle() {
  const loc = useLocation();
  const map = {
    "/overview": "Overview",
    "/sessions": "Sessions",
    "/heatmap": "Heatmap",
  };
  const base = "/" + loc.pathname.split("/")[1];
  return map[base] || "Analytics";
}

const styles = {
  shell: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  sidebar: {
    width: "var(--sidebar-width)",
    minWidth: "var(--sidebar-width)",
    background: "var(--color-surface)",
    borderRight: "1px solid var(--color-border)",
    display: "flex",
    flexDirection: "column",
    padding: "0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "20px 20px 16px",
    borderBottom: "1px solid var(--color-border)",
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--color-accent)",
    boxShadow: "0 0 8px var(--color-accent)",
    flexShrink: 0,
  },
  brandName: {
    fontWeight: 700,
    fontSize: "0.95rem",
    letterSpacing: "-0.3px",
    color: "var(--color-text-primary)",
  },
  nav: {
    padding: "16px 10px",
    flex: 1,
  },
  navLabel: {
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "var(--color-text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "0 10px",
    marginBottom: "6px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text-secondary)",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
    marginBottom: "2px",
  },
  navItemActive: {
    background: "var(--color-accent-glow)",
    color: "var(--color-accent)",
  },
  navIcon: {
    fontSize: "1rem",
    width: 18,
    textAlign: "center",
    flexShrink: 0,
  },
  sidebarFooter: {
    padding: "16px 20px",
    borderTop: "1px solid var(--color-border)",
  },
  versionChip: {
    display: "inline-block",
    fontSize: "0.72rem",
    color: "var(--color-text-muted)",
    background: "var(--color-surface-2)",
    border: "1px solid var(--color-border)",
    padding: "2px 8px",
    borderRadius: 4,
    fontFamily: "var(--font-mono)",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  topbar: {
    height: "var(--header-height)",
    borderBottom: "1px solid var(--color-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: "var(--color-surface)",
    flexShrink: 0,
  },
  topbarTitle: {
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  topbarStatus: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.8rem",
    color: "var(--color-success)",
    fontWeight: 500,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--color-success)",
    animation: "pulse 2s infinite",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
  },
};
