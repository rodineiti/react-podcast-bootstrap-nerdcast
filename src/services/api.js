import axios from "axios";

const api = axios.create({
  baseURL:
    "https://corsanywhere.herokuapp.com/https://jovemnerd.com.br/wp-json/jovemnerd/v1"
});

api.interceptors.request.use(
  function (config) {
    addLoading();
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  function (response) {
    removeLoading();
    return response;
  },
  function (err) {
    removeLoading();
    return Promise.reject(err);
  }
);

const addLoading = () => {
  document.body.classList.add("preloader");

  if (document.getElementById("sidebar")) {
    document.getElementById("sidebar").classList.remove("active");
  }

  if (!document.getElementById("preloader")) {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    const divPreloader = document.createElement("div");
    divPreloader.setAttribute("id", "preloader");

    const divBox = document.createElement("div");
    divBox.classList.add("preloader-box");

    for (let i = 0; i <= 3; i++) {
      const div = document.createElement("div");
      div.classList.add("item");
      div.classList.add("item-" + (i + 1));
      divBox.appendChild(div);
    }

    divPreloader.appendChild(divBox);

    document.body.appendChild(divPreloader);
  }
};

const removeLoading = () => {
  document.body.classList.remove("preloader");
  if (document.getElementById("preloader")) {
    document.getElementById("preloader").remove();
  }
};

export const getPodcasts = (page = 1, order = "desc", search = "") => {
  let filter = `search=${search}`;

  if (Number.isInteger(parseInt(search, 10))) {
    filter = `id=${parseInt(search, 10)}`;
  }

  return api.get(
    `/nerdcasts?per_page=12&page=${page}&order=${order}&${filter}`
  );
};

const apis = {
  getPodcasts
};

export default apis;
