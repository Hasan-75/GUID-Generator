chrome.contextMenus.create({
    id: 'generate-guid',
    title: 'Generate GUID',
    contexts: ['page', 'editable']
  });

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'generate-guid') {
    if (info.editable)
    {
      chrome.tabs.sendMessage(tab.id, {action: "insertAndCopy"});
    }
    else
    {
      chrome.tabs.sendMessage(tab.id, {action: "copy"});
    }
  }
}); 

chrome.runtime.onMessage.addListener(data => {
  if (data.type === 'notification') {
    chrome.notifications.create('', data.options);
  }
});