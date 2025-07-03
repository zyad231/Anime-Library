interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

const animeGrid = document.getElementById("animeGrid") as HTMLElement;
const paginationControls = document.getElementById("pagination") as HTMLElement;

let currentPage = 1;
let lastPage = 1;

async function fetchAnime(page: number = 1): Promise<void> {
  try {
    animeGrid.innerHTML = `<p class="text-gray-400 text-center col-span-full">Loading...</p>`;
    const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
    const data = await response.json();
    const animeList: Anime[] = data.data;
    lastPage = data.pagination.last_visible_page;
    currentPage = page;

    displayAnime(animeList);
    updatePagination();
  } catch (error) {
    animeGrid.innerHTML = `<p class="text-red-500">Failed to load anime.</p>`;
    console.error(error);
  }
}

function displayAnime(animeList: Anime[]): void {
  animeGrid.innerHTML = ""; // clear grid

  animeList.forEach((anime) => {
    const imgUrl = anime.images?.jpg?.image_url || "";

    const card = document.createElement("div");
    card.className =
      "bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition";

      card.innerHTML = `
      <img src="${imgUrl}" alt="${anime.title}" 
           class="w-full h-56 object-contain bg-black p-1" />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-indigo-300">${anime.title}</h3>
        <p class="text-sm text-gray-400 mt-2 line-clamp-3">${
          anime.synopsis || "No description."
        }</p>
      </div>
    `;

    animeGrid.appendChild(card);
  });
}

function updatePagination(): void {
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

  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) fetchAnime(currentPage - 1);
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < lastPage) fetchAnime(currentPage + 1);
  });
}

// Start loading
fetchAnime();
