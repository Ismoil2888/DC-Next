const startScanButton = document.getElementById('startScanButton'); 
const scanner = new Instascan.Scanner({ video: document.getElementById('scanner'), mirror: false }); // mirror: false для использования задней камеры 
let timer; 
 
startScanButton.addEventListener('click', async () => { 
    try { 
        const cameras = await Instascan.Camera.getCameras(); 
        if (cameras.length > 0) { 
            scanner.start(cameras[cameras.length - 1]); // Используем последнюю камеру (заднюю) 
            scanner.addListener('scan', function (content) { 
                alert('QR-код найден: ' + content); 
                clearTimeout(timer); // Сбрасываем таймер при обнаружении QR-кода 
            }); 
            document.getElementById('scanner').style.display = 'block'; 
 
            timer = setTimeout(() => { 
                scanner.stop(); // Останавливаем сканирование после 3 секунд без обнаружения QR-кода
                document.getElementById('scanner').style.display = 'none'; 
                alert('QR-код не найден. Камера закрыта.'); 
            }, 6000); 
        } else { 
            alert('Камера не найдена'); 
        } 
    } catch (error) { 
        console.error('Ошибка при доступе к камере:', error); 
    } 
});