export const isBrowser = () => typeof window !== "undefined";

export const getPodcasts = () =>
  isBrowser() && window.localStorage.getItem("podcasts-watched")
    ? JSON.parse(window.localStorage.getItem("podcasts-watched"))
    : [];

export const setPodcast = (podcast) => {
  let podcasts = getPodcasts();
  if (!podcasts.includes(podcast)) {
    podcasts.push(podcast);
  }
  window.localStorage.setItem("podcasts-watched", JSON.stringify(podcasts));
};

export const isPodcastWatched = (podcast) => {
  const podcasts = getPodcasts();
  return !!podcasts.includes(podcast);
};
