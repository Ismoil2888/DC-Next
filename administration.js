const notificationContainer = document.querySelector('.notificationalrt');
const notificationText = document.querySelector('.notificationalrt-text');   
const closeButtonAlert = document.querySelector('.alrtclose');

function showNotification(message) {
  notificationText.textContent = message;
  notificationContainer.classList.add('alrtshow');
  // Добавьте анимацию для появления и исчезновения уведомления
  setTimeout(() => {
    notificationContainer.classList.remove('alrtshow');
  }, 4000); // Скрыть уведомление через 3 секунды
}
closeButtonAlert.addEventListener('click', () => {
  notificationalrt.classList.remove('alrtshow');
});

// Административный интерфейс на странице administration.html
// Загружаем заявки и отображаем их на странице
function loadRequests() {
    const requests = JSON.parse(localStorage.getItem('changeRequests')) || [];
    const requestContainer = document.getElementById('requestContainer');

    requests.forEach((request, index) => {
        const requestBlock = document.createElement('div');
        requestBlock.className = 'request-block';
        requestBlock.innerHTML = `
            <p><strong>Имя:</strong> ${request.name}</p>
            <p><strong>Номер телефона:</strong> ${request.number}</p>
            <p><strong>Баланс:</strong> ${request.balance}</p>
            <button class="approve-btn" data-index="${index}">Принять</button>
            <button class="reject-btn" data-index="${index}">Отклонить</button>
        `;
        requestContainer.appendChild(requestBlock);
    });

    document.querySelectorAll('.approve-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const request = requests[index];

            // Обновление данных пользователя
            localStorage.setItem('newName', request.name);
            localStorage.setItem('newNumber', request.number);
            localStorage.setItem('balanceView', parseFloat(request.balance.replace(',', '.')));
            localStorage.setItem('balanceInCard', parseFloat(request.balance.replace(',', '.')));
            localStorage.setItem('userNotification', 'Администрация приняла вашу заявку!'); // Уведомление пользователю

            requests.splice(index, 1);
            localStorage.setItem('changeRequests', JSON.stringify(requests));

            showNotification('Заявка принята! Данные пользователя обновлены.');

            requestContainer.innerHTML = '';
            loadRequests();
        });
    });

    document.querySelectorAll('.reject-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');

            // Уведомление пользователю
            localStorage.setItem('userNotification', 'Администрация отклонила вашу заявку!');

            requests.splice(index, 1);
            localStorage.setItem('changeRequests', JSON.stringify(requests));

            showNotification('Заявка отклонена! Пользователю отправлено уведомление.');

            requestContainer.innerHTML = '';
            loadRequests();
        });
    });
}

if (window.location.pathname.includes('administration.html')) {
    loadRequests();
}