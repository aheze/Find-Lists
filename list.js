// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let title = params.title;
let description = params.description;
let icon = params.icon;
let color = params.color;
let dateCreated = params.dateCreated;


console.log(title)
console.log(description)
console.log(icon)
console.log(color)
console.log(dateCreated)

let search = window.location.search.split("&words=")
let wordsString = search[1]
let wordsEncoded = wordsString.split(",")
let words = wordsEncoded.map(decodeString)
console.log(words)

function decodeString(string) {
    return decodeURI(string)
}
