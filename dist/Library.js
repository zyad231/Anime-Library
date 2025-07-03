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
let currentPage = 1;
let lastPage = 1;
function fetchAnime() {
    return __awaiter(this, arguments, void 0, function* (page = 1) {
        try {
            animeGrid.innerHTML = `<p class="text-gray-400 text-center col-span-full">Loading...</p>`;
            const response = yield fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
            const data = yield response.json();
            const animeList = data.data;
            lastPage = data.pagination.last_visible_page;
            currentPage = page;
            displayAnime(animeList);
            updatePagination();
        }
        catch (error) {
            animeGrid.innerHTML = `<p class="text-red-500">Failed to load anime.</p>`;
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
           class="w-full h-56 object-contain bg-black p-1" />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-indigo-300">${anime.title}</h3>
        <p class="text-sm text-gray-400 mt-2 line-clamp-3">${anime.synopsis || "No description."}</p>
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
