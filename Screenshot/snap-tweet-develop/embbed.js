const getEmbeddableTweetUrl = (tweetId, options) => {
    const embeddableTweetUrl = new URL('https://platform.twitter.com/embed/Tweet.html');
    const searchParameters = {
        id: tweetId,
        ...options
    };

    for (const key in searchParameters) {
        embeddableTweetUrl.searchParams.set(key, searchParameters[key]);
    }

    return embeddableTweetUrl.toString();
};

// Sample usage
const tweetId = "1646610771302858753"; // Replace with a valid tweet ID
const options = {
    darkMode: true,
    showThread: true,
    locale: "en"
};
const embeddableTweetUrl = getEmbeddableTweetUrl(tweetId, options);
console.log(embeddableTweetUrl); 
