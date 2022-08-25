const menu_button=document.getElementById('menu_button');
//after clicking menu button show the menu for mobile device only
menu_button.onclick=()=>{
    const hamburger_menu=document.getElementById('hamburger_menu_container');
     if(hamburger_menu.style.display == "block") { // if is hamburger_menu displayed, hide it
        hamburger_menu.style.display = "none";
      }
      else { // if is hamburger_menu hidden, display it
        
        hamburger_menu.style.display = "block";
      }
}