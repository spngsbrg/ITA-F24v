/* author = { name: "Thomas Hvid Spangsberg", email: "thsp@eaaa.dk" };

let content =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc convallis interdum eleifend. Sed tempor eget sapien et fermentum. Sed a ante lacinia, adipiscing ligula at, euismod ipsum. Mauris ullamcorper congue mauris vitae venenatis. Integer dictum dui eget quam rhoncus, sit amet tempor orci cursus. Praesent nec ultrices nisl. Nam quis justo felis. Etiam dapibus condimentum augue vitae fermentum. Sed tempus mi justo.";

let heading = "Overskrift 1";

const article = { author: author, content: content, heading: heading };

//author.name = "hest";

console.log(article);

let mainContentArea = document.getElementById("main-content-area");

let articleToInsert = "";

for (let i = 0; i < 10; i++) {
  articleToInsert =
    "<div id='" +
    (i + 1) +
    "' class='content'>" +
    "<h1>" +
    article.heading +
    "</h1>" +
    "<p class='inner-content'>" +
    article.content +
    "</p>" +
    "<p class='author'>" +
    article.author.name +
    "</p>" +
    "<p class='contact'>" +
    article.author.email +
    "</p>" +
    "</div>";

  mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
}

articleToInsert =
  "<div id='1' class='content'>" +
  "<h1>" +
  article.heading +
  "</h1>" +
  "<p class='inner-content'>" +
  article.content +
  "</p>" +
  "<p class='author'>" +
  article.author.name +
  "</p>" +
  "<p class='contact'>" +
  article.author.email +
  "</p>" +
  "</div>";

mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;*/
//document.write(articleToInsert);

let mainContentArea = document.getElementById("main-content-area");

fetchData("/modul-03/data.json").then((data) => {
  console.log(data);

  //for (let i = 0; i < data.length; i++)

  data.forEach(generateAndInsertArticles);

  /*HUSK sekvensen af parametrene i funktionen!!! 
    første = elementet/værdien
    andet = index for elementet/værdien
    tredje = selve arrayet, vi arbejder på
  */

  function generateAndInsertArticles(value, index, array) {
    console.log(value);
    console.log(index);
    console.log(array);

    let author = "";
    let email = "";

    if (value.author == "Foo Bar") {
      author = "Anomymous";
      email = "info@info.com";
    } else {
      author = value.author;
      email = value.email;
    }

    let articleToInsert =
      "<div id='" +
      value.id +
      "' class='content'>" +
      "<h1>" +
      value.heading +
      "</h1>" +
      "<p class='inner-content'>" +
      value.content +
      "</p>" +
      "<p class='author'>" +
      author +
      "</p>" +
      "<p class='contact'>" +
      email +
      "</p>" +
      "</div>";

    mainContentArea.innerHTML = mainContentArea.innerHTML + articleToInsert;
  }

  let authorElements = document.getElementsByClassName("author");

  console.log(authorElements);

  for (let i = 0; i < authorElements.length; i++) {
    if (authorElements[i].innerText === "Anomymous") {
      authorElements[i].style.color = "pink";
      console.log(authorElements[i]);
    }
  }
});

//Magi - det taler vi om senere!!
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
