const classesTemplate = new Template("nav-code-classes-container", `
<p onclick="doc({id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
</svg>{name}</p>
`);

const prototypesTemplate = new Template("nav-code-prototypes-container", `
<p onclick="doc({id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
</svg>{name}</p>
`);


const classes = {
    "Template": {},
    "Cookie": {},
    "SpaManager": {},
    "SpaPanel": {},
    "Request": {},
    "Carousel": {},
    "Controller": {}
}

const prototypes = {
    "ExecuteSpeed": {},
    "ToHtmlEntities": {},
    "ParseJwt": {},
    "GetParams": {},
    "EncodeBody": {},
    "IsEmpty": {},
    "IsNumeric": {}
}

function toggleClass(){
    if(classesTemplate.parent.innerHTML == classesTemplate.defaultHtmlContent){
        let i = 3;
        for(let x of Object.entries(classes)){
            classesTemplate.render({
                name: x[0],
                id: i
            });
            i++;
        }
    }else{
        classesTemplate.reset();
    }
}

function togglePrototypes(){
    if(prototypesTemplate.parent.innerHTML == prototypesTemplate.defaultHtmlContent){
        let i = 3 + Object.keys(classes).length;
        for(let x of Object.entries(prototypes)){
            prototypesTemplate.render({
                name: x[0],
               id: i
            });
            i++;
        }
    }else{
        prototypesTemplate.reset();
    }
}


document.getElementById("nav-code-classes-title").addEventListener("click", toggleClass);
document.getElementById("nav-code-prototypes-title").addEventListener("click", togglePrototypes);

const controller = new Controller();
document.getElementById("copy").addEventListener("click", function(){ controller.copyToClipboard(document.getElementById("exemple-code-container").innerText); });



