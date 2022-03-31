import {
    register, login, logout, profile
} from "../services/security-service"
import {deleteUsersByUsername,findUserByUsername} from "../services/users-service";

const newUser = {
    username: 'registerTest',
    password: 'register123',
    email: 'register@testing.com'
}

const existingUser = {
    username: 'existingUser',
    password: 'existing123',
    email: 'existing@user.com'
}

describe('register', () => {

    beforeAll(() => {
        return deleteUsersByUsername(newUser.username);
    })

    afterAll(() => {
        return deleteUsersByUsername(newUser.username);
    })

    test('can register a new user', async () => {
        const doesUserAlreadyExist = await findUserByUsername(newUser.username);
        console.log(doesUserAlreadyExist);
    })
});