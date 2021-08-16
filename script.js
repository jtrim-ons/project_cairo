function init() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", showInfo);
  oReq.open("GET", "auto-generated/all_metadata.json");
  oReq.send();
}

function showInfo() {
  var allMetadata = JSON.parse(this.response);
  allMetadata.reverse();
  console.log(allMetadata)
  allMetadata.forEach(function(d, i) {
    setTimeout(function() {
      processResponse(d);
    }, i * 20)
  });
}

window.addEventListener('DOMContentLoaded', init);

// Function that will process the response from the API
var processResponse = function(data) {
  // place holders
  var element = document.getElementById("page");
  var container = document.createElement('div');
  container.className = 'container';

  //image
  var img = document.createElement('img');
  var divImage = document.createElement("div");
  var imageLink = document.createElement('a');
  divImage.className = 'thumbnail';
  if (data.imageUri === '') {
    img.src = 'generic.png';
  } else if (data.imageUri === undefined) {
    img.src = 'generic.png';
  } else {
    img.src = 'https://www.ons.gov.uk/resource?uri='+ data.imageUri;

  }
  imageLink.appendChild(img);
  imageLink.href = 'https://www.ons.gov.uk' + data.uri;
  imageLink.target="_blank";
  divImage.appendChild(imageLink);
  container.appendChild(divImage);
  element.appendChild(container);

  //title + link
  var divTitle = document.createElement('div');
  divTitle.className = 'title';
  var link = document.createElement('a');
  var node = document.createTextNode(data.description.title);
  var title = document.createElement('p');
  title.appendChild(node);
  link.appendChild(title);
  link.href = 'https://www.ons.gov.uk' + data.uri;
  link.target="_blank";
  divTitle.appendChild(link);
  container.appendChild(divTitle);
  element.appendChild(container);

  // pub date
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var divDate = document.createElement('div');
  divDate.className = 'date';
  var dateNode = document.createTextNode(new Date(data.description.releaseDate).toLocaleDateString('en-GB', options));
  var date = document.createElement('p');
  date.appendChild(dateNode);
  divDate.appendChild(date);
  container.appendChild(divDate);
  element.appendChild(container);

  // keywords
  var divKey = document.createElement('div');
  divKey.className = 'keyword';
  if(data.description.keywords && data.description.keywords.length > 1) {
    for(j=0; j<data.description.keywords.length; j++) {
      if(data.description.keywords[j] === "") {
        continue;
      } else {
        var keyword = data.description.keywords[j]+" | ";
      }
      var keyNode = document.createTextNode(keyword);
      divKey.appendChild(keyNode);
    }
    container.appendChild(divKey);
    element.appendChild(container);
  }
}
