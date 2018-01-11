// global variables
var urlList=[];
//var btn = document.getElementsByClassName("btn");
var input = document.getElementById('url');
var list = document.getElementById("list");
//var btnText = btn[0].textContent;
//var btnId = btn[0].id;
//var inputState = input.disabled;
/*
var settings = {
	btnText:btnText,
	btnId:btnId,
	inputState:inputState
};
*/
document.addEventListener('DOMContentLoaded', function() {
    getUrlListAndRestoreInDom();
    // event listener for pressing enter
    input.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
			workTab = input.value;
				if (workTab.length>0 && urlList.indexOf(workTab) === -1){
					//workTab = specialCharacters(workTab);
            		addUrlToDom(workTab);
            		addUrlToListAndSave(workTab);
            		removeAndSave();
            		chrome.browserAction.setBadgeText({text: (list.childNodes.length-1).toString()});
				}else{
					alert("that's already on the list!")
				}	
				input.value ="";
			}	
		});
 		
		removeAndSave();
});

function removeAndSave(){
	document.querySelectorAll('li').forEach(function(el){
        el.addEventListener('click',function(){
        	var removeUrl = this.id;
        	var ul = document.querySelector('ul');
            var remove = document.querySelector('#'+removeUrl);
            var text = document.getElementById(removeUrl).innerHTML;
            setTimeout(function(){
            	ul.removeChild(remove);
            	removeFromArray(urlList,text);
            	saveUrlList(); 	
            },500);
         });
    });
}
	   
function getUrlListAndRestoreInDom(){
    chrome.storage.local.get({urlList:[]},function(data){
        urlList = data.urlList;
        chrome.browserAction.setBadgeText({text: (urlList.length).toString()});
        urlList.forEach(function(url){
            addUrlToDom(url);
        });
        removeAndSave();	
    });
}

function addUrlToDom(url){
    var newLine = document.createElement('li');
    var listLen = (list.childNodes.length -1).toString();
    document.getElementById("list").appendChild(newLine);
    newLine.setAttribute("id", "listID" + listLen);
    sendTaskNumber(listLen);
	newLine.textContent = url;
	
}

function addUrlToListAndSave(url){
	//url = specialCharacters(url);
    if(urlList.indexOf(url) === -1){
        //URL is not already in list
        urlList.push(url);
        saveUrlList();
    }
}

function saveUrlList(callback){
    chrome.storage.local.set({urlList},function(){
        if(typeof callback === 'function'){
            //If there was no callback provided, don't try to call it.
            callback();
        }
    });
}

function removeFromArray(arr, what) {
    var found = arr.indexOf(what);
    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
    chrome.browserAction.setBadgeText({text: (arr.length).toString()});
}

function sendTaskNumber(listLen){
	chrome.runtime.sendMessage({listLen: listLen},
        function (response) {
            console.log("success!")
        });
}
