d3.json("/data/albums.json").then(function (data) {
  console.log(data);

  //Do all operations inside the callback function - otherwise the data will not be available

  d3.select("#dataJSON").append("h2").text("JSON Data:");

  d3.select("#dataJSON")
    .selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .text(function (album) {
      return (
        album.artistName +
        " - " +
        album.albumName +
        " - " +
        album.trackList.length
      );
    });

  /*Create an array of objects from the data and pass that to the function in order to display 
  custom info not readily available in the JSON data*/

  let cdObjects = [];
  for (let i in data) {
    let cd = new CD(
      data[i].artistName,
      data[i].albumName,
      data[i].trackList.length
    );
    cdObjects.push(cd);
  }

  console.log(cdObjects);

  d3.select("#dataOBJ").append("h2").text("Object Data:");
  d3.select("#dataOBJ")
    .selectAll("p")
    .data(cdObjects)
    .enter()
    .append("p")
    .text(function (albumObj) {
      return (
        albumObj.artist +
        " - " +
        albumObj.title +
        " - " +
        albumObj.numberOfTracks
      );
    });
});

//Constructor function for CD objects
function CD(artist, title, numberOfTracks) {
  this.artist = artist;
  this.title = title;
  this.numberOfTracks = numberOfTracks;
}
