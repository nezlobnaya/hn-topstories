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


/*In this implementation, we first create a fetch pool of size 10 using the Array and fill methods, 
which creates an array of 10 null values and then replaces them with the fetch function. 
We use the modulo operator (%) to select the next available fetch instance in the pool for each request.

Then, we modify the batch processing logic to use batch.map instead of Promise.all to create an array of promises. 
For each promise, we select the next available fetch instance from the pool using the modulo operator and pass the story ID to the URL. 
We then store the response in the cache and return the data.
Using a fetch pool can limit the number of concurrent requests and reduce the network latency and overhead, 
especially if the API server has rate limits or connection limits.*/
export const getStoriesArray = async (storyArray: Array<any>) => {
  const results = [];
  let batch = [];
  //TODO:experiment with different values for fetchPoolSize
  const fetchPoolSize = 10;
  //FetchPool is an array of fetchPoolSize length that is initialized with null values and then replaced with fetch instances using the map method.
  //This creates a pool of 10 fetch instances that can be reused for multiple requests.
  const fetchPool = Array(fetchPoolSize)
    .fill(null)
    .map(() => fetch);

  for (let i = 0; i < storyArray.length; i++) {
    const storyIdx = storyArray[i];
    const cachedResponse = storyCache.get(storyIdx);
    //If the story is already in the cache (cachedResponse is not undefined), the cached story is pushed to the results array.
    if (cachedResponse !== undefined) {
      results.push(cachedResponse);
    } else {
      //Otherwise, the storyIdx is added to the batch array. 
      batch.push(storyIdx);
      //If the batch array has reached the maximum batch size of 10 or if this is the last element of storyArray, the batch is ready to be processed.
      if (batch.length === 10 || i === storyArray.length - 1) {
        //The batch is mapped to an array of promises,
        //where each promise fetches the story object for a single story ID in the batch. 
        //The fetchInstance is selected from the fetchPool using the modulo operator, 
        //and the story object is parsed from the response and stored in the LRU cache.
        const promises = batch.map(async (storyIdx, idx) => {
          const fetchInstance = fetchPool[idx % fetchPoolSize];
          const res = await fetchInstance(
            `https://hacker-news.firebaseio.com/v0/item/${storyIdx}.json?print=pretty`
          );
          const data = await res.json();
          storyCache.set(storyIdx, data);
          return data;
        });
        // Use Promise.all to execute all the promises in the batch in parallel, and wait for all the responses to be collected. 
        // The results of the batch are then added to the results array using the spread operator (...), and the batch array is reset for the next batch.
        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
        batch = [];
      }
    }
  }

  return results;
};

export const cleanText = (text: string) => {
  return text?.replace(/&#x([0-9A-Fa-f]+);|&quot;|<p>|\[0\]|<a[^>]*>|<\/a>/g, (match, hexCode) => hexCode ? String.fromCharCode(parseInt(hexCode, 16)) : "");
}
