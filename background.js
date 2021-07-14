const newReddit = "https://new.reddit.com";
const excludedPaths = ["/gallery", "/poll", "/rpan", "/settings", "/topics"];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);

    if (url.hostname === "new.reddit.com") return;

    for (const path of excludedPaths) {
      if (url.pathname.indexOf(path) === 0) return;
    }

    return { redirectUrl: newReddit + url.pathname + url.search + url.hash };
  },
  {
    urls: [
      "*://old.reddit.com/*"
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
