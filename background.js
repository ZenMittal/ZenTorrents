chrome.contextMenus.create({

	title: "Block all torrents containing \"%s\" ",
	contexts: ["selection"],
	onclick: selectionBlacklist

});

function selectionBlacklist(selectedText){
	var blWord = selectedText.selectionText;
	alert(blWord);
	blockedWords.push(blWord);
}
