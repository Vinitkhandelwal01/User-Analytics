(function () {
  const SESSION_KEY = "session_id";
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId =
      Date.now().toString() +
      Math.random().toString(36).substring(2, 8);

    localStorage.setItem(SESSION_KEY, sessionId);
  }
  const endpoint =
    document.currentScript.dataset.endpoint;

  function sendEvent(eventData) {
    fetch(`${endpoint}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).catch((error) => {
      console.error("Failed to send event:", error);
    });
  }
  function trackPageView() {
    sendEvent({
      session_id: sessionId,
      event_type: "page_view",
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }
  function trackClick(event) {
    sendEvent({
      session_id: sessionId,
      event_type: "click",
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      click_x: event.clientX,
      click_y: event.clientY,
    });
  }
  trackPageView();
  document.addEventListener("click", trackClick);
})();