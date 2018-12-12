var totalBlockedWords = blockedWords
   .concat(blockedCompanies)
   .concat(blockedStars)
   .concat(blockedSingles);

// resultArea array contains the HTML selection of all torrent sites where they show their torrent search results.
var resultArea = [
   "tr td.ttable_col1", //glodls 'Adult XXX' Tag
   "tr td.ttable_col2", //glodls Search Results
   "tr td.text-nowrap", //zooqle Search Results
   "tr td.tdleft", //limetorrents.cc and torrentdownload.ch Search Results
   "tr td.tor_", //Omegatorrents.cc Search Results
   "tr td.desc", //torrent.cd Search Results
   "tr td.torrent_name", //monova.org Search Results
   "tr td.tname", //bt-scene.cc Search Results
   "tr.lista2 td.lista", //rarbg.to Search Results
   "tr td.coll-1.name", //1337x Search Results
   "#tabl-results tr td", //tooff Search Results
   "tr td.nowrap.ttitle", //torrentz.to Search Results
   "li h2.item-title", //btdb.in Search Results
   "div.torrent", //torrentproject Search Results
   "div.detName", //piratebay Search Results (It needs to hide godparent)
   "tr td.vertTh", //piratebay 'Porn' tag Search Results
   "div.resultdivtop", //idope.se Search Results
   "div.grey_bar3 p", //torrentdownloads.me Search Results
   "div.results dl dt", //Torrentz2.eu Search Results
   "tr td.ZenTorrents" //Search Results from all other sites like pirateiro, TPB, torrent.cd, bt-scene and torlock
   // "#similarfiles div span",                     //torrentproject Search Results ()
   // "table.torrenttable tr td",                   //pirateiro Search Results (Takes too much time because of many TD's)
   // "table.torrentsTable tbody tr td",            // perhaps for bittorrent.am Search Results (Takes too much time because of many TD's)
];

///////////////// Adding Class ZenTorrents to sites with too common resultArea ///////////////////

// Many sites (like torrentz2.eu) don't include specific classes to their resultAreas for targeting purposes.
// But if you include, "tr td"  or "dl dt" , directly (to resultArea array) then it will block all 'tr's' on all
// of the websites containing just simple words (but vulger from torrenting concern) like 'Sister' or 'Sex'. So adding
// the class ZenTorrents to specific torrent sites only, so that other websites won't be effected by this extension.

// var torSites = [
//   /torrents\.me/,
//   /torlock/,
//   // /bittorrent\.am/,
// ]

// for (var i = 0; i < torSites.length; i++) {
//   if (document.URL.match(torSites[i])){
//      $("tr td").addClass("ZenTorrents");
//      $("dl dt").addClass("ZenTorrents");
//   }
// }

////////////////// Main code to hide results with totalBlockedWords except allowedWords  //////////////////

// Main code runs inside chrome storage because of storage API being asynchronous.
chrome.storage.sync.get(
   // Setting default values as all true (if not provided).
   {
      filter_porn: true,
      make_transparent: true
   },
   // what is this? lol should've added a comment here when I wrote this
   items => {
      // Retrieveing setting from options.html
      filterPorn = items.filter_porn;
      enableTransparent = items.make_transparent;

      // making the main code run only if filterPorn is true
      if (filterPorn) {
         // Main Code begin here
         for (var r = 0; r < resultArea.length; r++) {
            for (var i = 0; i < $(resultArea[r]).length; i++) {
               // Check quickly against common and assured non-porn results and whitelist them first
               for (var n = 0; n < noCheckList.length; n++) {
                  if ($(resultArea[r])[i].innerText.match(noCheckList[n])) {
                     $($(resultArea[r])[i])
                        .parent()
                        .css("background", "#fefefe");
                     // console.log($(resultArea[r])[i].innerText);
                     // console.log(`"${noCheckList[n]}"`);
                  }
               }

               // Allow the whitelisted items and exclude them against block check as well
               if (
                  $($(resultArea[r])[i])
                     .parent()
                     .css("background-color") != "rgb(254, 254, 254)"
               ) {
                  for (var k = 0; k < allowedWords.length; k++) {
                     if ($(resultArea[r])[i].innerText.match(allowedWords[k])) {
                        $($(resultArea[r])[i])
                           .parent()
                           .css("background", "#fefefe");
                     }
                  }
               }

               // If enableTransparent is on (true) then run this code
               if (enableTransparent) {
                  // Block check all remaining torrents
                  if (
                     $($(resultArea[r])[i])
                        .parent()
                        .css("background-color") != "rgb(254, 254, 254)"
                  ) {
                     // console.log(`checking for block at ${i} with background-color ${$($(resultArea[r])[i]).parent().css("background-color")}`)
                     for (var j = 0; j < totalBlockedWords.length; j++) {
                        if ($(resultArea[r])[i].innerText.match(totalBlockedWords[j])) {
                           $($(resultArea[r])[i])
                              .parent()
                              .css("background", "#FFBFB9");
                           $($(resultArea[r])[i])
                              .parent()
                              .find("a")
                              .attr(
                                 "href",
                                 "https://www.yourbrainonporn.com/uncle-bob-porn-addiction-recovery-tips"
                              );
                           // console.log("blocked at " + i);
                           break;
                        }
                     }
                  }
               }
               // But if enableTransparent is off (false) then run this code
               else if (!enableTransparent) {
                  // Block check all remaining torrents
                  if (
                     $($(resultArea[r])[i])
                        .parent()
                        .css("background-color") != "rgb(254, 254, 254)"
                  ) {
                     // console.log(`checking for block at ${i}`)
                     for (var j = 0; j < totalBlockedWords.length; j++) {
                        if ($(resultArea[r])[i].innerText.match(totalBlockedWords[j])) {
                           $($(resultArea[r])[i])
                              .parent()
                              .find("a")
                              .attr(
                                 "href",
                                 "https://www.yourbrainonporn.com/uncle-bob-porn-addiction-recovery-tips"
                              );
                           $($(resultArea[r])[i])
                              .parent()
                              .css("display", "none");
                           // console.log("blocked at " + i);
                           break;
                        }
                     }
                  }
               } // else if not transparent ends
            } // 2nd loop end (for checking each result)
         } // 1st for Loop (for all kind of resultAreas) ends
      } // if(filterPorn) ends
   }
); // chrome.storage.sync.get ends
