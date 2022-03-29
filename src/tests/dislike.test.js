import {
    findAllTuitsDislikedByUser,
    findAllUsersThatDislikedTuit,
    userDislikesTuit, deleteDislike
} from "../services/dislikes-service";
import { createTuit, deleteTuit, findTuitById } from "../services/tuits-service";
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
        //create necessary users and tuits
        const normal = await createUser(normalUser);
        const tuitContents = {tuit: "this is my normal tuit"};
        const tuitToDislike = await createTuit(normal._id, tuitContents);
        const dislike = await createUser(dislikeUser);

        //query server for updated data objects
        const disliking = await userDislikesTuit(dislike._id, tuitToDislike._id);
        const dislikedTuit = await findTuitById(tuitToDislike._id);
        const dislikeObjectWrapped = await findAllUsersThatDislikedTuit(dislikedTuit._id);
        const dislikeObject = dislikeObjectWrapped[0];

        expect(dislikedTuit.stats['dislikes']).toEqual(1);
        expect(dislikeObject.tuit).toEqual(dislikedTuit._id);
        expect(dislikeObject.dislikedBy._id).toEqual(dislike._id);

        //clean up
        deleteTuit(dislikedTuit._id);
        deleteDislike(dislikeObject._id);
    })
})