"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const animeGrid = document.getElementById("animeGrid");
const paginationControls = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const ratingValue = document.getElementById("ratingValue");
const genreFilter = document.getElementById("genreFilter");
const typeFilter = document.getElementById("typeFilter");
const ratingFilter = document.getElementById("ratingFilter");
searchBtn.addEventListener("click", () => {
    currentPage = 1;
    fetchAnime(currentPage);
});
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        currentPage = 1;
        fetchAnime(currentPage);
    }
});
[genreFilter, typeFilter, ratingFilter].forEach((el) => {
    el.addEventListener("change", () => {
        currentPage = 1;
        ratingValue.innerHTML = `Rating ${ratingFilter.value}+`;
        fetchAnime(currentPage);
    });
});
let currentPage = 1;
let lastPage = 1;
function fetchAnime() {
    return __awaiter(this, arguments, void 0, function* (page = 1) {
        try {
            animeGrid.innerHTML = `<p class="text-gray-400 text-center col-span-full">Loading...</p>`;
            const query = searchInput.value.trim();
            const genre = genreFilter.value;
            const type = typeFilter.value;
            const rating = ratingFilter.value;
            const params = new URLSearchParams();
            params.set("page", page.toString());
            if (query)
                params.set("q", query);
            if (genre)
                params.set("genres", genre);
            if (type)
                params.set("type", type);
            if (rating)
                params.set("min_score", rating);
            const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;
            const response = yield fetch(url);
            const data = yield response.json();
            const animeList = data.data;
            lastPage = data.pagination.last_visible_page;
            currentPage = page;
            displayAnime(animeList);
            updatePagination();
        }
        catch (error) {
            animeGrid.innerHTML = `<p class="text-red-500 text-center col-span-full">Failed to load anime.</p>`;
            console.error(error);
        }
    });
}
function displayAnime(animeList) {
    animeGrid.innerHTML = ""; // clear grid
    animeList.forEach((anime) => {
        var _a, _b;
        const imgUrl = ((_b = (_a = anime.images) === null || _a === void 0 ? void 0 : _a.jpg) === null || _b === void 0 ? void 0 : _b.image_url) || "";
        const card = document.createElement("div");
        card.className =
            "bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition";
        card.innerHTML = `
  <img src="${imgUrl}" alt="${anime.title}" 
       class="w-full h-56 object-cover bg-black" />
  <div class="p-4">
    <h3 class="text-lg font-semibold text-indigo-300">
      <a href="details.html?id=${anime.mal_id}" class="hover:underline">
        ${anime.title}
      </a>
    </h3>
    <p class="text-sm text-gray-400 mt-2 line-clamp-3">
      ${anime.synopsis || "No description."}
    </p>
  </div>
`;
        animeGrid.appendChild(card);
    });
}
function updatePagination() {
    var _a, _b;
    paginationControls.innerHTML = `
      <button ${currentPage === 1 ? "disabled" : ""} 
        class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        id="prevPage">
        Previous
      </button>
      <span class="text-gray-300 px-4">Page ${currentPage} of ${lastPage}</span>
      <button ${currentPage === lastPage ? "disabled" : ""}
        class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        id="nextPage">
        Next
      </button>
    `;
    (_a = document.getElementById("prevPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        if (currentPage > 1)
            fetchAnime(currentPage - 1);
    });
    (_b = document.getElementById("nextPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        if (currentPage < lastPage)
            fetchAnime(currentPage + 1);
    });
}
// Start loading
fetchAnime();
