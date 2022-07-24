let test = new Template("container", `
<div class="comment">
    <h1>{title} <span>By {pseudo}</span></h1>
    <div>
        <img alt="Avatar" src="{avatar}" />
        <p>{content}</p>
    </div>
</div>
`);

for(let x = 0; x < 1; x++){
    test.render({
        pseudo: "Louise",
        avatar: "https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        title: "Test",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minima quibusdam modi dolor beatae a vero repudiandae reiciendis ut labore, sapiente nesciunt eius asperiores quis aspernatur laudantium velit fugit dolorum."
    });
}


let testcookie = new Cookie("token");
testcookie.set("test");

let testspa = new SpaManager([
    "main",
    "login",
    "signin"
], "main");