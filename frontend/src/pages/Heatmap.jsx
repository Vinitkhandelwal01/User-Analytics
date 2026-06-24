import React, { useEffect, useState } from "react";
import { fetchHeatmapPages, fetchHeatmapClicks } from "../utils/api";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function Heatmap() {
  const [pages, setPages] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");

  const [loadingPages, setLoadingPages] = useState(true);
  const [loadingClicks, setLoadingClicks] = useState(false);

  const [error, setError] = useState("");

  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoadingPages(true);

      const data = await fetchHeatmapPages();

      const pageList = data.pages || [];

      setPages(pageList);

      if (pageList.length > 0) {
        setSelectedUrl(pageList[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPages(false);
    }
  }

  useEffect(() => {
    if (!selectedUrl) return;

    loadClicks(selectedUrl);
  }, [selectedUrl]);

  async function loadClicks(url) {
    try {
      setLoadingClicks(true);
      setError("");

      const data = await fetchHeatmapClicks(url);

      setClicks(data.clicks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingClicks(false);
    }
  }

  if (loadingPages) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorBox message={error} />;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        Click Heatmap
      </h2>

      {pages.length > 0 && (
        <select
          value={selectedUrl}
          onChange={(e) => setSelectedUrl(e.target.value)}
          style={{
            padding: "8px",
            marginBottom: "20px",
            minWidth: "400px",
          }}
        >
          {pages.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      )}

      {loadingClicks ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Total Clicks: {clicks.length}
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "500px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {clicks.length === 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No click data available
              </div>
            ) : (
              clicks.map((click, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${click.click_x}px`,
                    top: `${click.click_y}px`,
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#ff4d4f",
                    boxShadow: "0 0 10px #ff4d4f",
                    opacity: 0.6,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}