const axios = require("axios");

// const User = require("./userModel");

exports.feed = async (req, res, next) => {
  // and array that contains different dataTypes of data to be sent
  const feedArray = [];

  try {
    // Fetch News
    // const newsArray = await getNews();

    //Fetch Quotes //3
    const quotesArray = await getQuotes();
    // //Fetch Jokes //2
    const jokesArray1 = await getJokes();
    const jokesArray2 = await getJokes();

    // //Fetch Marvel events //2
    const marvelArray = await getMarvelContent(1, 2);

    //Fetch Rick and Morty //2
    const rickmortyArray1 = await getRickandMorty();
    const rickmortyArray2 = await getRickandMorty();

    //Fetch Streams //2
    const streamArray = await getStreams();

    //Fetch Anime //2
    const animeArray = await getAnime();

    feedArray.push(
      ...quotesArray,
      jokesArray1,
      jokesArray2,
      rickmortyArray1,
      rickmortyArray2,
      ...streamArray,
      ...animeArray,
      ...marvelArray
    );
    return res.status(200).json({ feed: feedArray });
  } catch (error) {
    next(error);
  }
};

const getNews = async () => {
  const response = await axios.get({
    url: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b2c023068d9944db87cb4e7c1f437874",
  });

  const articles = response.data.articles;
  const newsArray = {
    dataType: "news",
    ...articles,
  };
  return newsArray;
};

const getQuotes = async () => {
  const response = await axios.get(
    "https://api.quotable.io/quotes?page=1&limit=3"
  );

  // console.log(response.data);
  const quotesArray = response.data.map((qt) => {
    return { dataType: "quotes", ...qt };
  });

  return quotesArray;
};

const getJokes = async () => {
  // https://api.chucknorris.io/jokes/random
  const response = await axios.get("https://api.chucknorris.io/jokes/random");

  const jokesArray = {
    icon: response.data.icon_url,
    text: response.data.value,
    dataType: "jokes",
  };
  return jokesArray;
};

const getMarvelContent = async (page, limit) => {
  const offset = page * limit;

  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/events?apikey=fd06f8787ce037e8a776bc2a6d2f7478&hash=bb7777e0708eca80cb1393f71ed4e67d&ts=1&limit=${limit}&offset=${offset}`
  );

  const events = response.data.data.results;
  // console.log(events);

  const marvelArray = events.map((ev) => {
    return { dataType: "marvel", ...ev };
  });

  return marvelArray;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRickandMorty = async () => {
  const randid = getRandomNumber(826, 1);
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${randid}`
  );

  const ramArray = {
    dataType: "rickmorty",
    ...response.data,
  };

  return ramArray;
};

const getStreams = async () => {
  var options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/search/basic",
    params: {
      country: "us",
      service: "netflix",
      type: "movie",
      genre: "18",
      page: "1",
      output_language: "en",
      language: "en",
    },
    headers: {
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      "x-rapidapi-key": "7b3dddefe1msheb8ab51a9e386f1p114d8ejsn6f6d49dd4d69",
    },
  };

  const response = await axios.request(options);
  const ind1 = getRandomNumber(8, 1);
  let ind2 = getRandomNumber(8, 1);
  if (ind1 == ind2) ind2 = getRandomNumber(8, 1);

  const streamArray = [
    {
      dataType: "stream",
      ...response.data.results[ind1],
    },
    {
      dataType: "stream",
      ...response.data.results[ind2],
    },
  ];

  return streamArray;
};

const getAnime = async () => {
  const response = await axios.get("https://api.aniapi.com/v1/random/anime/2");

  const animeArray = [
    {
      dataType: "anime",
      ...response.data.data[0],
    },
    {
      dataType: "anime",
      ...response.data.data[1],
    },
  ];

  return animeArray;
};
