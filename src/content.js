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
  document.addEventListener('keydown', escListener);
}

// Listen for Shift+Click on links
window.addEventListener('click', function(e) {
  const a = e.target.closest('a[href]');
  if (a && e.shiftKey && a.href && a.target !== '_blank') {
    e.preventDefault();
    showPopout(a.href);
  }
}, true);
