/*
  A piece of code which is launched when the extension launched, and won't be terminated until extension removed or browser shutdown.
  Background code has access to all chrome APIs, other parts are limited. 
  But background doesn't have an UI and can not access DOM.
*/


Array.prototype.inArray = function(comparer) { 
  for(let index=0; index < this.length; index++) { 
    if(comparer(this[index])) return true; 
  }
  return false; 
};

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 

let trackersData = {
  facebook: [],
  google: [],
  israelhayom: [],
  twitter: [],
  outbrain: []
};

let currentTrackers = {
  facebook: 0,
  google: 0,
  israelhayom: 0,
  twitter: 0,
  outbrain: 0
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {  
  switch(request.message) {
    case "trackerFound":
      trackersData[request.service].pushIfNotExist(request.hostname, function(e) { 
        return e === request.hostname; 
      });
      break;

    case "currentTrackers":
      currentTrackers = request.trackersInfo;
      break;

    default:
      sendResponse({trackersData, currentTrackers})
      return true;
  }

});