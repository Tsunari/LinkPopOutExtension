// Inject modal CSS
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .link-popout-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .link-popout-iframe {
      width: 80vw;
      height: 80vh;
      border: none;
      background: #fff;
      box-shadow: 0 0 20px #0005;
      border-radius: 8px;
      position: relative;
    }
    .link-popout-close {
      position: absolute;
      top: 8px;
      right: 12px;
      background: #f44336;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 20px;
      cursor: pointer;
      z-index: 100001;
    }
  `;
  document.head.appendChild(style);
})();

// Modal logic
function showPopout(url) {
  if (document.querySelector('.link-popout-modal')) return;

  // Get blacklist and check current domain
  const domain = window.location.hostname;
  try {
    chrome.storage.local.get(['blacklist'], result => {
      const blacklist = result && result.blacklist ? result.blacklist : [];
      if (blacklist.includes(domain)) {
        // Open popup window for blacklisted domain
        const w = Math.round(window.innerWidth * 0.8);
        const h = Math.round(window.innerHeight * 0.8);
        const left = Math.round(window.screenX + (window.innerWidth - w) / 2);
        const top = Math.round(window.screenY + (window.innerHeight - h) / 2);
        window.open(
          url,
          '_blank',
          `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`
        );
        return;
      }
      // Show modal for non-blacklisted sites
      createModal(url);
    });
  } catch (err) {
    // Extension context invalidated or chrome.storage not available
    // Optionally show a snackbar or just do nothing
    showSnackbar('Extension context invalidated. This page may not support popout links. Please try again.');
  }

function createModal(url) {
  const modal = document.createElement('div');
  modal.className = 'link-popout-modal';

  const iframe = document.createElement('iframe');
  iframe.className = 'link-popout-iframe';
  iframe.src = url;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'link-popout-close';
  closeBtn.textContent = '×';
  closeBtn.onclick = () => modal.remove();

  modal.appendChild(iframe);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);

  // Close on Escape
  function escListener(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escListener);
    }
  }
  document.addEventListener('keydown', escListener, true);

  // Close on Ctrl+X
  function ctrlXListener(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'x' || e.key === 'X')) {
      e.preventDefault();
      modal.remove();
      document.removeEventListener('keydown', ctrlXListener);
    }
  }
  document.addEventListener('keydown', ctrlXListener, true);
}

function showSnackbar(msg) {
  let snackbar = document.createElement('div');
  snackbar.textContent = msg;
  snackbar.style.position = 'fixed';
  snackbar.style.bottom = '32px';
  snackbar.style.left = '50%';
  snackbar.style.transform = 'translateX(-50%)';
  snackbar.style.background = '#323232';
  snackbar.style.color = '#fff';
  snackbar.style.padding = '12px 24px';
  snackbar.style.borderRadius = '6px';
  snackbar.style.zIndex = '100000';
  snackbar.style.fontSize = '16px';
  snackbar.style.boxShadow = '0 2px 8px #0003';
  document.body.appendChild(snackbar);
  setTimeout(() => {
    snackbar.remove();
  }, 3000);
}
}

// Listen for Shift+Click on links
window.addEventListener('click', function(e) {
  const a = e.target.closest('a[href]');
  if (a && e.shiftKey && a.href && a.target !== '_blank') {
    e.preventDefault();
    showPopout(a.href);
  }
}, true);
