import React, { useEffect, useState } from "react";
import { fetchStats } from "../utils/api";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import StatCard from "../components/StatCard";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);

      const data = await fetchStats();

      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Spinner />;

  if (error) {
    return (
      <ErrorBox
        message={error}
      />
    );
  }

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Analytics Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <StatCard
          title="Total Sessions"
          value={stats.total_sessions}
        />

        <StatCard
          title="Total Events"
          value={stats.total_events}
        />

        <StatCard
          title="Page Views"
          value={stats.total_page_views}
        />

        <StatCard
          title="Clicks"
          value={stats.total_clicks}
        />
      </div>
    </div>
  );
}