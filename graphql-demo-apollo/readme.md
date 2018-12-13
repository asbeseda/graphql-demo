Функционал:
	graphql сервер на Apollo Server (схема qraphql смотрите в src/schema.graphqls)
	данные в базе данных (sequelize ORM) + начальная заливка данных
	авторизация\аутентификация на основе jwt токена
	ролевая модель доступа к методам и полям (см. комментарии в схеме)
	dataloaders для ускорения запросов (src/loaders)

Установка:
	Должен быть установлен nodejs
	Устанавливаем зависимости приложения:
		npm install

Запуск:		
	Запуск тестов:	
		npm test
		Перед каждым тестом поднимается qraphql server, sqlite база в памяти, база заполняется тестовыми данными
		Тесты вызывают graphql операции приложения через axios 
	Отчет о покрытии тестов:	
		npm run-script nyc
		покрытие можно посмотреть после запуска в браузере coverage/lcov-report/index.html
	Запуск приложения с базой в памяти (для тестов)
		npm run-script start-dev
	Запуск приложения с базой postgresql
		настроить параметры подключения к базе в src/config/.env.prod
		npm start
		при запуске приложения будет созданы необходимые таблицы в базе и заполены тестовые данные:
			параметр src/config/.env.prod .... DB_RECREATE='true'				... пересоздавать базу при запуске?
			параметр src/config/.env.prod .... DB_FILL_WITH_TESTDATA='true'		... заливать базу тестовыми данными?

Логи приложения:
	В консоли и в папке logs
	уровень логирования регулируется параметром LOG_LEVEL='debug'
	для наглядности в параметрах prod конфигурации выставлен уровень debug

Проверка приложения:
	После запуска 
		qraphql сервис http://localhost:4000/graphql
		тестовая консоль http://localhost:4000/ 

Структура:
	src						- Папка с приложением
		schema.graphqls		- GraphQL схема
		index.js			- Скрипт запуска приложения
	src/config				- Папка с конфигурациями приложения для различных NODE_ENV
	src/tests				- Тесты
		

Примеры запросов:

	query{
	  books {
		id, title, releaseDate,
		author {id, name, biography},
		comments {
		  user {id, name}
		  content
		}
	  }
	}

	Операции изменения требуют авторизации:
		вызвать 
			mutation {signIn(login: "admin", password: "admin"){token}}
		полученный токен необходимо передавать в header , требующих авторизацию ('HTTP HEADERS' в тестовой консоли внизу слева)
			{{"x-token": "....."}}
				
	Операции:
		Смотрите схему src/schema.graphqls


IDEA run configurations:
	Server:
		Node interpreter: babel-node.cmd
		Node 
		JS: src\index.js
		ENV: NODE_ENV=dev	
	Mocha
		Node interpreter: node
		Mocha pachage: .\node_modules\mocha
		Extra mocha options: -r @babel/register -r @babel/polyfill
		ENV: NODE_ENV=test
