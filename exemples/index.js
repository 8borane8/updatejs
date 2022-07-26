
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

console.log(
    template.updateRender.executeSpeed(0, {
        pseudo: "Jamie le bg du turfu",
        avatar: "https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        yaw: "WALALLLALALALALALLALA",
        title: "Test",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima quibusdam modi dolor beatae a vero repudiandae reiciendis ut labore, sapiente nesciunt eius asperiores quis aspernatur laudantium velit fugit dolorum."
    }).bind(template)
);