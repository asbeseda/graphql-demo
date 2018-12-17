import { describe, it } from 'mocha';
import { expect } from 'chai';

const server = require("./../server");
const postGraphQL = require("./test_api").postGraphQL;
const loadJSONFile = require("./test_api").loadJSONFile;

describe(`Test BOOKS`, () => {
    before(async function() {
        await server.start();
    });

    after(async function() {
        await server.stop();
    });

    describe(`Test for unauthorized user`, () => {
        it('Return books()', async () => {
            const query = `query { books { id, author {id, name} , releaseDate, title, description, comments {id, user {id, name}, content} }}`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_books.json");
            expect(data).to.eql(expectedData);
        });

        it('Return findBook(id: book_1_1)', async () => {
            const query = `query { findBook(id: "book_1_1") {id, author {id, name}, releaseDate, title, description, comments {id, user {id, name}, content}} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_book_1.json");
            expect(data).to.eql(expectedData);
        });

        it(`Return findBook(title: "Harry Potter and the Philosopher's Stone")`, async () => {
            const query = `query { findBook(title: "Harry Potter and the Philosopher's Stone") {id, author {id, name}, releaseDate, title, description, comments {id, user {id, name}, content}} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_book_1.json");
            expect(data).to.eql(expectedData);
        });

        it(`Returns error while createBook()`, async () => {
            const query = `mutation {createBook(authorId: "author_1", title: "title") {id} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors}} = result;
            expect(status).to.eql(200);
            expect(errors[0].message).to.eql("Not authenticated as user.");
        });

        it('Returns error while changeBook()', async () => {
            const query = `mutation{changeBook(id:"book_1_1",releaseDate:"26 June 1997",authorId:"author_1",title:"RenamedBook"){id,title,description}}`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors}} = result;
            expect(status).to.eql(200);
            expect(errors[0].message).to.eql("Not authenticated as user.");

        });
    });

    describe(`Login as admin and create users`, () => {
        require("./test_api_create_users").loginAsAdminAndCreateUsers();
    });

    describe('Tests for authorized user',  () => {
        it('changeBook(id:"book_1_1", title:"newtitle")', async () => {
            const query = `mutation{changeBook(id:"book_1_1", title:"newtitle"){id,author{id},releaseDate,title,description}}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_book_1_after_change_title.json");
            expect(data).to.eql(expectedData);
        });

        it('changeBook(id:"book_1_1", description:"newdescription")', async () => {
            const query = `mutation{changeBook(id:"book_1_1", description:"newdescription"){id,author{id},releaseDate,title,description}}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_book_1_after_change_title_and_description.json");
            expect(data).to.eql(expectedData);
        });

        it('deleteBook(id: "book_1_1")', async () => {
            const query = `mutation { deleteBook(id: "book_1_1") }`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = {deleteBook: true};
            expect(data).to.eql(expectedData);
        });

        it('Return books() after delete book_1_1', async () => {
            const query = `query { books { id, author {id, name} , releaseDate, title, description, comments {id, user {id, name}, content} }}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_books_after_delete.json");
            expect(data).to.eql(expectedData);
        });
    });
});
