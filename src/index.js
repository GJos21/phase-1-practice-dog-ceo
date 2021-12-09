const dogBreeds = [];
let dogBreedsFilter = " ";

document.addEventListener("DOMContentLoaded", () => {
  renderDogImages();
  populateDogBreeds();
  document.getElementById("breed-dropdown").addEventListener("change", manageBreeds);
})

function manageBreeds(event) {
  dogBreedsFilter = event.target.value;
  renderDogBreeds();  
}

function renderDogImages() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(res => res.json())
  .then(dogs => {
    const div = document.getElementById("dog-image-container");
    dogs.message.forEach(dog => {
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.src = dog;
      img.alt = `picture of a dog with breed of ${dog.split("/")[4]}`;
      img.height = 400;
      img.width = 400;
      p.append(img);
      div.append(p);
    });

  });
}

function populateDogBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(dogs => {
      const breedObj = dogs.message;

      for (const breed in breedObj) {
        let breedText = breed;
        const subBreeds = breedObj[breed];

        if (subBreeds.length) {
          breedText = `${breedText}: ${subBreeds.join(", ")}`;
        }

        dogBreeds.push(breedText);

      }
      renderDogBreeds();
    });
}

function renderDogBreeds() {
  const ul = document.getElementById("dog-breeds");

  ul.innerHTML = "";

  dogBreeds.forEach(breedText => {
    if (dogBreedsFilter === " " || breedText[0] === dogBreedsFilter) {
      const li = document.createElement("li");
      li.textContent = breedText;
      li.addEventListener("click", (e) => {
        if (e.target.style.color === "red") {
          e.target.style.color = "black";
        } else {
          e.target.style.color = "red";
        }
      })
      ul.append(li);
    }
  });
}


