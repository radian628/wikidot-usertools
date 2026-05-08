export async function getResourceCountCacheGuess(
  exists: (i: number) => Promise<boolean>,
  cacheId: string,
) {
  let initGuess = Number(localStorage.getItem(cacheId));
  if (isNaN(initGuess) || initGuess < 1) initGuess = 1;
  const count = await getResourceCount(exists, initGuess);
  localStorage.setItem(cacheId, count.toString());
  return count;
}

export async function getResourceCount(
  exists: (i: number) => Promise<boolean>,
  initialGuess: number,
) {
  let initialGuessExists = await exists(initialGuess);

  let offset = 1;

  while (true) {
    let guess = initialGuessExists
      ? initialGuess + offset
      : initialGuess - offset;
    if (guess < 1) guess = 1;

    const guessExists = await exists(guess);

    if (!guessExists && guess === 1) {
      return 0;
    }

    if (initialGuessExists !== guessExists) {
      const lo = Math.min(initialGuess, guess);
      const hi = Math.max(initialGuess, guess);
      return getResourceCountBinsearch(lo, hi, exists);
    }

    offset *= 2;
  }
}

async function getResourceCountBinsearch(
  lowerBound: number,
  upperBound: number,
  exists: (i: number) => Promise<boolean>,
) {
  if (upperBound - lowerBound <= 1) {
    return (await exists(upperBound)) ? upperBound : lowerBound;
  }

  const mid = Math.round((upperBound + lowerBound) / 2);

  if (await exists(mid)) {
    return await getResourceCountBinsearch(mid, upperBound, exists);
  } else {
    return await getResourceCountBinsearch(lowerBound, mid, exists);
  }
}
