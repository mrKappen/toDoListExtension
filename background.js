chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        //obtains a unique array with all the urls the user entered to save
         var tabs = request.url;
         tabs = tabs.filter( function( item, index, inputArray ) {//removes duplicates
         return inputArray.indexOf(item) == index;
        });
        }
      );
/*
function getCorrectUrl(tab){
  //tab = tab.replace(" ","");
  //tab = tab.replace("https","");
  //tab = tab.replace("http","");
  //tab = "https:" + tab;
  var patt = new RegExp(/[a-z]+\.[a-z]+/igm);
  var isTab = patt.test(tab);

  if(isTab){
    finTab = tab;
  }
  else{
    finTab = tab + ".com"; 
  }
  return finTab; // puts inputted urls into the correct format
}
*/