// choosing random images for donate and sharing
var randomDonate = Math.floor(Math.random() * 29);
var randomShare = Math.floor(Math.random() * 29);
var randomRate = Math.floor(Math.random() * 29);
$("#ZenTorrentsDonate").html(
   '<img class="people" src="img/people/' +
   randomDonate +
   '.png">Donate<img class="people" src="img/people/' +
   randomDonate +
   '.png">'
);
$("#ZenTorrentsShare").html(
   '<img class="people" src="img/people/' +
   randomShare +
   '.png">Share<img class="people" src="img/people/' +
   randomShare +
   '.png">'
);
$("#ZenTorrentsRate").html(
   '<img class="people" src="img/people/' +
   randomRate +
   '.png">Rate<img class="people" src="img/people/' +
   randomRate +
   '.png">'
);

// Disables toggle-transparent if porn-filter is unchecked
function toggleDisable () {
   if (document.querySelector("#filter-porn").checked === false) {
      $("#delete-radio")[0].disabled = true;
      $("#highlight-radio")[0].disabled = true;
      document.querySelector(".toggle-transparent").style.color =
         "rgba(0,0,0,0.50)";
   } else {
      $("#delete-radio")[0].disabled = false;
      $("#highlight-radio")[0].disabled = false;
      document.querySelector(".toggle-transparent").style.color =
         "rgba(0,0,0,0.68)";
   }
}

function saveOptions() {
   var filterPorn = document.querySelector("#filter-porn").checked;
   var toggleTransparent = document.querySelector("#highlight-radio").checked;
   console.log(filterPorn, toggleTransparent);
   chrome.storage.sync.set(
      {
         filter_porn: filterPorn,
         make_transparent: toggleTransparent
      },
      function () {
         // Showing 'settings saved!!!' to user
         document.querySelector("#user-alert").textContent = "Settings saved!!!";
         setTimeout(function () {
            document.querySelector("#user-alert").textContent = "";
         }, 1000);
      }
   );
}

// used to render saved options to user
function restoreOptions() {
   // Setting default values as all true (if not provided).
   chrome.storage.sync.get(
      {
         filter_porn: true,
         make_transparent: true
      },
      items => {
         document.querySelector("#filter-porn").checked = items.filter_porn;
         if (items.make_transparent == true){
            document.querySelector("#highlight-radio").checked = true;
         }
         else {
            document.querySelector("#delete-radio").checked = true;
         }
      }
   );
}

function updateDisabling() {
   // Disabling toggle-transparent if porn-filter is unchecked
   setTimeout(toggleDisable, 400);

   document.querySelector("#filter-porn").addEventListener("change", toggleDisable);
}

// Calling all functions;
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save1").addEventListener("click", saveOptions);
document.addEventListener("DOMContentLoaded", updateDisabling);
