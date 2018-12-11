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

function saveOptions() {
   var filterPorn = document.querySelector("#filter-porn").checked;
   var toggleTransparent = document.querySelector("#toggle-transparent").checked;
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

function restoreOptions() {
   // Setting default values as all true (thus checked).
   chrome.storage.sync.get(
      {
         filter_porn: true,
         make_transparent: true
      },
      items => {
         console.log(items.filter_porn);
         document.querySelector("#filter-porn").checked = items.filter_porn;
         document.querySelector("#toggle-transparent").checked =
            items.make_transparent;
      }
   );
}

function updateDisabling() {
   // Disabling toggle-transparent if porn-filter is unchecked
   setTimeout(function () {
      if (document.querySelector("#filter-porn").checked === false) {
         $("#toggle-transparent")[0].disabled = true;
         document.querySelector(".toggle-transparent").style.color =
            "rgba(0,0,0,0.50)";
      } else {
         $("#toggle-transparent")[0].disabled = false;
         document.querySelector(".toggle-transparent").style.color =
            "rgba(0,0,0,0.68)";
      }
   }, 400);

   document.querySelector("#filter-porn").addEventListener("change", function () {
      if (document.querySelector("#filter-porn").checked === false) {
         $("#toggle-transparent")[0].disabled = true;
         document.querySelector(".toggle-transparent").style.color =
            "rgba(0,0,0,0.50)";
      } else {
         $("#toggle-transparent")[0].disabled = false;
         document.querySelector(".toggle-transparent").style.color =
            "rgba(0,0,0,0.68)";
      }
   });
}

// Calling all functions;
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save1").addEventListener("click", saveOptions);
document.addEventListener("DOMContentLoaded", updateDisabling);
