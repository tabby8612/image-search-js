const API_KEY = "BQJPYuO8v-m1T4yzxU7GCGqmt5FVA8rXz3akDyZ5LdQ";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let previousSearchTerm;


async function getPhoto() {
    keyword = searchBox.value;
    previousSearchTerm = keyword;


    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${API_KEY}&per_page=12`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data.results[0].urls);

    const results = data.results;

    results.forEach(result => {
        const img = document.createElement("img");
        img.src = result.urls.small;

        const a = document.createElement("a");
        a.href = result.links.html;
        a.target = "_blank";

        a.appendChild(img);
        searchResult.appendChild(a);

    });

    showMore.style.visibility = "visible";

}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (searchBox.value != keyword) {
        searchResult.innerHTML = "";
        showMore.style.visibility = "hidden";
    }

    getPhoto();

});


showMore.addEventListener("click", () => {
    page++;
    getPhoto();
});