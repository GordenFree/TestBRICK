// Импорт модуля http для создания сервера
const http = require('http');
const crypto = require('crypto');
// Получение UUID хоста 
const uuid = crypto.randomBytes(16).toString('hex')
// Функция для обработки запросов
function handleRequest(request, response) {
  // Получение имени хоста 
  const hostname = process.env.HOSTNAME || 'localhost';
  // Установка заголовков ответа
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем запросы из любого источника

  switch (request.url) {
    case '/hostname':
      // Возвращаем имя хоста, на котором запущено приложение
      response.end(hostname);
      break;
    case '/author':
      // Возвращаем значение переменной окружения $AUTHOR, в которой задано имя или никнейм человека, выполняющего это задание
      const author = process.env.AUTHOR || 'gorden1987';
      // Отправляем ответ с именем автора
      response.end(author);
      break;
    case '/id':
      // Возвращаем значение переменной окружения $UUID, содержащее любую произвольную строку-идентификатор в формате uuid
      response.end(uuid);
      break;
    default:
      // Обработка других запросов
      response.statusCode = 404;
      response.end();
  }
}

// Создание сервера и прослушивание порта 8000
const server = http.createServer((req, res) => {
  handleRequest(req, res);
});
server.listen(8000, () => {
  console.log('Сервер запущен на порту 8000');
});