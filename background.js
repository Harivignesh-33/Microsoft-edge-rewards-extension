const searchQueries = [
    "cat",
    "dog",
    "technology",
    "Microsoft",
    "nature",
    "movies",
    "sports",
    "Edge browser",
    "AI",
    "learning",
  ];
  
  let currentQueryIndex = 0;
  let isSearching = false;
  let currentTabId = null;
  
  function performSearch() {
    if (!isSearching || currentQueryIndex >= searchQueries.length) {
      console.log("Search completed or stopped.");
      isSearching = false;
      return;
    }
  
    const query = searchQueries[currentQueryIndex];
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  
    if (currentTabId) {
      // Update the current tab to the new search URL
      chrome.tabs.update(currentTabId, { url: searchUrl }, () => {
        console.log(`Searching for: ${query}`);
        currentQueryIndex++;
  
        // Focus cursor in the address bar after a delay
        setTimeout(() => {
          focusCursorInAddressBar(currentTabId);
        }, 2000);
      });
    } else {
      // Open the first tab if not already open
      chrome.tabs.create({ url: searchUrl }, (tab) => {
        currentTabId = tab.id;
        console.log(`Searching for: ${query}`);
        currentQueryIndex++;
  
        // Focus cursor in the address bar after a delay
        setTimeout(() => {
          focusCursorInAddressBar(currentTabId);
        }, 2000);
      });
    }
  }
  
  function focusCursorInAddressBar(tabId) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: () => {
          // Focus the address bar or search box
          const addressBar = document.querySelector('input[type="search"]');
          if (addressBar) {
            addressBar.focus();
          } else {
            document.body.focus();
          }
        },
      },
      () => {
        console.log("Cursor focused in the address bar or search box.");
        // Simulate typing delay before starting the next search
        setTimeout(() => {
          performSearch();
        }, Math.random() * 2000 + 3000); // Delay between 3-5 seconds
      }
    );
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
      if (!isSearching) {
        isSearching = true;
        currentQueryIndex = 0;
        performSearch();
      }
    } else if (message.action === "stop") {
      isSearching = false;
      if (currentTabId) {
        chrome.tabs.remove(currentTabId, () => {
          console.log("Stopped and closed the tab.");
          currentTabId = null;
        });
      }
    }
    sendResponse({ status: "ok" });
  });
  