const docs = [
    {
        "title": "Introduction",
        args: {
            "Bien Démarer:": [
                {
                    arg: "1. Importer la librairie",
                    value: "&#x3C;script src=&#x22;https://8borane8.github.io/updatejs/src/updatejs.js&#x22; type=&#x22;application/javascript&#x22;&#x3E;&#x3C;/script&#x3E;",
                    description: "Ajouter cette ligne de code dans votre index HTML"
                },
                {
                    arg: "2. Commencer à coder",
                    value: "js/index.js",
                    description: "Créer un fichier \"index.js\" dans le répertoire \"js\""
                }
            ]
        },
        next: true,
        exemple: `&#x3C;!DOCTYPE html&#x3E;
&#x3C;html lang=&#x22;fr&#x22;&#x3E;
    &#x3C;head&#x3E;
        &#x3C;title&#x3E;&#x3C;/title&#x3E;
        &#x3C;meta name=&#x22;viewport&#x22; content=&#x22;width=device-width, initial-scale=1&#x22;&#x3E;
        &#x3C;meta charset=&#x22;utf-8&#x22;&#x3E;
                        
        &#x3C;link rel=&#x22;stylesheet&#x22; type=&#x22;text/css&#x22; href=&#x22;css/reset.css&#x22;&#x3E;
        &#x3C;link rel=&#x22;stylesheet&#x22; type=&#x22;text/css&#x22; href=&#x22;css/index.css&#x22;&#x3E;
    &#x3C;/head&#x3E;
                                
    &#x3C;body&#x3E;
                    
        &#x3C;script src=&#x22;../../src/updatejs.js&#x22; type=&#x22;application/javascript&#x22;&#x3E;&#x3C;/script&#x3E;
        &#x3C;script src=&#x22;js/index.js&#x22; type=&#x22;application/javascript&#x22;&#x3E;&#x3C;/script&#x3E;
    &#x3C;/body&#x3E;
&#x3C;/html&#x3E;
        `
    },
    {
        "title": "Patch Note",
        args: {
            "Infos:": [
                {
                    arg: "Version",
                    value: "Version 1.0",
                    description: "Dernière update en date"
                },
                {
                    arg: "Repository",
                    value: "https://github.com/8borane8/updatejs",
                    description: "Le répertoire officiel de update-js"
                }
            ]
        },
        next: true,
        exemple: ``
    },
    {
        "title": "Auteurs",
        args: {
            "Infos:": [
                {
                    arg: "Discord",
                    value: "Borane#9999",
                    description: "https://discord.com/"
                },
                {
                    arg: "Instagram",
                    value: "Borane__",
                    description: "https://instagram.com/Borane__"
                }
            ]
        },
        next: false,
        exemple: `https://github.com/8borane8/updatejs`
    },
    {
        "title": "Template",
        args: {
            "Constructeur:": [
                {
                    arg: "parentId",
                    value: "type: string / default -> none",
                    description: "Identitfiant de la boîte dans là quels les rendus vont être généré"
                },
                {
                    arg: "html",
                    value: "type: string / default -> none",
                    description: "Template html"
                }
            ],
            "Fonctions:": [
                {
                    arg: "reset",
                    value: "args -> () / return -> none",
                    description: "Supprime tous les rendus"
                },
                {
                    arg: "getFinalHtml",
                    value: "args -> (keys) / return -> string",
                    description: "Retourne le template html formaté avec le dictionnaire keys"
                },
                {
                    arg: "render",
                    value: "args -> (keys) / return -> none",
                    description: "Génère un nouveau template formaté avec keys dans le parent"
                },
                {
                    arg: "updateRender",
                    value: "args -> (id, keys) / return -> none",
                    description: "Modifie un template"
                }
            ]
        },
        next: true,
        exemple: `const template = new Template(&#x22;id&#x22;, &#x60;
&#x3C;div&#x3E;
    &#x3C;h1&#x3E;{title}&#x3C;/h1&#x3E;
&#x3C;/div&#x3E;
&#x60;);
            
template.render({
    title: &#x22;Exemple !&#x22;
});

template.updateRender(0, {
    title: &#x22;Titre modifi&#xE9; !&#x22;
});`

    },
    {
        "title": "Cookie",
        args: {
            "Constructeur:": [
                {
                    arg: "name",
                    value: "type: string / default -> none",
                    description: "Nom du cookie"
                }
            ],
            "Fonctions:": [
                {
                    arg: "set",
                    value: "args -> (value, exdays = 14, path=/, samesite = strict, secure = true) / return -> none",
                    description: "Set la valeure du cookie"
                },
                {
                    arg: "get",
                    value: "args -> () / return -> string",
                    description: "Retourne la valeure du cookie"
                },
                {
                    arg: "delete",
                    value: "args -> () / return -> none",
                    description: "Supprime le cookie"
                },
                {
                    arg: "expire",
                    value: "args -> (cdays) / return -> none",
                    description: "Modifie la date d'expiration du cookie en jours"
                }
            ]
        },
        next: true,
        exemple: `const token = new Cookie(&#x22;token&#x22;);

token.set(&#x22;JWT&#x22;);
token.expires(5);
token.delete();`
    },
    {
        "title": "SpaManager",
        args: {
            "Constructeur:": [
                {
                    arg: "panels",
                    value: "type: list / default -> none",
                    description: "Nom du cookie"
                },
                {
                    arg: "enableroute",
                    value: "type: boolean / default -> true",
                    description: "Nom du cookie"
                }
            ],
            "Fonctions:": [
                {
                    arg: "setActive",
                    value: "args -> (id) / return -> none",
                    description: "Set la valeure du cookie"
                },
                {
                    arg: "hideAllPanels",
                    value: "args -> () / return -> none",
                    description: "Cache tous les panels"
                },
                {
                    arg: "getPanel",
                    value: "args -> (id) / return -> SpaPanel",
                    description: "Retourne un SpaPanel"
                },
                {
                    arg: "resetAllPanels",
                    value: "args -> () / return -> none",
                    description: "Reset les panels"
                },
                {
                    arg: "clearAllPanels",
                    value: "args -> () / return -> none",
                    description: "Clear les panels"
                }
            ]
        },
        next: true,
        exemple: `const token = new Cookie(&#x22;token&#x22;);

token.set(&#x22;JWT&#x22;);
token.expires(5);
token.delete();`
    },
    {
        "title": "SpaPanel",
        args: {
            "Constructeur:": [
                {
                    arg: "id",
                    value: "type: string / default -> none",
                    description: "Id du panel"
                },
                {
                    arg: "show",
                    value: "type: function / default -> () => {this.element.style.display = \"block\";}",
                    description: "Affiche le panel"
                },
                {
                    arg: "hide",
                    value: "type: function / default -> () => {this.element.style.display = \"none\";}",
                    description: "Cache le panel"
                }
            ],
            "Fonctions:": [
                {
                    arg: "reset",
                    value: "args -> () / return -> none",
                    description: "Reset le contenu du panel"
                },
                {
                    arg: "clear",
                    value: "args -> () / return -> none",
                    description: "Supprime le contenu du panel"
                }
            ]
        },
        next: true,
        exemple: `const mainPanel = new SpaPanel("main");`
    },
    {
        "title": "Request",
        args: {
            "Constructeur:": [
                {
                    arg: "url",
                    value: "type: string / default -> none",
                    description: "Id du panel"
                },
                {
                    arg: "method",
                    value: "type: string / default -> GET",
                    description: "GET / POST / DELETE / UPDATE / PUT / ..."
                },
                {
                    arg: "body",
                    value: "type: string / default -> null",
                    description: "Affiche le panel"
                },
                {
                    arg: "headers",
                    value: "type: map / default -> {}",
                    description: "Cache le panel"
                },
                {
                    arg: "callback",
                    value: "type: function / default -> null",
                    description: "Fonction appeller une fois la requete terminée"
                },
                {
                    arg: "async",
                    value: "type: boolean / default -> true",
                    description: "Definit si la requete est effectué en async"
                }
            ],
            "Fonctions:": [
                {
                    arg: "execute",
                    value: "args -> () / return -> none",
                    description: "Reset le contenu du panel"
                },
                {
                    arg: "getResponse",
                    value: "args -> () / return -> object",
                    description: "Retourne la réponse du serveur"
                },
                {
                    arg: "getTextResponse",
                    value: "args -> () / return -> string",
                    description: "Retourne la réponse du serveur sous forme de text"
                },
                {
                    arg: "getStatusCode",
                    value: "args -> () / return -> int",
                    description: "Retourne le status de la requete"
                }
            ]
        },
        next: true,
        exemple: `const request = new Request(&#x22;https://google.com&#x22;);
request.execute();`
    },
    {
        "title": "Carousel",
        args: {
            "Constructeur:": [
                {
                    arg: "images",
                    value: "type: map / default -> none",
                    description: "Liste des images"
                },
                {
                    arg: "imageId",
                    value: "type: string / default -> none",
                    description: "id de la balise img"
                },
                {
                    arg: "backButton",
                    value: "type: string / default -> null",
                    description: "id du bouton back"
                },
                {
                    arg: "nextButton",
                    value: "type: string / default -> null",
                    description: "id du bouton next"
                },
                {
                    arg: "updateTimeRate",
                    value: "type: int / default -> none",
                    description: "Temps en ms entre chaque transition"
                },
                {
                    arg: "update",
                    value: "type: function / default -> this.defaultUpdate",
                    description: "Fonction pour update l'image"
                },
                {
                    arg: "animationTime",
                    value: "type: int / default -> none",
                    description: "Temps en ms entre chaque transition"
                }
            ],
            "Fonctions:": [
                {
                    arg: "defaultUpdate",
                    value: "args -> () / return -> none",
                    description: "Update par default"
                },
                {
                    arg: "launchAnimation",
                    value: "args -> () / return -> none",
                    description: "Lancer une transition"
                }
            ]
        },
        next: true,
        exemple: `new Carousel([
    &#x22;img/1.png&#x22;,
    &#x22;img/2.png&#x22;,
    &#x22;img/3.png&#x22;,
    &#x22;img/4.png&#x22;,
    &#x22;img/5.png&#x22;
], &#x22;image&#x22;, &#x22;image-btn-back&#x22;, &#x22;image-btn-next&#x22;, 3000, null, 750);`
    },
    {
        "title": "Controller",
        args: {
            "Constructeur:": [
                {
                    arg: "scrollControlHideOverflowY",
                    value: "type: boolean / default -> true",
                    description: "Cacher overflow-y quand le scroll est desactiver"
                }
            ],
            "Fonctions:": [
                {
                    arg: "disableScroll",
                    value: "args -> () / return -> none",
                    description: "Desactive le scroll sur la page"
                },
                {
                    arg: "enableScroll",
                    value: "args -> () / return -> none",
                    description: "Active le scroll sur la page"
                },
                {
                    arg: "copyToClipboard",
                    value: "args -> (text) / return -> SpaPanel",
                    description: "Copy text dans le presse papier"
                }
            ]
        },
        next: false,
        exemple: `const controller = new Controller():

controller.disableScroll();
controller.copyToClipboard(&#x22;Tu ne peux plus scroll&#x22;)
controller.enableScroll();`
    },
    {
        "title": "ExecuteSpeed",
        args: {
            "Usage:": [
                {
                    arg: "Function.executeSpeed",
                    value: "return -> int",
                    description: "Retourne le temps de la fonction en ms"
                }
            ],
            "Arguments:": [
                {
                    arg: "...args",
                    value: "default -> none",
                    description: "Passer les arguments de la fonction"
                }
            ]
        },
        next: true,
        exemple: `function print(text){
    console.log(text);
}
        
console.log(print.executeSpeed(&#x22;Hello World !&#x22;))`
    },
    {
        "title": "ToHtmlEntities",
        args: {
            "Usage:": [
                {
                    arg: "String.toHtmlEntities",
                    value: "return -> string",
                    description: "Format la chaine de caractere pour empecher les failles xss"
                }
            ],
        },
        next: true,
        exemple: `console.log(&#x22;&#x3C;script&#x3E;&#x3C;/script&#x3E;&#x22;.toHtmlEntities())`
    },
    {
        "title": "ParseJwt",
        args: {
            "Usage:": [
                {
                    arg: "String.parseJwt",
                    value: "return -> map",
                    description: "Retourne un dictionnaire avec les infos du jwt"
                }
            ],
        },
        next: true,
        exemple: `console.log(&#x22;JWT&#x22;.parseJwt())`
    },
    {
        "title": "GetParams",
        args: {
            "Usage:": [
                {
                    arg: "Location.getParams",
                    value: "return -> map",
                    description: "Retourne un dictionnaire avec les parametres get"
                }
            ],
        },
        next: true,
        exemple: `console.log(document.location.getParams())`
    },
    {
        "title": "EncodeBody",
        args: {
            "Usage:": [
                {
                    arg: "Map.encodeBody",
                    value: "return -> string",
                    description: "Retourne une requete en url encoded"
                }
            ],
        },
        next: true,
        exemple: `console.log({test: &#x22;encoded !&#x22;}.encodeBody()})`
    },
    {
        "title": "IsEmpty",
        args: {
            "Usage:": [
                {
                    arg: "String.isEmpty",
                    value: "return -> boolean",
                    description: "Retourne true si le string est vide"
                }
            ],
        },
        next: true,
        exemple: `console.log("".isEmpty())`
    },
    {
        "title": "IsNumeric",
        args: {
            "Usage:": [
                {
                    arg: "String.isNumeric",
                    value: "return -> boolean",
                    description: "Retourne true si le string est un nombre"
                }
            ],
        },
        next: false,
        exemple: `console.log("".isNumeric())`
    }
];

