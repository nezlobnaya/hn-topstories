import LRU from 'lru-cache';

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
//TODO:experiment with different values for max and ttl
const storyCache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 });

/**
 * Fetches an array of stories from the Hacker News API based on the provided storyArray.
 * The function processes stories in chunks, allowing for concurrent fetching and improved performance.
 * Cached stories are stored in an LRU cache to reduce the number of API requests and improve loading times.
 * The number of stories fetched can be limited by passing the 'n' query parameter in the URL.
 * The 'n' value must be a number between 1 and 500.
 *
 * @param storyArray - An array of story IDs to fetch.
 * @param limit- The maximum number of stories to fetch (default: 100).
 * @returns A promise that resolves to an array of fetched stories.
 */

export const getStoriesArray = async (storyArray: Array<any>, limit = 100): Promise<Array<any>> => {
  const results = [];

  // Retrieve n from the query string
  const queryParams = new URLSearchParams(window.location.search);
  const n = queryParams.get('n');

  // If n is a number between 1 and 500, set the limit to that value
  if (n !== null && !isNaN(Number(n)) && Number(n) >= 1 && Number(n) <= 500) {
    limit = Number(n);
  }

  // Process stories in chunks
  const chunkSize = 10;
  for (let i = 0; i < storyArray.length && results.length < limit; i += chunkSize) {
    // Slice the storyArray into batches according to the chunkSize
    const batch = storyArray.slice(i, i + chunkSize);

    // Map the batch to an array of promises
    const promises = batch.map(async (storyIdx) => {
      // Check if the story is cached
      const cachedResponse = storyCache.get(storyIdx);

      // If the story is cached, return the cached response
      if (cachedResponse !== undefined) {
        return cachedResponse;
      } else {
        // If the story is not cached, fetch the story data
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyIdx}.json?print=pretty`
        );
        const data = await res.json();
        console.log("fetching story: ", data)
        // Store the fetched story data in the cache
        storyCache.set(storyIdx, data);
        // Return the fetched story data
        return data;
      }
    });

    // Use Promise.all to execute all the promises in the batch concurrently
    const batchResults = await Promise.all(promises);
    // Add the batch results to the overall results array
    results.push(...batchResults);
  }

  // Return the results array sliced according to the limit
  return results.slice(0, limit);
};

export const cleanText = (text: string) => {
  return text?.replace(/&#x([0-9A-Fa-f]+);|&quot;|<p>|\[0\]|<a[^>]*>|<\/a>/g, (match, hexCode) => hexCode ? String.fromCharCode(parseInt(hexCode, 16)) : "");
}
