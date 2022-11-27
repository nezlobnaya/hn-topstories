export const getTopStoriesIdsArray = async () => {
  try {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
};

export const getStoriesArray = (storyArray: Array<any>) => {
  return Promise.all(
    storyArray?.map(async (storyIdx: number) => {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyIdx}.json?print=pretty`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        return console.error(err);
      }
    })
  );
};
