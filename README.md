# Дипломная работа. Movies Explorer API

Проект Movies Explorer - это сервис, в котором можно найти фильм по запросу и сохранить в личном кабинете. 

В данной части проекта реализована API для регистрации, авторизации, операций над фильмами.

Домен: [https://api.dkay.ru/](https://api.dkay.ru/)

IP-адрес: 188.225.42.160

- Версия Node.js [16.15.0](https://nodejs.org/download/release/v16.15.0/)
- Версия npm 8.5.5
## Запуск проекта
1. Клонировать репозиторий
2. Установить зависимости `npm install`
3. Запустить `npm start`

Проект будет доступен по адресу http://localhost:3000
## Генерация токена
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`