const args_template = new Template("main-arg-full-container", `
<div id="container-args-{id}">
    <p class="main-subtitle">{sectionname}</p>
</div>
`)

function doc(id){
    if(window.innerWidth < "600"){
        document.getElementById("nav").style.display = "none";
    }

    document.getElementById("main-continue").setAttribute("next", parseInt(id) + 1);
    if(docs[id].next == true){
        document.getElementById("main-continue").style.display = "block";
    }else{
        document.getElementById("main-continue").style.display = "none";
    }
    document.getElementById("main-title").innerText = docs[id].title;
    document.getElementById("exemple-code-container").innerHTML = docs[id].exemple;

    args_template.parent.innerHTML = "";
    let i = 0;
    for(let x of Object.entries(docs[id].args)){
        args_template.render({
            id: i,
            sectionname: x[0]
        });
        arg_render = new Template("container-args-"+i, `
        <div class="main-arg-container">
            <div>
                <p>{arg}</p>
            </div>
            <div>
                <p>{value}</p>
                <p>{description}</p>
            </div>
        </div>
        `)
        for(let arg of x[1]){
            arg_render.render(arg);
        }
        i++
    }
}
window.onresize = function(){
    if(window.innerWidth > "600"){
        document.getElementById("nav").style.display = "flex";
    }

    if(window.innerWidth > "1250" && exemple_resize == true){
        document.getElementById("exemple").style.display = "flex";
    }
}

