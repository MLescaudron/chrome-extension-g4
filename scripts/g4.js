/**
 * Get the data send.
 */
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    var data = request.data;
    if (!data) return;
    switch (data.type) {
      case 'endCourse':
        endCourse();
        break;
      default:
    }
    sendResponse('Work in Progress...');
  }
);
setTimeout(function(){
  endCourse();
},2000);
// End course in the page
function endCourse() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('scripts/g4-stop.js');
  console.log(s.src);
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

  // Say to the extension, it's done
  chrome.runtime.sendMessage({ text: 'end', data: {} });
}