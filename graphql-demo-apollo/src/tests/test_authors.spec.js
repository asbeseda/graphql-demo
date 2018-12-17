import { describe, it } from 'mocha';
import { expect } from 'chai';

const app = require("./../app");
const postGraphQL = require("./test_api").postGraphQL;
const loadJSONFile = require("./test_api").loadJSONFile;

describe(`Test AUTHORS`, () => {
    before(async function() {
        await app.start();
    });

    after(async function() {
        await app.stop();
    });

    describe(`Test for unauthorized user`, () => {
        it('Return findAuthor(id: author_1)', async () => {
            const query = `query { findAuthor(id: "author_1") {id, name, biography, books {id, releaseDate, title, description, comments {id, user {id, name}, content}}} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_author_1.json");
            expect(data).to.eql(expectedData);
        });

        it('Return findAuthor(name: Rowling, J. K.)', async () => {
            const query = `query { findAuthor(name: "Rowling, J. K.") {id, name, biography, books {id, releaseDate, title, description, comments {id, user {id, name}, content}}} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_author_1.json");
            expect(data).to.eql(expectedData);
        });

        it(`Returns error while createAuthor()`, async () => {
            const query = `mutation {createAuthor(name: "author", biography: "biography") {id} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors}} = result;
            expect(status).to.eql(200);
            expect(errors[0].message).to.eql("Not authenticated as user.");
        });

        it('Returns error while changeAuthor()', async () => {
            const query = `mutation{changeAuthor(id: "author_1", name: "RenamedAuthor"){id,name,biography}}`;
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

        it('changeAuthor(id: "author_1", name: "newName")', async () => {
            const query = `mutation{changeAuthor(id: "author_1", name: "newName"){id,name,biography}}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_author_1_after_change_name.json");
            expect(data).to.eql(expectedData);
        });

        it('changeAuthor(id: "author_1", biography: "newbiography")', async () => {
            const query = `mutation{changeAuthor(id: "author_1", biography: "newbiography"){id,name,biography}}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_author_1_after_change_name_and_biography.json");
            expect(data).to.eql(expectedData);
        });

        it('deleteAuthor(id: "author_1")', async () => {
            const query = `mutation { deleteAuthor(id: "author_1") }`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = {deleteAuthor: true};
            expect(data).to.eql(expectedData);
        });

        it('Return books() after delete author_1', async () => {
            const query = `query { books { id, author {id, name} , releaseDate, title, description, comments {id, user {id, name}, content} }}`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = {"books": []};
            expect(data).to.eql(expectedData);
        });

    });
});
