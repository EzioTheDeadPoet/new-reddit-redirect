const oldReddit = "https://teddit.net";
const excludedPaths = ["/gallery", "/poll", "/rpan", "/settings", "/topics"];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    if (url.hostname === "teddit.net") return;

    for (const path of excludedPaths) {
      if (url.pathname.indexOf(path) === 0) return;
    }

    return { redirectUrl: oldReddit + url.pathname + url.search + url.hash };
  },
  {
    urls: [
      "*://reddit.com/*",
      "*://www.reddit.com/*",
      "*://np.reddit.com/*",
      "*://amp.reddit.com/*",
      "*://i.reddit.com/*",
    ],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other",
    ],
  },
  ["blocking"]
);
