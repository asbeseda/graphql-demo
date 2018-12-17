import { describe, it } from 'mocha';
import { expect } from 'chai';

const server = require("./../server");
const postGraphQL = require("./test_api").postGraphQL;
const loadJSONFile = require("./test_api").loadJSONFile;

describe(`Test USERS`, () => {
    before(async function() {
        await server.start();
    });

    after(async function() {
        await server.stop();
    });

    describe(`Test for unauthorized user`, () => {
        it('Returns null when request whoami()', async () => {
            const query = `query { whoami { id, name }}`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = {whoami: null};
            expect(data).to.eql(expectedData);
        });

        it('Return findUser(id: admin) with public fields', async () => {
            const query = `query { findUser(id: "admin") {id, name} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_admin_public_fields.json");
            expect(data).to.eql(expectedData);
        });

        it('Return findUser(name: Администратор) with public fields', async () => {
            const query = `query { findUser(name: "Администратор") {id, name} }`;
            const result = await postGraphQL(query, {}, null);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_admin_public_fields.json");
            expect(data).to.eql(expectedData);
        });
    });

    describe(`Login as admin and create users`, () => {
        require("./test_api_create_users").loginAsAdminAndCreateUsers();
    });

    describe('Tests for authorized user',  () => {
        it('Returns findUser(id: admin) all fields (allowed only for admin)', async () => {
            const query = `query { findUser(id: "admin") { id, name, login, roles}}`;
            const result = await postGraphQL(query, {}, token_admin);
            const {status: status, data: {errors: errors, data: data}} = result;
            expect(status).to.eql(200);
            expect(errors).to.be.undefined;

            const expectedData = loadJSONFile(__dirname+"/data/expected_admin_all_fields.json");
            expect(data).to.eql(expectedData);
        });

    });
});
