function toggleSidebar() { 
    var sidebar = document.querySelector('.sidebar'); 
     sidebar.classList.toggle('open'); 
} 


function toggleForm() {
    var form = document.querySelector('.form');
     form.classList.toggle('openn');
      if (form.classList.contains('openn')) {
        document.querySelector('header').style.zIndex = '-1';
  } else {
    document.querySelector('header').style.zIndex = '100';
  }
}