
let template = new Template("container", `
lol {yaw}
<div class="comment">
    <h1>{title} <span>By {pseudo}</span></h1>
    <div>
        <img alt="Avatar" src="{avatar}" />
        <p>{content}</p>
    </div>
</div>
`);


let testcookie = new Cookie("token");
testcookie.set("test");

let testspa = new SpaManager([
    new SpaPanel("main"),
    new SpaPanel("login"),
    new SpaPanel("signin")
]);

function renderwidthupdatejs(){
    for(let x = 0; x < 3; x++){
        template.render({
            pseudo: "UN MEC RANDOM",
            avatar: "https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
            title: "Test",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima quibusdam modi dolor beatae a vero repudiandae reiciendis ut labore, sapiente nesciunt eius asperiores quis aspernatur laudantium velit fugit dolorum."
        });
    }
}

function renderwithoutupdatejs(){
    for(let x = 0; x < 0; x++){
        document.getElementById("container").innerHTML += `
        <div class="comment">
            <h1>Test <span>By UN MEC RANDOM</span></h1>
            <div>
                <img alt="Avatar" src="https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima quibusdam modi dolor beatae a vero repudiandae reiciendis ut labore, sapiente nesciunt eius asperiores quis aspernatur laudantium velit fugit dolorum.</p>
            </div>
        </div>
        `
    }
}

console.log("With update js: " + renderwidthupdatejs.executeSpeed());
console.log("Without update js: " + renderwithoutupdatejs.executeSpeed());


let request = new Request("https://api.blockchain.com/v3/exchange/l2/BTC-USD", callback= function(){
    console.log(request.getTextResponse());
});

//request.execute();
let timestamp = Date.now();
template.updateRender(0, {
    pseudo: "Jamie le bg du turfu",
    avatar: "https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
    yaw: "WALALLLALALALALALLALA",
    title: "Test",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima quibusdam modi dolor beatae a vero repudiandae reiciendis ut labore, sapiente nesciunt eius asperiores quis aspernatur laudantium velit fugit dolorum."
})

new Carousel([
    "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/migrants-deplaces-refugies/des-centres-d-hebergement-a-la-rue-salam-soigne-les-personnes-en-exil-2700/21866770-1-fre-FR/Des-centres-d-hebergement-a-la-rue-SALAM-soigne-les-personnes-en-exil_slideshow.jpg",
    "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/incendies/quelques-heures-a-l-abri-des-flammes-2724/21870540-1-fre-FR/Quelques-heures-a-l-abri-des-flammes_slideshow.jpg",
    "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/urgence-ukraine2/sous-le-chaos-la-solidarite-decouvrez-notre-edition-speciale-ukraine-!-2703/21866916-3-fre-FR/Sous-le-chaos-la-solidarite-Decouvrez-notre-edition-speciale-Ukraine_slideshow.jpg",
    "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/resilience-notre-rapport-annuel-2021-2701/21866823-4-fre-FR/ResiLIENce-notre-rapport-annuel-2021_slideshow.jpg",
    "https://www.croix-rouge.fr/var/crf_internet/storage/images/accueil/actualite/migrants-deplaces-refugies/de-l-exil-aux-vignobles-rencontre-avec-daoud-et-tomas-2719/21870106-1-fre-FR/De-l-exil-aux-vignobles-rencontre-avec-Daoud-et-Tomas_slideshow.jpg"
], "image", "back", "next")