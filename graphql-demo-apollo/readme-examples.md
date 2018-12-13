### Проверка приложения:
	После запуска 
		qraphql сервис http://localhost:4000/graphql
		тестовая консоль http://localhost:4000/ 

### Запрос книги\авторы\коментарии
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

### Вход в приложение
mutation {signIn(login: "admin", password: "admin"){token}}

полученный токен необходимо передавать в header запросов, требующих авторизацию ('HTTP HEADERS' в тестовой консоли внизу слева)
{"x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1NDQ3MTgzNTIsImV4cCI6MTU0NDc2MTU1Mn0.TPa9Qs60crDR-z2jsz7lQmSrjzhI1GyBrcFuf-9ixGw"}


### Подписка
subscription{
  onComment{
    eventType,
    comment{
      id, 
      book {id, author{name}, title},
      user {name},
      createdAt
    }
  }
}

### Создание коментария
mutation{
  createComment(bookId:"book_1_1", content:"some comment"){
    id, createdAt, 
    user {
      name
    }
  }
}
