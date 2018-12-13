import {describe, it} from "mocha";
import {expect} from "chai";

const post = require("./test_api").postGraphQL;

export const loginAsAdminAndCreateUsers = () => {
    it('signIn() as admin', async () => {
        const query = `mutation { signIn(login: "admin", password: "admin") {token} }`;
        const result = await post(query, {}, null);
        const {status: status, data: {errors: errors, data: data}} = result;
        expect(status).to.eql(200);
        expect(errors).to.be.undefined;

        const {signIn: { token }} = data;
        expect(token).to.be.a('string');
        global.token_admin = token;
    });

    it('signUp() User1', async () => {
        const query = `mutation { signUp(name: "User1", login: "user1", password: "user1") {token} }`;
        const result = await post(query, {}, null);
        const {status: status, data: {errors: errors, data: data}} = result;
        expect(status).to.eql(200);
        expect(errors).to.be.undefined;

        const {signUp: { token }} = data;
        expect(token).to.be.a('string');
        global.token_user1 = token;
    });

    it('setUserRoles() [AUTHORS_CREATE, BOOKS_CREATE] for User1 by admin', async () => {
        const query = `mutation { setUserRoles(login: "user1", roles: "AUTHORS_CREATE, BOOKS_CREATE") {roles} }`;
        const result = await post(query, {}, token_admin);
        const {status: status, data: {errors: errors, data: data}} = result;
        expect(status).to.eql(200);
        expect(errors).to.be.undefined;

        const expectedData = {setUserRoles: { roles: "AUTHORS_CREATE, BOOKS_CREATE" }};
        expect(data).to.eql(expectedData);
    });
}
