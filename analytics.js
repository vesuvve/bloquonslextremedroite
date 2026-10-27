// Mesure des pages vues uniquement, sur le domaine de production.
(() => {
  if (location.hostname !== 'bloquonslextremedroite.vercel.app') return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  window.va('beforeSend', event => {
    if (event.type !== 'pageview') return null;
    return { ...event, url: location.origin + '/', referrer: '' };
  });
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.append(script);
})();
