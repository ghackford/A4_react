import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {MyDislikes} from "../components/profile/my-dislikes";
import axios from "axios";

jest.mock('axios');

const dislikeTesterA = "62429377a917ced74552208b";
const dislikeTesterB = "6242938da917ced74552208d";
const dislikedTuit = "62429436a917ced74552208f";
const dislikeObject = "624295ad5e7f4c02221d77ac";

const MOCKED_DISLIKE = [
    {_id: dislikeObject, tuit: dislikedTuit, dislikedBy: dislikeTesterB}
];

test('dislike list renders static dislike array', () => {
    render(
        <HashRouter>
            <MyDislikes dislikes={MOCKED_DISLIKE}/>
        </HashRouter>);
    const linkElement = screen.getByText(/disliketesterA/i);
    expect(linkElement).toBeInTheDocument();
});