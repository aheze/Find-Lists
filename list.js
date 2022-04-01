// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

/** @typedef {{ name: string; value: string }} SearchParam */

const applink = document.getElementById("applink");
const checkbox = document.getElementById("check");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const wordsList = document.getElementById("words");

const wordsContainer = document.getElementById("wordsContainer");
const updateCreationDateCheckbox =
    document.getElementById("updateCreationDate");

let originalSearch = window.location.search.substring(1);

let currentState = history.state;
if (currentState) {
    console.log("Current history exists");
    originalSearch = currentState.originalSearch;
}
console.log(currentState);
console.log(`original search: ${originalSearch}`);

/**
 * Get the search parameters
 * @param {string} search - A query string
 * @returns {SearchParam[]} The search parameters
 */
const getSearchQueries = (search) => {
    let parameters = search.split("&");
    let queries = [];

    for (i = 0; i < parameters.length; i++) {
        let parameter = parameters[i];
        let parameterSplit = parameter.split("=");

        let name = parameterSplit[0];
        let value = parameterSplit[1];

        let query = { name: name, value: value };
        queries.push(query);
    }

    return queries;
};

/**
 * Generate a query string from an array of parameters
 * @param {SearchParam[]} queries - Query string parameters (generated from {@link getSearchQueries})
 * @returns {string} The query string
 */
const generateQueryString = (queries) =>
    queries.map(({ name, value }) => `${name}=${value}`).join("&");

/**
 * Update the URL
 */
const updateURL = () => {
    const dateCreated = queries.find(({ name }) => name === "dateCreated");
    if (dateCreated) {
        dateCreated.value = encodeURIComponent(new Date().toISOString());
    }
    window.history.replaceState({ originalSearch }, "", link);
    applink.href = deepLink;
};

/**
 * When the checkbox is clicked
 */
const checkClicked = () => updateURL();

const queries = getSearchQueries(originalSearch);

const link = window.location.pathname + `?${generateQueryString(queries)}`;
const deepLink = `find://type=list&${generateQueryString(queries)}`;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

window.onload = () => {
    if (!originalSearch) {
        console.log("No search query.");

        titleElement.innerText = "No Title";
        descriptionElement.innerText = "No Description";

        wordsContainer.classList.add("hidden");
        updateCreationDateCheckbox.classList.add("hidden");

        return;
    }

    titleElement.innerText = params.title ?? "Untitled";
    descriptionElement.innerText = params.description ?? "No Description";

    const wordsParameter = queries.find(({ name }) => name === "words");
    if (wordsParameter) {
        const words = wordsParameter.value.split(",").map(decodeURIComponent);
        console.log(words);

        words.forEach((word) => {
            const p = document.createElement("p");
            p.classList.add("word");
            p.innerText = word;

            wordsList.appendChild(p);
        });
    }
};
