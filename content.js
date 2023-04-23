chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  var guid =
    generateGuid()
      .toUpperCase();

  if (request.action == "insertAndCopy") {
    var element = document.activeElement;
    element.value = guid;
    copyToClipboard(guid);
  }
  else if (request.action == "copy") {
    copyToClipboard(guid);
  }
});

function generateGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function copyToClipboard(guid)
{
  navigator.clipboard.writeText(guid)
    .then(() => {
      sendNotification("Guid Generator", "GUID Copied To Clipboard");
    })
    .catch((err) => {
      sendNotification("Guid Generator", err, "error");
    });
}

function sendNotification(title, message, type='basic')
{
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: title,
      message: message,
      iconUrl: 'images/icon.png',
      type: type
    }
  });
}
