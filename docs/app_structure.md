


```
apps/
  api/
    src/
      books/
        books.routes.ts
        books.controller.ts

  web/
    src/
      features/
        books/
          BooksPage.tsx

packages/
  language/
    src/
      Result.ts
      Option.ts
      Brand.ts

  domain/
    src/
      books/
        Book.ts
        BookRepository.ts

  application/
    src/
      books/
        listBooks.query.ts

  infrastructure/
    src/
      books/
        PrismaBookRepository.ts
        bookRowToDomain.ts

  contracts/
    src/
      books/
        BookDto.ts
```
