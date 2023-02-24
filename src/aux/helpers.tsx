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
<<<<<<< Updated upstream
=======

export const cleanText = (text: string) => {
  return text?.replace(/&#x([0-9A-Fa-f]+);|&quot;|<p>|\[0\]|<a[^>]*>|<\/a>/g, (match, hexCode) => hexCode ? String.fromCharCode(parseInt(hexCode, 16)) : "");
}
>>>>>>> Stashed changes
