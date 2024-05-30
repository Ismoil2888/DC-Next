const eyeIcon = document.getElementById('eye-icon'); 
 
eyeIcon.addEventListener('click', function() { 
  if (eyeIcon.name === 'eye-outline') { 
    eyeIcon.name = 'eye'; 
  } else { 
    eyeIcon.name = 'eye-outline'; 
  } 
}); 


const eyeIconchik = document.getElementById('eye-icon'); 
const hideBalance = document.querySelector('.hide-balance'); 
const balanceView = document.querySelector('.balance-view'); 
 
let isHidden = false; 
 
eyeIconchik.addEventListener('click', function() { 
  if (isHidden) { 
    hideBalance.style.display = 'none'; 
    balanceView.style.display = 'block'; 
    isHidden = false; 
  } else { 
    hideBalance.style.display = 'block'; 
    balanceView.style.display = 'none'; 
    isHidden = true; 
  } 
}); 




const showNotificationBtn = document.getElementById('showNotification'); 
const notification = document.getElementById('notification'); 
 
showNotificationBtn.addEventListener('click', () => { 
  notification.style.display = 'block'; 
  setTimeout(() => { 
    notification.style.top = '20px'; // спускаем уведомление 
    setTimeout(() => { 
      notification.style.top = '-90px'; // поднимаем уведомление обратно 
      setTimeout(() => { 
        notification.style.display = 'none'; 
      }, 500); 
    }, 2000); 
  }, 0); 
});