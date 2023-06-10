// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
  const allDirectors = moviesArray.map((movie) => movie.director);
  const uniqueDirectors = [];

  allDirectors.filter((director, index, arr) => {
    if (arr.indexOf(director) === index) uniqueDirectors.push(director);
  });

  return uniqueDirectors;
}
// console.log(getAllDirectors(movies));

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (!moviesArray.length) return 0;

  const moviesSpielberg = moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  );

  return moviesSpielberg.length;
}
// console.log(howManyMovies(movies));

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0;

  const totalScore = moviesArray.reduce((acc, curVal) => {
    if (curVal.score) {
      return acc + curVal.score;
    } else {
      return acc;
    }
  }, 0);

  const avg = totalScore / moviesArray.length;

  return +avg.toFixed(2); //toFixed(n) return only strings, therefore we use + before the variable to convert to number
}
// console.log(scoresAverage(movies));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  if (!moviesArray.length) return 0;

  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );

  const avgDramaScore = scoresAverage(dramaMovies);

  return avgDramaScore;
}
// console.log(dramaMoviesScore(movies));

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesCopy = JSON.parse(JSON.stringify(moviesArray));

  const orderAsc = moviesCopy.sort((a, b) => {
    if (a.year > b.year) return 1;
    else if (b.year > a.year) return -1;
    else {
      if (a.title > b.title) return 1;
      else return -1;
    }
  });

  return orderAsc;
}
// console.log(orderByYear(movies));

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesCopy = JSON.parse(JSON.stringify(moviesArray));

  let orderAlph = moviesCopy.sort((a, b) => {
    if (a.title > b.title) return 1;
    else if (b.title > a.title) return -1;
    else return 0;
  });

  orderAlph = orderAlph.slice(0, 20).map((movie) => movie.title);

  return orderAlph;
}
// console.log(orderAlphabetically(movies));

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const moviesCopy = JSON.parse(JSON.stringify(moviesArray));

  const arrConvert = moviesCopy.map((movie) => {
    const duration = movie.duration.split(" ");

    let minutes = duration.map((dur) => {
      if (dur.includes("h")) return parseInt(dur) * 60;
      else return parseInt(dur);
    });

    const totalDuration = minutes.reduce((acc, curVal) => acc + curVal);

    movie.duration = totalDuration;

    return movie;
  });

  return arrConvert;
}
// console.log(turnHoursToMinutes(movies));

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null;

  const moviesByYear = moviesArray.reduce((acc, movie) => {
    const year = movie.year;

    if (!acc[year]) acc[year] = [];
    acc[year].push(movie);

    return acc;
  }, {});

  let bestScore = 0,
    bestYear = 0;

  for (const year in moviesByYear) {
    const totalScore = moviesByYear[year].reduce(
      (acc, movie) => acc + movie.score,
      0
    );
    const avgScore = totalScore / moviesByYear[year].length;
    if (bestScore < avgScore) {
      bestScore = avgScore;
      bestYear = year;
    }
  }
  return `The best year was ${bestYear} with an average score of ${bestScore}`;
}
console.log(bestYearAvg(movies));
