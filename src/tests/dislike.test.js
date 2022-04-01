/**
 * @file Dislike.test defines a series of tests around toggling the dislike button
 */
import {
    findDislikeById,
    findAllUsersThatDislikedTuit,
    userDislikesTuit, deleteDislike
} from "../services/dislikes-service";
import { createTuit, deleteTuit, findTuitById } from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

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

/**
 * This test creates two users, normalUser and dislikeUser. It creates
 * a tuit for normalUser and has the dislikeUser dislike that tuit. The test
 * verifies that the number of dislikes increases
 */
describe('userDislikesTuit', () => {

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

        expect(dislikedTuit.stats.dislikes).toEqual(1);
        expect(dislikeObject.tuit).toEqual(dislikedTuit._id);
        expect(dislikeObject.dislikedBy._id).toEqual(dislike._id);

        //clean up
        deleteTuit(dislikedTuit._id);
        deleteDislike(dislikeObject._id);
    })
});

/**
 * This test creates two users, normalUser and dislikeUser. It creates
 * a tuit for normalUser and has the dislikeUser dislike that tuit. The test verifies
 * that the dislike count for the tuit has increased, then has the dislikeUser toggle the
 * dislike. The test then verifies that the dislike count for the tuit has decreased
 */
describe('userTogglesDislikeOff', () => {
    beforeAll(() => {
        deleteUsersByUsername(normalUser.username);
        return deleteUsersByUsername(dislikeUser.username);
    })

    afterAll(() => {
        deleteUsersByUsername(normalUser.username);
        return deleteUsersByUsername(dislikeUser.username);
    })
    test('can undislike a disliked tuit', async () => {
        //create necessary users and tuits
        const normal = await createUser(normalUser);
        const tuitContents = {tuit: "this is my normal tuit"};
        const tuitToDislike = await createTuit(normal._id, tuitContents);
        const dislike = await createUser(dislikeUser);

        //set up dislike on tuit
        const disliking = await userDislikesTuit(dislike._id, tuitToDislike._id);
        const dislikedTuit = await findTuitById(tuitToDislike._id);
        const dislikeObjectWrapped = await findAllUsersThatDislikedTuit(dislikedTuit._id);
        expect(dislikedTuit.stats.dislikes).toEqual(1);

        //test dislike toggle
        const toggleDislike = await userDislikesTuit(dislike._id, dislikedTuit._id);
        const nowUndislikedTuit = await findTuitById(dislikedTuit._id);
        expect(nowUndislikedTuit.stats.dislikes).toEqual(0);

        //check to see if dislike object automatically removed from database
        const checkingIfRemoved = await findDislikeById(dislikeObjectWrapped[0]._id);
        console.log(checkingIfRemoved);
        expect(checkingIfRemoved).toEqual(null);

        //clean up
        deleteTuit(dislikedTuit._id);
    })
});