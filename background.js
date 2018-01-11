var urlList = [];
chrome.storage.local.get({urlList:[]},function(data){
        urlList = data.urlList;
        chrome.browserAction.setBadgeText({text: (urlList.length).toString()});
    });
