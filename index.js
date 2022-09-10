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

const scroll_up = document.getElementById('sroll-up');
//so that first button is hidden then if window scroll down then it will be visible
window.onscroll = function () {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    scroll_up.style.display = "block";
  } else {
    scroll_up.style.display = "none";
  }
}

//scroll up function
scroll_up.addEventListener('click', () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


//search button hide/show
const search_button = document.querySelector('#right-buttons .fa-magnifying-glass');
const search_box = document.getElementById('search-container');
search_button.addEventListener('click', () => {
  console.log(search_box)
  search_box.style.visibility = "visible";
});

//cross button
const cross_button = document.getElementById('close-button');
cross_button.addEventListener('click', () => {
  search_box.style.visibility = "hidden";
  search_box.style.animation = "none";
  search_box.offsetHeight;
  search_box.style.animation = null;
});



// suggetion box styling on key press and key down
let suggetion_number = 0;//suggetion number id increase it to go further
let suggetion_item = "";
//if user press enter 1 time then its to select the item and if again(without pressing down) press enter then its to submit the form
let enterCount = 1;
const suggetion_input = document.getElementById('search-input');
suggetion_input.addEventListener('keydown', (e) => {
  //if down key is pressed
  if (e.keyCode == '40') {
    enterCount = 1;
    const suggetion_length = document.querySelectorAll('#suggestion-container div').length;//getting length of suggetion so that if user comes at last start to 1 again
    console.log(suggetion_number + "" + suggetion_length);
    //function when user press down key to go to option 
    remove_suggclass();
    suggetion_number++;
    suggetion_item = document.getElementById('suggetion-item' + suggetion_number);
    if (suggetion_item != undefined)
      suggetion_item.classList.add("suggetion-active");
    //if we moved at last and again press down go up
    if (suggetion_number >= suggetion_length)
      suggetion_number = 0;
  }
  if (e.keyCode == 13 && enterCount == 1) {//select the suggetion and show it to input
    e.preventDefault();//so that it will not submit the form on enter just change input value
    const active_suggetion = document.getElementsByClassName('suggetion-active')[0];
    //setting the input box value after pressing enter
    suggetion_input.value = active_suggetion.innerHTML;
    //getting control/cursor back to input box
    suggetion_input.focus();
    enterCount++;
  }
  else if (e.keyCode == 13 && enterCount != 1) {//submit the form 
    enterCount++;
    //submitting the form
    document.getElementById('search-form').submit();
  }
});
//function to remove active-class 
function remove_suggclass() {
  let classes = document.querySelectorAll('.suggetion-active');
  for (let i = 0; i < classes.length; i++) {
    classes[0].classList.remove('suggetion-active');
  }
}




//ingrident checkbox onclick strike down the ingrident


const ingrident_checkbox = document.querySelectorAll('#ingridient input');
ingrident_checkbox.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        //getting parent checkbox
        const paratostrike = checkbox.parentElement;
        //if checked strike it else none
        if (checkbox.checked)
            paratostrike.style.textDecoration = "line-through";
        else
            paratostrike.style.textDecoration = "none";

    })
});




