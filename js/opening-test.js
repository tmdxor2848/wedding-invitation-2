const opening =
  document.getElementById("opening");

const seal =
  document.getElementById("seal");

const openButton =
  document.getElementById("openButton");


let isOpening = false;


function startOpening() {

  if (!opening) return;

  if (isOpening) return;


  isOpening = true;


  opening.classList.add(
    "is-open"
  );


  setTimeout(() => {

    opening.classList.add(
      "is-finished"
    );

  }, 1000);


  setTimeout(() => {

    opening.remove();

  }, 1900);

}


if (seal) {

  seal.addEventListener(
    "click",
    startOpening
  );

}


if (openButton) {

  openButton.addEventListener(
    "click",
    startOpening
  );

}