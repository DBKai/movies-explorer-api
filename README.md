# Movies Explorer API (Backend)

API позволяет получать и сохранять данные с frontend части проекта [Movies Explorer](https://github.com/DBKai/movies-explorer-frontend/) в базе данных MongoDB.

В данной части проекта реализовано:
- Роуты пользователя, фильмов, авторизации и регистрации
- Защита авторизацией роутов профиля пользователя и фильмов
- Обработка ошибок API
- Хранение пароля в виде хэша, хэш не возвращается клиенту
- Валидация запросов к API по схеме
- Логгирование запросов и ошибок
- Установка заголовков через Helmet
- rate limiter

Ознакомиться с проектом: [https://api.dkay.ru/](https://api.dkay.ru/)

- Версия Node.js [16.15.0](https://nodejs.org/download/release/v16.15.0/)
- Версия npm 8.5.5
## Запуск проекта
1. Клонировать репозиторий
2. Установить зависимости `npm install`
3. Запустить `npm run start`

Проект будет доступен по адресу `http://localhost:3000`
## Генерация токена
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`
