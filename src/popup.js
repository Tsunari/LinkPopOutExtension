function getCurrentDomain(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    if (tabs[0] && tabs[0].url) {
      try {
        const url = new URL(tabs[0].url);
        callback(url.hostname);
      } catch {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}

function renderBlacklist(domains, currentDomain) {
  const container = document.getElementById('blacklist');
  const empty = document.getElementById('empty');
  container.innerHTML = '';
  if (domains.length === 0) {
    empty.style.display = '';
  } else {
    empty.style.display = 'none';
    domains.forEach(domain => {
      const item = document.createElement('div');
      item.className = 'domain-item fade';
      const span = document.createElement('span');
      span.textContent = domain;
      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.onclick = () => removeDomain(domain, currentDomain);
      item.appendChild(span);
      item.appendChild(btn);
      container.appendChild(item);
    });
  }
}

function updateUI() {
  getCurrentDomain(currentDomain => {
    chrome.storage.local.get(['blacklist'], result => {
      const blacklist = result.blacklist || [];
      document.getElementById('current').textContent = currentDomain ? `Current site: ${currentDomain}` : 'No site detected.';
      const btn = document.getElementById('add-remove');
      if (currentDomain) {
        if (blacklist.includes(currentDomain)) {
          btn.textContent = 'Remove from Blacklist';
          btn.onclick = () => removeDomain(currentDomain, currentDomain);
        } else {
          btn.textContent = 'Add to Blacklist';
          btn.onclick = () => addDomain(currentDomain, currentDomain);
        }
        btn.style.display = '';
      } else {
        btn.style.display = 'none';
      }
      renderBlacklist(blacklist, currentDomain);
    });
  });
}

function addDomain(domain, currentDomain) {
  chrome.storage.local.get(['blacklist'], result => {
    const list = result.blacklist || [];
    if (!list.includes(domain)) {
      list.push(domain);
      chrome.storage.local.set({ blacklist: list }, updateUI);
    }
  });
}

function removeDomain(domain, currentDomain) {
  chrome.storage.local.get(['blacklist'], result => {
    let list = result.blacklist || [];
    list = list.filter(d => d !== domain);
    chrome.storage.local.set({ blacklist: list }, updateUI);
  });
}

document.addEventListener('DOMContentLoaded', updateUI);
