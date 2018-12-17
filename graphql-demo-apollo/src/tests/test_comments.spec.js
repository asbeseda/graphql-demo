import { describe, it } from 'mocha';
import { expect } from 'chai';

const server = require("./../server");
const postGraphQL = require("./test_api").postGraphQL;
const loadJSONFile = require("./test_api").loadJSONFile;

describe(`Test COMMENTS`, () => {
    before(async function() {
        await server.start();
    });

    after(async function() {
        await server.stop();
    });

    describe(`Test for unauthorized user`, () => {
        it('Return comments()', async () => {
            const query = `query { comments {id, user {id, name}, content} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_coments.json");
            expect(data).to.eql(expectedData);
        });

        it('Return comments() w/o id', async () => {
            const query = `query { comments {user {name}, content} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_coments_wo_id.json");
            expect(data).to.eql(expectedData);
        });

        it(`Returns error while createComment()`, async () => {
            const query = `mutation {createComment(bookId: "book_1_1", content: "content") {id} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors}} = result;
            expect(status).to.eql(200);
            expect(errors[0].message).to.eql("Not authenticated as user.");
        });

        it(`Returns error while changeComment()`, async () => {
            const query = `mutation{changeComment(id: "comment_1_1", content: "content") {id} }`;
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

        it(`changeComment(id: "comment_1_1_21", content: "newcontent")`, async () => {
            const query = `mutation{changeComment(id: "comment_1_1_21", content: "newcontent") {id, book {id}, user {id}, content} }`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_coment_after_change.json");
            expect(data).to.eql(expectedData);
        });

        it('deleteComment(id: "comment_1_1_21")', async () => {
            const query = `mutation { deleteComment(id: "comment_1_1_21") }`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = {deleteComment: true};
            expect(data).to.eql(expectedData);
        });
    });
});
