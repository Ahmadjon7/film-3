"use strict";

movies.splice(300);

// ------ NORMALIZE ALL MOVIES--------//

const AllMovies = movies.map((movies) => {
  return {
    title: movies.title,
    year: movies.year,
    lang: movies.language,
    category: movies.categories,
    id: movies.imdbId,
    time: ` ${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
    summary: movies.summary,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    maxImg: movies.bigThumbnail,
    minIMG: movies.smallThumbnail,
    rating: movies.imdbRating,
  };
});

// ------------ RENDER MOVIES FUNCTION ------------//

function renderAllMovies() {
  AllMovies.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
    <img src="${el.minIMG}" alt="img" class="card-img">
    <div class="card-body">
       <h4 class="card-title">
          ${el.title}   
       </h4>
       <ul class="list-unstyled">
       <li> <strong>Year:  ${el.year} </strong> </li>
       <li> <strong>Language:  ${el.lang} </strong></li>
       <li> <strong>Rating:   ${el.rating} </strong></li>
       <li> <strong>Category:  ${el.category} </strong></li>
       <li> <strong>Runtime:  ${el.time} </strong></li>
    </ul>
       <div class="social d-flex">
          <a href='${el.link}' target="blank" class=" btn__1  m-1">
             Trailers
          </a>
          <button class=" btn__1 m-1">
             Read more ... 
          </button>
          <button class=" btn__1 m-1">
             Add bookmark
          </button>
       </div>
    </div>`
    );

    $(".wrapper").appendChild(card);
  });
}

renderAllMovies();

//--------Dinamic Categories ----------

const dynamicCategory = () => {
  let catergory = [];

  AllMovies.forEach((e) => {
    e.category.forEach((el) => {
      if (!catergory.includes(el)) {
        catergory.push(el);
      }
    });
  });

  catergory.sort();
  catergory.unshift("All");
  catergory.forEach((el) => {
    const option = createElement("option", "item-option", el);
    $("#category").appendChild(option);
  });
};

dynamicCategory();

// ------------ FIND FILMS FUNCTION ------------ //

const findFilm = (regexp, rating = 0, catergory) => {
  if (catergory === "All") {
    return AllMovies.filter((film) => {
      return film.title.match(regexp) && film.rating >= rating;
    });
  }
  return AllMovies.filter((film) => {
    return (
      film.title.match(regexp) &&
      film.rating >= rating &&
      film.category.includes(catergory)
    );
  });
};

//  ------------ FIND FILMS LISTENER ------------  //

$("#submitForm").addEventListener("submit", () => {
  $(".wrapper").innerHTML = `
<h1 class="loader__title">
    <span class="let1">l</span>  
    <span class="let2">o</span>  
    <span class="let3">a</span>  
    <span class="let4">d</span>  
    <span class="let5">i</span>  
    <span class="let6">n</span>  
    <span class="let7">g</span>  
</h1>
    `;

  const searchValue = $("#filmName").value;
  const filmRating = $("#filmRating").value;
  const filmCategory = $("#category").value;

  const regexp = new RegExp(searchValue, "gi");
  const searchResult = findFilm(regexp, filmRating, filmCategory);

  setTimeout(() => {
    if (searchResult.length > 0) {
      searchResultsRender(searchResult);
      $(".card-res").classList.remove("d-none");

      if (searchResult.length > 1) {
        $(
          "#res"
        ).innerHTML = `<strong >${searchResult.length}</strong> ta film topildi`;
      } else {
        $(
          "#res"
        ).innerHTML = `<strong >${searchResult.length}</strong> ta film topildi`;
      }
    } else {
      $(".card-res").classList.add("d-none");
      $(
        ".wrapper"
      ).innerHTML = `<h3 class="text-center fond__title ">Ma'lumot toplimadi</h3>`;
    }
  }, 2000);
});

function searchResultsRender(data = []) {
  $(".wrapper").innerHTML = "";
  data.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
       
       <img src="${el.minIMG}" alt="img" class="card-img">
       <div class="card-body">
          <h4 class="card-title">
             ${el.title}   
          </h4>
          <ul class="list-unstyled">
             <li> <strong>Year:  ${el.year}   </strong>
             </li>
             <li> <strong>Language:  ${el.lang} </strong></li>
             <li> <strong>Rating:   ${el.rating} </strong></li>
             <li> <strong>Category:  ${el.category}  </strong></li>
             <li> <strong>Runtime:  ${el.time} </strong></li>
          </ul>
   
          <div class="social d-flex">
            <a href='${el.link}' target="blank" class=" btn__1  m-1">
                Trailers
            </a>
             <button class="btn__1 m-2">
                Read more ...
             </button>
   
             <button class="btn__1 m-2">
                Add bookmark
             </button>
          </div>
       </div>`
    );

    $(".wrapper").appendChild(card);
  });
}