document.getElementById("main-continue").addEventListener("click", function(){
    doc(document.getElementById("main-continue").getAttribute("next"));
});

document.getElementById("main-options-code").addEventListener("click", function(){
    document.getElementById("exemple").style.display = "flex";
});

document.getElementById("close-exemple").addEventListener("click", function(){
    document.getElementById("exemple").style.display = "none";
});

document.getElementById("main-options-search").addEventListener("click", function(){
    document.getElementById("nav").style.display = "flex";
});

document.getElementById("close-nav").addEventListener("click", function(){
    document.getElementById("nav").style.display = "none";
});

document.getElementById("search-input").addEventListener("input", function(){
    classesTemplate.reset();
    let i = 3;
    for(let x of Object.entries(classes)){
        if(document.getElementById("search-input").value.toString().isEmpty() || x[0].toLowerCase().includes(document.getElementById("search-input").value.toLowerCase())){
            classesTemplate.render({
                name: x[0],
                id: i
            });
        }
        i++;
    }

    prototypesTemplate.reset();
    i = 3 + Object.keys(classes).length;
    for(let x of Object.entries(prototypes)){
        if(document.getElementById("search-input").value.toString().isEmpty() || x[0].includes(document.getElementById("search-input").value)){
            prototypesTemplate.render({
                name: x[0],
                id: i
            });
        }
        i++;
    }
});

doc(0)