/*
  Content script is a piece of JavaScript which runs in a tab with specific URL.
  The URL pattern is defined in manifest.json.
  If the URL matched with which is specified in manifest.json, browser will launch the content script.
  It will be terminated while the URL changed, or tab closed.
  If you want to manipulate DOM, you need content script.
*/

window.onload = build;

let Counter = {
  facebook: 0,
  google: 0,
  israelhayom: 0,
  twitter: 0,
  outbrain: 0
}

function build() {
  document.querySelectorAll('script').forEach(function(item){ 
   if(item.src.indexOf('static.ads-twitter') !== -1) {
      Counter.twitter +=1;
      chrome.runtime.sendMessage({
        hostname: window.location.host, 
        service: "twitter",
        message: "trackerFound"
      });
    } else if(item.src.indexOf('connect.facebook') !== -1) {
      Counter.facebook +=1;
      chrome.runtime.sendMessage({
        hostname: window.location.host, 
        service: "facebook",
        message: "trackerFound"
      });
    } else if(item.src.indexOf('odb.outbrain') !== -1) {
      Counter.outbrain +=1;
      chrome.runtime.sendMessage({
        hostname: window.location.host, 
        service: "outbrain",
        message: "trackerFound"
      });
    } else if(item.src.indexOf('googletagmanager') !== -1) {
      Counter.google +=1;
      chrome.runtime.sendMessage({
        hostname: window.location.host, 
        service: "google",
        message: "trackerFound"
      });
    } else if(item.src.indexOf('track-lpp.israelhayom') !== -1) {
      Counter.israelhayom +=1;
      chrome.runtime.sendMessage({
        hostname: window.location.host, 
        service: "israelhayom",
        message: "trackerFound"
      });
    }
  });
  chrome.runtime.sendMessage({
    hostname: window.location.host, 
    trackersInfo: Counter,
    message: "currentTrackers"
  });
}
  