import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

//tailoring sample code for dislikes
test('stats render correctly', () => {
  let stats = {
    likes: 123,
    replies: 234,
    retuits: 345,
    dislikes: 140
  }
  
  const dislikeTuit = () => {
    act(() => {
      stats.dislikes++;
      tuitStats.update(
        <TuitStats
          tuit={{stats: stats}}
          dislikeTuit={() => {}}
        />)
    })
  }
  
  let tuitStats
  act(() => {
    tuitStats = create(
      <TuitStats
        dislikeTuit={dislikeTuit}
        tuit={{stats: stats}}/>
    );
  })
  
  const root = tuitStats.root;
  const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
  const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
  const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
  const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
  const dislikeTuitButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

  let likesText = likesCounter.children[0];
  const repliesText = repliesCounter.children[0];
  const retuitsText = retuitsCounter.children[0];
  let dislikesText = dislikesCounter.children[0];
  expect(likesText).toBe('123');
  expect(repliesText).toBe('234');
  expect(retuitsText).toBe('345');
  expect(dislikesText).toBe('140');
  
  act(() => {dislikeTuitButton.props.onClick()})
  dislikesText = dislikesCounter.children[0];
  expect(dislikesText).toBe('141');
});