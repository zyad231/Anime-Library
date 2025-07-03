const animeDetailsContainer = document.getElementById(
  "animeDetails"
) as HTMLElement;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  fetch(`https://api.jikan.moe/v4/anime/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const anime = data.data;
      animeDetailsContainer.innerHTML = `
  <div class="flex flex-col md:flex-row gap-8 items-start">
    <!-- Image & Title Section -->
    <div class="md:w-1/2">
      <img src="${anime.images.jpg.image_url}" 
           alt="${anime.title}" 
           class="w-full rounded-lg mb-4 md:mb-0 shadow-lg" />
    </div>

    <!-- Text Details Section -->
    <div class="md:w-1/2 lg:w-full space-y-4">
    <h1 class="text-2xl md:text-4xl font-bold text-indigo-400 mt-4 md:mt-6">
        ${anime.title}
      </h1>
      <p class="text-gray-300 leading-relaxed">
        ${anime.synopsis || "No synopsis available."}
      </p>
      <p class="text-sm text-gray-400">
        Type: <span class="text-white">${anime.type}</span> |
        Rating: <span class="text-white">${anime.rating}</span>
      </p>
      <a href="${anime.url}" target="_blank"
         class="inline-block mt-2 text-indigo-300 underline hover:text-indigo-400">
        View on MyAnimeList
      </a>
    </div>
  </div>
`;
    })
    .catch(() => {
      animeDetailsContainer.innerHTML = `<p class="text-red-500">Failed to load anime details.</p>`;
    });
} else {
  animeDetailsContainer.innerHTML = `<p class="text-red-500">No anime ID provided.</p>`;
}
