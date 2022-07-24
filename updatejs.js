class Template{
    constructor(parentId, html){
        this.parent = document.getElementById(parentId);
        this.defaultHtmlContent = this.parent.innerHTML;
        this.html = html;
    }

    reset() { this.parent.innerHTML = this.defaultHtmlContent; }

    render(keys){
        let finalHtml = this.html;
        for(let entrie of Object.entries(keys)){
            finalHtml = finalHtml.replace(/{[a-zA-Z0-9.\[\]]+}/g, function (match, index) {
                match = match.slice(1).slice(0, -1);
                let value = keys;
                for(let x of match.split(".")){
                    if(/\[[0-9]+\]/g.test(x)){
                        value = value[x.split("[")[0]][x.match(/\[[0-9]+\]/g)[0].slice(1).slice(0, -1)];
                    }else{
                        value = value[x];
                    }
                }
                return value;
            });
        }
        this.parent.innerHTML += finalHtml;
    }
}

class Component{
    constructor(balise, tags){
        this.balise = balise;
        this.tags = tags
    }

    create(container){
        
    }
}

class Cookie{
    constructor(name){
        this.name = name;
    }

    set(value, exdays = 14){
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = this.name + "=" + value + ";" + expires + ";path=/";
    }

    get(){
        let name = this.name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    delete(){
        document.cookie = this.name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    expire(exdays){
        this.set(this.get(), exdays);
    }
}