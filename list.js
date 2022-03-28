// ?title=title&description=some%20devs&icon=bubble.left&color=4283699240&dateCreated=2022-03-28T19%3A33%3A10Z&words=another%20word,hi

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let title = params.title;
let description = params.description;
let icon = params.icon;
let color = params.color;
let dateCreated = params.dateCreated;
let words = params.words;

console.log(title)
console.log(description)
console.log(icon)
console.log(color)
console.log(dateCreated)
console.log(words)

