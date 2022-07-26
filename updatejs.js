class Template{
    constructor(parentId, html){
        this.parent = document.getElementById(parentId);
        this.defaultHtmlContent = this.parent.innerHTML;
        this.html = html;

        this.renders = [];
    }

    reset() { this.parent.innerHTML = this.defaultHtmlContent; }

    getFinalHtml(keys){
        return this.html.replace(/{[a-zA-Z0-9.\[\]]+}/g, function (match, index) {
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
    }

    render(keys){
        let finalHtml = this.getFinalHtml(keys);

        let blocks = [];
        for(let element of new DOMParser().parseFromString("<div>" + finalHtml + "</div>", "text/xml").childNodes[0].childNodes){
            if(element.nodeName == "#text"){
                if(element.data.replaceAll("\n", "").isEmpty()){ continue; }
                blocks.push(this.parent.appendChild(document.createTextNode(element.data)));
                continue;
            }
            blocks.push(this.parent.appendChild(document.createElement(element.tagName)));
            blocks[blocks.length - 1].innerHTML = element.innerHTML;
        }
        this.renders.push(blocks);
    }

    updateRender(id, keys){
        if(id >= this.renders.length){ return; }
        let finalHtml = this.getFinalHtml(keys);
        let i = 0;
        for(let element of new DOMParser().parseFromString("<div>" + finalHtml + "</div>", "text/xml").childNodes[0].childNodes){
            if(element.nodeName == "#text"){
                if(element.data.replaceAll("\n", "").isEmpty()){ continue; }
                this.renders[id][i].textContent = element.data;
                i++;
                continue;
            }
            this.renders[id][i].innerHTML = element.innerHTML;
            i++;
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

class SpaManager{
    constructor(panels, enableroute = true){
        this.panels = {}
        this.enableroute = enableroute;
        this.active_panel = null;


        for(let panel of panels){
            this.panels[panel.id] = panel;
        }

        if(this.enableroute){
            for(let key of Object.keys(document.location.getParams())){
                if(Object.keys(this.panels).includes(key)){
                    return this.setActive(key);
                }
            }
        }
    }

    setActive(id){
        if(this.active_panel != null){
            this.panels[this.active_panel].hide();
        }else{
            this.hideAllPanels();
        }

        this.panels[id].show();
        
        this.active_panel = this.panels[id].id;
        this.enableroute ? window.history.pushState("", "", "?"+id) : null;
    }

    hideAllPanels(){
        for(let panel of Object.values(this.panels)){
            panel.hide();
        }
    }

    getPanel(id){
        return this.panels[id];
    }

    resetAllPanels(){
        for(let panel of Object.values(this.panels)){
            panel.reset();
        }
    }

    clearAllPanels(){
        for(let panel of Object.values(this.panels)){
            panel.clear();
        }
    }
}

class SpaPanel{
    constructor(id, show = null, hide = null){
        this.id = id
        this.element = document.getElementById(this.id);
        this.defaultContent = this.element.innerHTML;
        this.show = show;
        this.hide = hide;

        if(this.show == null){
            this.show = () => {this.element.style.display = "block";};
        }

        if(this.hide == null){
            this.hide = () => {this.element.style.display = "none";};
        }
    }

    reset(){
        this.element.innerHTML = this.defaultContent();
    }

    clear(){
        this.element.innerHTML = new String();
    }
}

Function.prototype.executeSpeed = function(...args){
    let timestamp = Date.now();
    this(args);
    return Date.now() - timestamp;
}

class Request{
    constructor(url, body=null, headers={}, method = "GET", async = true, callback = null){
        this.xmlHttp = new XMLHttpRequest();
        this.url = url;
        this.method = method.toUpperCase();
        this.async = async;
        this.body = body;
        this.headers = headers;
        this.callback = callback;

        this.isExecute = false;
    }

    execute(){
        if(this.isExecute){
            return
        }
        this.isExecute = true;
        this.xmlHttp.open(this.method, this.url, this.async);

        this.xmlHttp.onreadystatechange = function(xmlHttp){
            if(xmlHttp.target.readyState == XMLHttpRequest.DONE) {
                callback != null ? callback() : null;
            }
        }

        for(let header of Object.entries(this.headers)){
            xmlhttp.setRequestHeader(header[0], header[1]);
        }
        this.xmlHttp.send(null);
    }

    getResponse(){
        return this.xmlHttp.response;
    }

    getTextResponse(){
        return this.xmlHttp.responseText;
    }

    getStatusCode(){
        return this.xmlHttp.status;
    }
}