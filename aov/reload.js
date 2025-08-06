(function() {
  if (!window.location.search.includes('v=')) {
    window.location.replace(window.location.pathname + '?v=' + Date.now());
  }
})();