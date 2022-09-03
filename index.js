//all the basic styling has been done in this JS file the AJAX calls has been made in other 
//script.js so that code will be simple and easy to understand

const menu_button = document.getElementById('menu_button');


//after clicking menu button show the menu for mobile device only
menu_button.onclick = () => {
  const hamburger_menu = document.getElementById('hamburger_menu_container');
  if (hamburger_menu.style.display == "block") { // if is hamburger_menu displayed, hide it
    hamburger_menu.style.display = "none";
  }
  else { // if is hamburger_menu hidden, display it

    hamburger_menu.style.display = "block";
  }
}


//scroll animation trigger 
const message_container = document.getElementById('welcome-message-container');
window.addEventListener('scroll', () => {
  var coordinates = message_container.getBoundingClientRect();
  const banner = document.getElementById('img-container');
  const header = document.getElementById('header');
  let animate = true;
  if (animate && coordinates.top <= window.innerHeight)//if the section is visible then animate
  {
    animate = false;
    header.classList.add("fixed-header"); 
    header.classList.remove("relative-header");
    banner.style.visibility = "visible";
    banner.style.animation = " fade 2s linear";
  }
  else {
    //so that animation will reset to run it again when scrolled
    banner.style.animation = "none";
    banner.offsetHeight;
    banner.style.animation = null;
    animate = true;
    banner.style.visibility = "hidden";
    header.classList.add("relative-header"); 
    header.classList.remove("fixed-header");
  }
  
});


//trigering query only for mobile devices
const mediaQuery = window.matchMedia('(max-width:768px)')
if (mediaQuery.matches) {
  // Then trigger an alert
  start_comment();
}

//random setInterval for comment section to show comment 
function start_comment() {
  let id = 1;//comment ids
  setInterval(() => {//set interval to show ids 
    document.getElementById("comment" + id).style.display = "none";
    if (id < 3) {
      id++;
      document.getElementById("comment" + id).style.display = "block"
    }
    else {
      id = 1;
      document.getElementById("comment" + id).style.display = "block"
    }
    console.log(id);
  }, 2000)
}

const scroll_up=document.getElementById('sroll-up');
//so that first button is hidden then if window scroll down then it will be visible
window.onscroll = function() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    scroll_up.style.display = "block";
  } else {
    scroll_up.style.display = "none";
  }
}

//scroll up function
scroll_up.addEventListener('click',()=>{
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
