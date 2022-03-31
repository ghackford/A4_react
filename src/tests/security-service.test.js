/**
 * @file Security-service.test defines a series of tests around authentication
 */
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
    username: 'existinguser',
    password: 'existing123',
    email: 'existing@user.com'
}

const logoutUser = {
    username: 'logoutuser',
    password: 'logout123',
    email: 'logout@testing.com'
}

const profileUser = {
    username: 'profileuser',
    password: 'profile123',
    email: 'profile@testing.com'
}

/**
 * This test registers a new user and verifies that the database stores
 * the new user data correctly
 */
describe('register', () => {
    beforeAll(() => {
        return deleteUsersByUsername(newUser.username);
    })

    afterAll(() => {
        return deleteUsersByUsername(newUser.username);
    })
    test('can register a new user', async () => {
        //make sure the new user doesn't already exist
        const doesUserAlreadyExist = await findUserByUsername(newUser.username);
        expect(doesUserAlreadyExist).toEqual("");

        //register new user
        const newlyRegisteredUser = await register(newUser);

        //fetch newly registered user and check data
        const checkforNewUser = await findUserByUsername(newlyRegisteredUser.username)
        expect(checkforNewUser._id).toEqual(newlyRegisteredUser._id);
        expect(checkforNewUser.username).toEqual(newlyRegisteredUser.username);
        expect(checkforNewUser.email).toEqual(newlyRegisteredUser.email);
    })
});

/**
 * This test logs in as an existing user and verifies that the correct data
 * is fetched from the database
 */
describe('login', () => {
    test('can login as existing user', async () => {
        //check that user already exists
        const fetchedUser = await findUserByUsername(existingUser.username);
        expect(fetchedUser.username).toEqual(existingUser.username);

        //login as user and verify response data
        const loginAsUser = await login(existingUser);
        expect(loginAsUser._id).toEqual(fetchedUser._id);
        expect(loginAsUser.username).toEqual(fetchedUser.username);
        expect(loginAsUser.email).toEqual(fetchedUser.email);
        expect(loginAsUser.password).toEqual('*****');
    })
});

/**
 * This test logs in and logs out as an existing user and verifies that the server
 * response with an OK code on logout
 */
describe('logout', () => {
    test('can logout as existing user', async () => {
        //check that user already exists
        const fetchedUser = await findUserByUsername(logoutUser.username);
        expect(fetchedUser.username).toEqual(logoutUser.username);

        //login as user
        const loginAsUser = await login(logoutUser);
        expect(loginAsUser._id).toEqual(fetchedUser._id);

        //logout and check received status from server
        const logoutAsUser = await logout(logoutUser);
        expect(logoutAsUser).toEqual('OK');
    })
});

/**
 * This test ensures that the user profile is accessible
 */
describe('profile', () => {
    test('can access profile when logged in', async () => {
        //check that user already exists
        const fetchedUser = await findUserByUsername(profileUser.username);
        expect(fetchedUser.username).toEqual(profileUser.username);

        //login as user
        const loginAsUser = await login(profileUser);
        expect(loginAsUser._id).toEqual(fetchedUser._id);

        //access profile
        const accessProfile = await profile();
        expect(accessProfile._id).toEqual(fetchedUser._id);
        expect(accessProfile.username).toEqual(fetchedUser.username);
        expect(accessProfile.email).toEqual(fetchedUser.email);
        expect(accessProfile.password).toEqual('*****');
    })  
})