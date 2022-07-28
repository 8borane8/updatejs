const controller = new Controller();

const carousel = new Carousel([
  "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/migrants-deplaces-refugies/des-centres-d-hebergement-a-la-rue-salam-soigne-les-personnes-en-exil-2700/21866770-1-fre-FR/Des-centres-d-hebergement-a-la-rue-SALAM-soigne-les-personnes-en-exil_slideshow.jpg",
  "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/incendies/quelques-heures-a-l-abri-des-flammes-2724/21870540-1-fre-FR/Quelques-heures-a-l-abri-des-flammes_slideshow.jpg",
  "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/urgence-ukraine2/sous-le-chaos-la-solidarite-decouvrez-notre-edition-speciale-ukraine-!-2703/21866916-3-fre-FR/Sous-le-chaos-la-solidarite-Decouvrez-notre-edition-speciale-Ukraine_slideshow.jpg",
  "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/resilience-notre-rapport-annuel-2021-2701/21866823-4-fre-FR/ResiLIENce-notre-rapport-annuel-2021_slideshow.jpg",
  "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/migrants-deplaces-refugies/de-l-exil-aux-vignobles-rencontre-avec-daoud-et-tomas-2719/21870106-1-fre-FR/De-l-exil-aux-vignobles-rencontre-avec-Daoud-et-Tomas_slideshow.jpg"
], "image", "image-btn-back", "image-btn-next", 3000, null, 750);

function showDonate(){
  controller.disableScroll();
  document.getElementById("overlay").style.display = "block";
  document.getElementById("donate").style.display = "flex";
}

function hideDonate(){
  controller.enableScroll();
  document.getElementById("overlay").style.display = "none";
  document.getElementById("donate").style.display = "none";
}

for(let elem of document.getElementsByClassName("donate-btn")){
  elem.addEventListener("click", showDonate);
}

document.getElementById("overlay").addEventListener("click", hideDonate);
document.getElementById("donation-cancel-button").addEventListener("click", hideDonate);