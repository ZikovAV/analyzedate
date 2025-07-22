// Функция для определения дня недели
function getDayOfWeek(day, month, year) {
  const date = new Date(year, month - 1, day);
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}

// Функция для определения високосного года
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Функция для расчета возраста
function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Функция для создания ASCII-арта цифр звездочками
function createDigitArt(digit) {
  const digits = {
    '0': [
      " *** ",
      "*   *",
      "*   *",
      "*   *",
      " *** "
    ],
    '1': [
      "  *  ",
      " **  ",
      "  *  ",
      "  *  ",
      " *** "
    ],
    '2': [
      " *** ",
      "*   *",
      "  ** ",
      " *   ",
      "*****"
    ],
    '3': [
      " *** ",
      "*   *",
      "  ** ",
      "*   *",
      " *** "
    ],
    '4': [
      "*   *",
      "*   *",
      "*****",
      "    *",
      "    *"
    ],
    '5': [
      "*****",
      "*    ",
      "**** ",
      "    *",
      "**** "
    ],
    '6': [
      " *** ",
      "*    ",
      "**** ",
      "*   *",
      " *** "
    ],
    '7': [
      "*****",
      "    *",
      "   * ",
      "  *  ",
      " *   "
    ],
    '8': [
      " *** ",
      "*   *",
      " *** ",
      "*   *",
      " *** "
    ],
    '9': [
      " *** ",
      "*   *",
      " ****",
      "    *",
      " *** "
    ],
    ' ': [
      "     ",
      "     ",
      "     ",
      "     ",
      "     "
    ]
  };
  
  return digits[digit] || digits[' '];
}

// Функция для создания ASCII-арта даты звездочками
function createDateArt(day, month, year) {
  const dateString = `${day.toString().padStart(2, '0')} ${month.toString().padStart(2, '0')} ${year}`;
  const digitArts = [];
  
  for (let char of dateString) {
    digitArts.push(createDigitArt(char));
  }
  
  let result = [];
  for (let row = 0; row < 5; row++) {
    let line = '';
    for (let digitArt of digitArts) {
      line += digitArt[row] + ' ';
    }
    result.push(line);
  }
  
  return result.join('\n');
}

// Функция для добавления сообщений в консоль
function addConsoleMessage(message, type = 'normal') {
  const console = document.getElementById('console-output');
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `> ${message}`;
  console.appendChild(line);
  console.scrollTop = console.scrollHeight;
}

// Функция валидации ввода
function validateInput(day, month, year) {
  const errors = [];
  
  if (!day || day < 1 || day > 31) {
    errors.push('День должен быть от 1 до 31');
  }
  
  if (!month || month < 1 || month > 12) {
    errors.push('Месяц должен быть от 1 до 12');
  }
  
  if (!year || year < 1900 || year > new Date().getFullYear()) {
    errors.push('Год должен быть от 1900 до текущего года');
  }
  
  // Проверка на корректность даты
  if (errors.length === 0) {
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      errors.push('Некорректная дата');
    }
  }
  
  return errors;
}

// Главная функция расчета
function calculateBirthday() {
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  
  // Очистка предыдущих сообщений консоли
  document.getElementById('console-output').innerHTML = '<div class="console-line">> Начинаем анализ данных...</div>';
  
  // Валидация
  const errors = validateInput(day, month, year);
  if (errors.length > 0) {
    errors.forEach(error => addConsoleMessage(error, 'error'));
    return;
  }
  
  addConsoleMessage('Валидация пройдена успешно');
  addConsoleMessage(`Анализируем дату: ${day}.${month}.${year}`);
  
  // Расчеты
  const dayOfWeek = getDayOfWeek(day, month, year);
  const leapYear = isLeapYear(year);
  const age = calculateAge(day, month, year);
  const asciiArt = createDateArt(day, month, year);
  
  // Отображение результатов
  document.getElementById('age-display').innerHTML = `
    <strong>ВОЗРАСТ:</strong> ${age} лет
  `;
  
  document.getElementById('weekday-display').innerHTML = `
    <strong>ДЕНЬ НЕДЕЛИ:</strong> ${dayOfWeek}
  `;
  
  document.getElementById('leap-year-display').innerHTML = `
    <strong>ВИСОКОСНЫЙ ГОД:</strong> ${leapYear ? 'ДА' : 'НЕТ'}
  `;
  
  document.getElementById('ascii-display').textContent = asciiArt;
  
  // Показать панель результатов
  document.getElementById('results').classList.add('show');
  
  // Сообщения в консоль
  addConsoleMessage(`Возраст пользователя: ${age} лет`);
  addConsoleMessage(`День недели: ${dayOfWeek}`);
  addConsoleMessage(`Високосный год: ${leapYear ? 'Да' : 'Нет'}`);
  addConsoleMessage('ASCII-представление даты сгенерировано');
  addConsoleMessage('Анализ завершен успешно', 'normal');
  
  // ПРАВИЛЬНЫЙ ВЫВОД В КОНСОЛЬ БРАУЗЕРА - дата звездочками
  console.log('='.repeat(60));
  console.log('СИСТЕМА АНАЛИЗА ДАТЫ РОЖДЕНИЯ');
  console.log('='.repeat(60));
  console.log(`Дата рождения: ${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`);
  console.log(`Возраст: ${age} лет`);
  console.log(`День недели: ${dayOfWeek}`);
  console.log(`Високосный год: ${leapYear ? 'Да' : 'Нет'}`);
  console.log('');
  console.log('ДАТА В ФОРМАТЕ ЭЛЕКТРОННОГО ТАБЛО (звездочками):');
  console.log('');
  console.log(asciiArt);
  console.log('');
  console.log('='.repeat(60));
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  const inputs = document.querySelectorAll('input');
  
  calculateBtn.addEventListener('click', calculateBirthday);
  
  // Обработка Enter для автоматического расчета
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        calculateBirthday();
      }
    });
  });
  
  // Автофокус на первое поле
  document.getElementById('day').focus();
  
  addConsoleMessage('Система инициализирована');
  addConsoleMessage('Введите данные для анализа');
});