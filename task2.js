// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js

// Функція для отримання даних про користувачів
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Мережа відповіла з помилкою');
        }
        return await response.json();
    } catch (error) {
        console.error('Виникла проблема з отриманням даних:', error);
    }
}

// Функція для знаходження користувача за ім'ям
async function getUserByName() {
    const userName = document.getElementById('userNameInput').value.trim();
    const userCitySpan = document.getElementById('userCity');

    if (!userName) {
        userCitySpan.textContent = 'Будь ласка, введіть ім\'я користувача.';
        return;
    }

    const users = await fetchUsers();

    const user = users.find(u => u.name.toLowerCase() === userName.toLowerCase());

    if (user) {
        userCitySpan.textContent = `Місто: ${user.address.city}`;
    } else {
        userCitySpan.textContent = 'Користувача не знайдено.';
    }
}

// Додати обробник події до кнопки
document.getElementById('getUserButton').addEventListener('click', getUserByName);