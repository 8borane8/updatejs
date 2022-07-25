class Template{
    constructor(parentId, html){
        this.parent = document.getElementById(parentId);
        this.defaultHtmlContent = this.parent.innerHTML;
        this.html = html;
    }

    reset() { this.parent.innerHTML = this.defaultHtmlContent; }

    render(keys){
        let finalHtml = this.html;
        finalHtml = finalHtml.replace(/{[a-zA-Z0-9.\[\]]+}/g, function (match, index) {
            match = match.slice(1, -1);
            let value = keys;
            for(let x of match.split(".")){
                if(/\[[0-9]+\]/g.test(x)){
                    value = value[x.split("[")[0]][x.match(/\[[0-9]+\]/g)[0].slice(1, -1)];
                }else{
                    value = value[x];
                }
            }
            return value;
        });

        for(let element of new DOMParser().parseFromString("<div>" + finalHtml + "</div>", "text/xml").childNodes[0].childNodes){
            if(element.nodeName == "#text"){
                if(element.data.replaceAll("\n", "").isEmpty()){ continue; }
                this.parent.appendChild(document.createTextNode(element.data));
                continue;
            }
            let block = this.parent.appendChild(document.createElement(element.tagName));
            block.innerHTML = element.innerHTML;
        }
    }
}

class Cookie{
    constructor(name){
        this.name = name;
    }

    set(value, exdays = 14, path="/", samesite = "strict", secure = true){
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = this.name + "=" + value + ";" + expires + ";path="+path+";samesite="+samesite + (secure ? ";secure" : "");
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
        document.cookie = this.name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;samesite=strict;secure";
    }

    expire(exdays){
        this.set(this.get(), exdays);
    }
}

class SpaManager{
    constructor(panels, defaultActivePanel, enableroute = true){
        this.panels = {}
        this.defaultDisplay = {};
        this.enableroute = enableroute;


        for(let panelId of panels){
            this.panels[panelId] = document.getElementById(panelId);
            this.defaultDisplay[panelId] = window.getDefaultComputedStyle(this.panels[panelId]).display;
        }

        if(this.enableroute){
            for(let key of Object.keys(document.location.getParams())){
                if(Object.keys(this.panels).includes(key)){
                    return this.setActive(key);
                }
            }
        }
        this.setActive(defaultActivePanel);
    }

    setActive(id){
        for(let panel of Object.values(this.panels)){
            panel.style.display = "none";
        }
        
        this.panels[id].style.display = this.defaultDisplay[id];
        this.enableroute ? window.history.pushState("", "", "?"+id) : null;
    }
}

String.prototype.toHtmlEntities = function(){
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

String.prototype.parseJwt = function(){
    var base64Url = this.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

Location.prototype.getParams = function(){
    if(this.href.split("?", 2).length == 1){
        return {};
    }

    let dic = {};
    for(let key of this.href.split("?", 2)[1].split("&")){
        if(key.includes("=")){
            dic[key.split("=")[0]] = key.split("=")[1];
        }else{
            dic[key] = "";
        }
    }
    return dic;
}

Map.prototype.encodeBody = function(){
    let body = [];
    for(let property of Object.keys(this)){
        body.push(encodeURIComponent(property) + "=" + encodeURIComponent(dictionnary[property]));
    }
    return body.join("&");
}

String.prototype.isEmpty = function(){
    if(this.replaceAll(" ", "") == ""){
        return true;
    }else if(this.replaceAll("   ", "") == ""){
        return true;
    }else if(this.replaceAll("ㅤ", "") == ""){
        return true;
    }else if(this == undefined){
        return true;
    }else if(this == null){
        return true;
    }
    return false;
}

String.prototype.isNumeric = function(){
    return !isNaN(this); 
}