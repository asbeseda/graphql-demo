import logger from './../utils/logger';

export async function migration() {
    const now = require('moment')().format();

    logger.debug(`>>> Fill db with test data.`);

    // Add authors and books
    await models.Author.create({
        id: 'author_1',
        name: 'Rowling, J. K.',
        biography:
        'Joanne Rowling (born July 31, 1965), who goes by the pen name J.K. Rowling, ' +
        'is a British author and screenwriter best known for her seven-book Harry Potter children\'s book series. ' +
        'J.K. Rowling was living in Edinburgh, Scotland, and struggling to get by as a single mom before her first book, ' +
        'Harry Potter and the Sorcerer\'s Stone, was published. The children\'s fantasy novel became ' +
        'an international hit and Rowling became an international literary sensation in 1999 ' +
        'when the first three installments of Harry Potter took over the top three slots of The ' +
        'New York Times best-seller list after achieving similar success in her native United Kingdom. ' +
        'The series has sold more than 450 million copies and was adapted into a blockbuster film franchise. ' +
        'Rowling published the novel The Casual Vacancy in 2012, followed by the crime novel Cuckoo Calling ' +
        'under the pen name Robert Galbraith in 2013. In 2016, she released a play, Harry Potter and the Cursed Child, ' +
        'and a movie, Fantastic Beasts and Where to Find Them.'
    });

    await models.Book.create({
        id: 'book_1_1',
        authorId: 'author_1',
        title: 'Harry Potter and the Philosopher\'s Stone',
        releaseDate: '26 June 1997',
        description: 'Some description about Harry Potter and the Philosopher\'s Stone'
    });
    await models.Book.create({
        id: 'book_1_2',
        authorId: 'author_1',
        title: 'Harry Potter and the Chamber of Secrets',
        releaseDate: '2 July 1998',
        description: 'Some description about Harry Potter and the Chamber of Secrets'
    });

    await models.Comment.create({
        id: 'comment_1_1_1',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #1 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_2',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #2 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_3',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #3 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_4',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #4 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_5',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #5 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_6',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #6 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_7',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #7 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_8',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #8 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_9',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #9 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_10',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #10 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_11',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #11 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_12',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #12 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_13',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #13 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_14',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #14 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_15',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #15 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_16',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #16 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_17',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #17 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_18',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #18 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_19',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #19 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_20',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #20 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
    await models.Comment.create({
        id: 'comment_1_1_21',
        bookId: 'book_1_1',
        userId: 'admin',
        content: 'Comment #21 for Harry Potter and the Philosopher\'s Stone',
        createdAt: now
    });
}
