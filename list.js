// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

let originalSearch = window.location.search.substring(1);

let currentState = history.state
if (currentState) {
    console.log("exists!!!!")
    originalSearch = currentState.originalSearch
}
console.log(currentState)
console.log(`originL ${originalSearch}`)

/// update for date
let queries = getSearchQueries(originalSearch)
let date = new Date()
let dateString = date.toISOString()
let dateEncoded = encodeURIComponent(dateString)
const isDateCreated = (element) => element.name === "dateCreated";
let dateIndex = queries.findIndex(isDateCreated)
if (dateIndex) {
    queries[dateIndex].value = dateEncoded
}

/// contains the query
var updatedSearch = ""
for (i = 0; i < queries.length; i++) {
    let query = queries[i]
    let name
    if (i == 0) {
        name = `${query.name}=`
    } else {
        name = `&${query.name}=`
    }
    let value = query.value
    let queryString = name + value
    updatedSearch += queryString
}

let linkStem = window.location.pathname + "?"
console.log(`Link: ${linkStem}`)
let schemeStem = "find://" + "type=list&"

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let title = params.title;
let description = params.description;
let icon = params.icon;
let color = params.color;

function decodeString(string) {
    return decodeURIComponent(string);
}

function getSearchQueries(search) {
    let parameters = search.split("&")
    var queries = []

    for (i = 0; i < parameters.length; i++) {
        let parameter = parameters[i]
        let parameterSplit = parameter.split("=")

        let name = parameterSplit[0]
        let value = parameterSplit[1]

        let query = { name: name, value: value }
        queries.push(query)
    }
    return queries
}

function checkClicked() {
    // Get the checkbox
    var checkBox = document.getElementById("check");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        setUpdatedURL()
    } else {
        let stateObj = { originalSearch: originalSearch }
        window.history.replaceState(stateObj, "", linkStem + originalSearch);
        let applink = document.getElementById("applink");
        applink.href = linkStem + originalSearch;
    }
}

function setUpdatedURL() {

    console.log(linkStem)
    console.log(updatedSearch)

    let stateObj = { originalSearch: originalSearch }
    window.history.replaceState(stateObj, "", linkStem + updatedSearch);
    let applink = document.getElementById("applink");
    applink.href = linkStem + updatedSearch;
}

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
        let words = wordsEncoded.map(decodeString);
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
    checkBox.checked = true
    setUpdatedURL()

};
