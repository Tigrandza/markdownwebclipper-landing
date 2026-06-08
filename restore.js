  // 05-13a — magic-link bridge.
  // The literal `dpkinbemdemheacegfjbbkclcpbfedif` MUST be substituted at
  // landing-page deploy time. The public landing repo
  // (github.com/Tigrandza/markdownwebclipper-landing) build pipeline
  // performs a `sed`-style replacement of `dpkinbemdemheacegfjbbkclcpbfedif`
  // with the real extension id once 05-13f reserves the canonical id
  // from the CWS listing. See OPERATIONAL-RUNBOOK.md "Worker section"
  // → "Landing page deploy" sub-section for the substitution command.
  // Until substitution runs, the placeholder is intentionally not a
  // valid extension id — the magic-link return path will fail with
  // "Could not reach the Clipper extension" until deploy.
  //
  // Dev/UAT override (added 2026-06-06 during pre-CWS-publish testing):
  // `?ext=<32-char-extension-id>` on the URL takes precedence over the
  // baked-in production EXT_ID. This lets developers test the
  // magic-link return path against a locally-loaded unpacked
  // extension (which has a different EXT_ID than the CWS-published
  // build) without rebuilding/redeploying this page. The override is
  // bounded: a valid extension id matches /^[a-p]{32}$/ (Chrome
  // restricts EXT_IDs to a..p), so a malicious URL can't dispatch
  // the token to an arbitrary string. The token itself is single-use
  // and 10-min-expiring; even if a user clicked an attacker-crafted
  // `?ext=<attacker-id>` URL, the attacker's extension would need to
  // be installed AND declare an onMessageExternal handler that
  // matches markdownwebclipper.com — both of which they'd have full
  // control over independently of this query param. The override
  // strictly reduces the attack surface for dev UAT vs hand-rolled
  // console invocations.
  var DEFAULT_EXT_ID = window.__CLIPPER_EXT_ID__ || 'dpkinbemdemheacegfjbbkclcpbfedif';
  var params = new URLSearchParams(window.location.search);
  var token = params.get('token');
  var extOverride = params.get('ext');
  var EXT_ID = (extOverride && /^[a-p]{32}$/.test(extOverride))
    ? extOverride
    : DEFAULT_EXT_ID;
  var statusEl = document.getElementById('status');
  var titleEl = document.getElementById('title');

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = 'status' + (kind ? ' ' + kind : '');
  }

  if (!token) {
    setStatus('Missing token. Please re-request the magic link from Clipper Settings → Pro.', 'err');
  } else if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(EXT_ID, { type: 'RESTORE_TOKEN', token: token }, function (response) {
      if (chrome.runtime.lastError) {
        setStatus('Could not reach the Clipper extension. Make sure it is installed and enabled.', 'err');
      } else if (response && response.ok) {
        titleEl.textContent = 'Pro license restored';
        setStatus('You can close this tab. Pro is active in the extension.', 'ok');
      } else {
        setStatus((response && response.error) || 'Restore failed. Please request a fresh magic link.', 'err');
      }
    });
  } else {
    setStatus('Open this link inside Chrome with the Clipper extension installed.', 'err');
  }
