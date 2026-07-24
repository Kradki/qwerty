document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const buttons = [
    createButton('►', '1'),
    createButton('2', '◄'),
    createButton('►', '3')
  ];

  // Создаем кнопки
  function createButton(icon, num) {
    const button = document.createElement('li');
    button.innerHTML = `<svg viewBox='0 0 100 100' class='triangle'>
      <polygon points='10,30 90,50 10,70'></polygon>
    </svg><span>${num}</span>`;
    if (icon === '<') button.classList.add('reverse'); // Переворачивает треугольник
    return button;
  }

  // Логика воспроизведения
  let isVideo1Played = false;
  let starsInterval;

  function playVideo(num) {
    const container = document.querySelector(`.video-${num}`);
    
    // Блокируем кнопку "3", если не смотрели первое видео
    if (num !== 1 && !isVideo1Played) {
      document.querySelector('.buttons > :nth-child(3)').classList.add('disabled');
      return;
    }

    // Показываем контейнер
    container.classList.add('active');
    const video = container.querySelector('video');
    video.play();

    // Для второго видео запускаем таймер появления кнопок
    if (num === 2) {
      setTimeout(() => {
        showButtons(isVideo1Played ? [false, true] : [true, true]);
      }, video.duration * 1000 - 20_000); // 20 сек до конца
    }
  }

  // Управление видимостью кнопок
  function showButtons([showBtn1, showBtn3]) {
    const btns = document.querySelectorAll('.buttons > li');
    btns[0].classList.toggle('disabled', !showBtn1);
    btns[2].classList.toggle('disabled', !showBtn3);
  }

  // Инициализация приложения
  app.append(
    ...buttons,
    createVideoContainer('video1.mp4', 1),
    createVideoContainer('video2.mp4', 2),
    createStars(),
    createExit()
  );
  
  // Добавляем обработчики кликов
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      playVideo(i + 1);
      
      // Запоминаем просмотр первого видео
      if (i === 0) isVideo1Played = true;
    });
  }

  // Загрузка завершена
  document.body.classList.remove('loading');
});

// Вспомогательные функции создания элементов
function createVideoContainer(src, num) {
  const el = document.createElement('div');
  el.className = `video-container video-${num}`;
  el.innerHTML = `
    <video autoplay muted playsinline loop>
      <source src="${src}" type="video/mp4">
    </video>
  `;
  return el;
}

function createStars() {
  const el = document.createElement('div');
  el.className = 'stars';
  // Генерируем 100 звёзд
  for(let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    el.append(star);
  }
  return el;
}

function createExit() {
  const el = document.createElement('button');
  el.className = 'exit-button';
  el.onclick = () => window.location.href = 'https://vk.ru/kwewqp';
  return el;
}
