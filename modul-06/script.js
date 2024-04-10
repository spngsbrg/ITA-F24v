//Magi - det taler vi om senere!!
async function fetchData(url) {
  let response = await fetch(url);
  let json = await response.json();
  return json;
}

function printAlbumsOnPage(albums, htmlElement) {
  for (let a in albums) {
    htmlElement.innerHTML += albums[a].albumName + "<br/>";
  }
}
let data;
let element;

fetchData("/albums.json").then(function (json) {
  console.log("Normal callback: " + json);
  element = document.getElementById("content");
  data = json;

  //printAlbumsOnPage(json, element);
});

printAlbumsOnPage(data, element);

/*
fetchData("/albums.json").then((data) => {
  console.log("Arrow notation callback: " + data);
});
*/
