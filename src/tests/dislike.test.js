import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit
} from "../services/dislikes-service";
import { createTuit } from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('userDislikesTuit', () => {
    const normalUser = {
        username: 'normaluser',
        password: 'normal123',
        email: 'normal@testing.com'
    };
    const dislikeUser = {
        username: 'dislikeuser',
        password: 'dislike123',
        email: 'dislike@testing.com'
    };

    beforeAll(() => {
        deleteUsersByUsername(normalUser.username);
        return deleteUsersByUsername(dislikeUser.username);
    })

    afterAll(() => {
        deleteUsersByUsername(normalUser.username);
        return deleteUsersByUsername(dislikeUser.username);
    })
    test('can dislike a tuit', async () => {
        //stuff
        const normal = await createUser(normalUser);
        const tuitContents = {tuit: "this is my normal tuit"};
        const tuitToDislike = await createTuit(normal._id, tuitContents);

        const dislike = await createUser(dislikeUser);
        
    })
})