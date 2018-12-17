GraphQL - спецификация
    https://facebook.github.io/graphql/June2018/
    https://graphql.org/learn/
    https://www.howtographql.com/

Возможности:
    Схема - спецификация всех запросов и форматов данных + документирование
    Интроспекция схемы (introspection query) 
        Получение схемы+документации на клиенте + валидация запроса на клиенте
    Контекст запроса (extends GraphQLContext)
        Переопределяется метод createContext у SimpleGraphQLServlet
    Custom scalar types
        Mожно определить свои типы данных (например DateTime).  
        Для каждого типа надо определить класс тля типа из базового GraphQLScalarType, 
        переопределив базовые методы serialize+parseLiteral
    Custom derectives
    Получение\изменение данных 
        Реализуется через определени GraphQLRootResolver\GraphQLResolver для всех данных, описанных в схеме.
        GraphQL Java Tools автоматически генерирует требуемые по схеме резолверы.
    DataLoader + BatchLoader через DataFetcher
    Pluggable instrumentation
    

Статьи\видео:
    https://habr.com/post/334182/                   - Покойся с миром, REST. Долгих лет жизни GraphQL
    https://habr.com/company/piter/blog/424037/     - Краткий экскурс в GraphQL
    https://habr.com/post/326986/                   - Что же такое этот GraphQL?
    https://habr.com/post/335050/                   - Анатомия запросов GraphQL
    https://habr.com/post/424199/                   - Строим простой GraphQL API сервер на express и nodeJS
    https://habr.com/post/336758/                   - Пишем GraphQL API сервер на Yii2 с клиентом на Polymer + Apollo. Часть 1. Сервер
    https://habr.com/post/412847/                   - graphql — оптимизация запросов к базе данных
    https://habr.com/post/343872/                   - GraphQL — новый взгляд на API. Ч.1

GraphQL JS Implementation
    https://github.com/graphql/graphql-js       - facebook graphql server
    https://facebook.github.io/relay/           - facebook graphql client
    
Apollo
    https://www.apollographql.com/client				https://github.com/apollographql/apollo-client
    https://www.apollographql.com/server				https://github.com/apollographql/apollo-server
    https://github.com/apollographql/react-apollo		https://www.apollographql.com/docs/react/
    https://github.com/apollographql/apollo-angular		https://www.apollographql.com/docs/angular/
    
    https://www.apollographql.com/engine
    
AWS AppSync
    https://blog.apollographql.com/aws-appsync-powered-by-apollo-df61eb706183

GraphQL Java - Java
    https://medium.com/oril/spring-boot-graphql-mongodb-8733002b728a
    http://www.hameister.org/SpringBootGraphQL.html
    https://github.com/graphql-java/java-dataloader
    https://medium.com/@bradbaker/big-movements-in-the-graphql-java-world-67629fd45508
    https://www.programcreek.com/java-api-examples/?api=graphql.schema.idl.RuntimeWiring
    https://www.pluralsight.com/guides/building-a-graphql-server-with-spring-boot
    https://habr.com/post/418083/
    https://github.com/sergeevik/graphQL-tutorial
    https://github.com/howtographql/graphql-java
    https://medium.freecodecamp.org/graphql-java-development-stack-in-production-21f402c4c37a
    https://github.com/graphql-java/graphql-java-http-example/
    https://www.codenotfound.com/graphql-java-spring-boot-example.html

Custom directives
    https://medium.com/open-graphql/graphql-directives-3dec6106c384
    https://www.javatips.net/api/graphql-java-master/src/main/java/graphql/Directives.java
    https://stackoverflow.com/questions/51486035/how-do-i-add-a-custom-directive-to-a-query-resolved-through-a-singleton
    https://stackoverflow.com/questions/51764092/how-to-get-query-mutation-operation-name

GraphqlFieldVisibility
    https://github.com/graphql-java/graphql-java/blob/master/src/main/java/graphql/schema/visibility/GraphqlFieldVisibility.java
    https://stackoverflow.com/questions/45842252/graphql-permissions-documentation

Tracing