// global variables
var urlList=[];
var btn = document.getElementsByClassName("btn");
var input = document.getElementById('url');
var btnText = btn[0].textContent;
var btnId = btn[0].id;
var inputState = input.disabled;
var settings = {
	btnText:btnText,
	btnId:btnId,
	inputState:inputState
};
document.addEventListener('DOMContentLoaded', function() {
    getUrlListAndRestoreInDom();
    // event listener for pressing enter
    
    input.addEventListener("keyup", function(event){
		if(event.keyCode == 13){
			workTab = input.value;
				if (workTab.length>0 && urlList.indexOf(workTab) === -1){
					workTab = specialCharacters(workTab);
            		addUrlToDom(workTab);
            		addUrlToListAndSave(workTab);
            		removeAndSave();
				}	
				input.value ="";
			}	
		});
		removeAndSave();

		btn[0].addEventListener("click",function(event){
			if(btn[0].textContent =="START"){
				btn[0].textContent ="STOP";
				btn[0].id = "start-clicked";
				input.disabled = true;
			}else if(btn[0].textContent=="STOP"){
				btn[0].textContent = "START";
				btn[0].id = "start-new";
				input.disabled = false;
			}
		});
});

function removeAndSave(){
	document.querySelectorAll('li').forEach(function(el){
        el.addEventListener('click',function(){
            var removeUrl = this.id;
            var ul = document.querySelector('ul');
            var remove = document.querySelector('#'+removeUrl);
            ul.removeChild(remove);
            removeFromArray(urlList,removeUrl);
            saveUrlList();
         });
    });
}
	   
function getUrlListAndRestoreInDom(){
    chrome.storage.local.get({urlList:[]},function(data){
        urlList = data.urlList;
        urlList.forEach(function(url){
            addUrlToDom(url);
        });
        removeAndSave();	
    });
}

function addUrlToDom(url){
    var newLine = document.createElement('li');
    document.getElementById("list").appendChild(newLine);
    newLine.setAttribute("id", url);
	url = switchBack(url);
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
}
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

function specialCharacters(workTab){
	 workTab = workTab.replaceAll(".","_0_");
				workTab = workTab.replaceAll("?","1-_0");
				workTab = workTab.replaceAll(">","2-_0");
				workTab = workTab.replaceAll("<","3-_0");
				workTab = workTab.replaceAll(",","4-_0");
				workTab = workTab.replaceAll(",","5-_0");
				workTab = workTab.replaceAll("!","6-_0");
				workTab = workTab.replaceAll("@","7-_0");
				workTab = workTab.replaceAll("#","8-_0");
				workTab = workTab.replaceAll("$","9-_0");
				workTab = workTab.replaceAll("%","10_0");
				workTab = workTab.replaceAll("&","11_0");
				workTab = workTab.replaceAll("*","12_0");
				workTab = workTab.replaceAll("(","13_0");
				workTab = workTab.replaceAll(")","14_0");
				workTab = workTab.replaceAll("(","15_0");
				workTab = workTab.replaceAll("+","16_0");
				workTab = workTab.replaceAll("=","17_0");
				workTab = workTab.replaceAll("\"","18_0");
				workTab = workTab.replaceAll("\'","19_0");
				workTab = workTab.replaceAll("/","20_0");
				workTab = workTab.replaceAll("{","22_0");
				workTab = workTab.replaceAll("}","23_0");
				workTab = workTab.replaceAll("[","24_0");
				workTab = workTab.replaceAll("]","25_0");
				workTab = workTab.replaceAll(";","26_0");
				workTab = workTab.replaceAll(":","27_0");
			return workTab;
}

function switchBack(workTab){
				workTab = workTab.replaceAll("_0_",".");
				workTab = workTab.replaceAll("1-_0","?");
				workTab = workTab.replaceAll("2-_0",">");
				workTab = workTab.replaceAll("3-_0","<");
				workTab = workTab.replaceAll("4-_0",",");
				workTab = workTab.replaceAll("5-_0",",");
				workTab = workTab.replaceAll("6-_0","!");
				workTab = workTab.replaceAll("7-_0","@");
				workTab = workTab.replaceAll("8-_0","#");
				workTab = workTab.replaceAll("9-_0","$");
				workTab = workTab.replaceAll("10_0","%");
				workTab = workTab.replaceAll("11_0","&");
				workTab = workTab.replaceAll("12_0","*");
				workTab = workTab.replaceAll("13_0","(");
				workTab = workTab.replaceAll("14_0",")");
				workTab = workTab.replaceAll("15_0","(");
				workTab = workTab.replaceAll("16_0","+");
				workTab = workTab.replaceAll("17_0","=");
				workTab = workTab.replaceAll("18_0","\"");
				workTab = workTab.replaceAll("19_0","\'");
				workTab = workTab.replaceAll("20_0","/");
				workTab = workTab.replaceAll("22_0","{");
				workTab = workTab.replaceAll("23_0","}");
				workTab = workTab.replaceAll("24_0","[");
				workTab = workTab.replaceAll("25_0","]");
				workTab = workTab.replaceAll("26_0",";");
				workTab = workTab.replaceAll("27_0",":");
			return workTab;
	
}

