// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

/** @typedef {{ name: string; value: string }} SearchParam */

let originalSearch = window.location.search.substring(1);

let currentState = history.state;
if (currentState) {
    console.log("exists!!!!");
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
 * Update the URL
 */
const setUpdatedURL = () => {
    let stateObj = { originalSearch };
    window.history.replaceState(stateObj, "", linkStem + updatedSearch);

    const applink = document.getElementById("applink");
    applink.href = schemeStem + updatedSearch;
};

/**
 * When the checkbox is clicked
 */
const checkClicked = () => {
    const checkBox = document.getElementById("check");
    setUpdatedURL();
};

/// update for date
let queries = getSearchQueries(originalSearch);
console.debug(queries);
let date = new Date();
let dateString = date.toISOString();
let dateEncoded = encodeURIComponent(dateString);
const isDateCreated = (element) => element.name === "dateCreated";
let dateIndex = queries.findIndex(isDateCreated);
if (dateIndex) {
    queries[dateIndex].value = dateEncoded;
}

// contains the query
var updatedSearch = "";
for (i = 0; i < queries.length; i++) {
    let query = queries[i];
    let name;
    if (i == 0) {
        name = `${query.name}=`;
    } else {
        name = `&${query.name}=`;
    }
    let value = query.value;
    let queryString = name + value;
    updatedSearch += queryString;
}

let linkStem = window.location.pathname + "?";
console.log(`Link: ${linkStem}`);
let schemeStem = "find://" + "type=list&";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let title = params.title;
let description = params.description;
let icon = params.icon;
let color = params.color;

window.onload = () => {
    if (!originalSearch) {
        console.log("No search.");
        return;
    }

    let titleElement = document.getElementById("title");
    titleElement.innerText = title ?? "Untitled";

    let descriptionElement = document.getElementById("description");
    descriptionElement.innerText = description ?? "No Description";

    let searchSplitWords = originalSearch.split("&words=");
    let wordsString = searchSplitWords[1];
    if (wordsString) {
        let wordsEncoded = wordsString.split(",");
        let words = wordsEncoded.map(decodeURIComponent);
        console.log(words);

        let wordsList = document.getElementById("words");
        words.forEach((word) => {
            let p = document.createElement("p");
            p.classList.add("word");
            p.innerText = word;
            wordsList.appendChild(p);
        });
    }

    var checkBox = document.getElementById("check");
    checkBox.checked = true;
    setUpdatedURL();
};
