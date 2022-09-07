// --- Classes ---

class Template{
    constructor(parentId, html){
        this.parent = document.getElementById(parentId);
        this.defaultHtmlContent = this.parent.innerHTML;
        this.html = html;

        this.renders = [];
    }

    reset() {
        for(let renders of this.renders){
            for(let render of renders){
                render.remove();
                this.renders = renders.filter(r => r != render);
                delete this.renders[render]
            }
        }
    }

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
            for(let x of element.attributes){
                blocks[blocks.length - 1].setAttribute(x.name, x.value)
            }
            blocks[blocks.length - 1].innerHTML = element.innerHTML;
        }
        this.renders.push(blocks);
        return this.renders.length - 1
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
        let decodedCookie = decodeURIComponent(document.cookie).split(';');
        for(let i = 0; i < decodedCookie.length; i++) {
            let cookie = decodedCookie[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
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
    constructor(panels, enableroute = true){
        this.panels = {}
        this.enableroute = enableroute;
        this.activePanel = null;


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
        if(this.activePanel != null){
            this.panels[this.activePanel].hide();
        }else{
            this.hideAllPanels();
        }

        this.panels[id].show();
        
        this.activePanel = this.panels[id].id;
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

class Request{
    constructor(url, method = "GET", body=null, headers={}, callback = null, async = true){
        this.xmlHttp = new XMLHttpRequest();
        this.url = url;
        this.method = method.toUpperCase();
        this.async = async;
        this.body = body;
        this.headers = headers;
        this.callback = callback;

        this.isExecute = false;
    }

    async execute(){
        if(this.isExecute){
            return
        }
        this.isExecute = true;
        return await new Promise((resolve, reject) => {
            this.xmlHttp.open(this.method, this.url, this.async);

            this.xmlHttp.onreadystatechange = function(xmlHttp){
                if(xmlHttp.target.readyState == XMLHttpRequest.DONE) {
                    this.isExecute = false;
                    this.callback != null ? this.callback(this.getTextResponse()) : null;
                    resolve(this.getTextResponse());
                }
            }.bind(this)

            for(let header of Object.entries(this.headers)){
                xmlhttp.setRequestHeader(header[0], header[1]);
            }
            this.xmlHttp.send(this.body == null ? null : this.body);
        });
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

class Carousel{
    constructor(images, imageId, backButton = null, nextButton = null, updateTimeRate, update = null, animationTime = 500){
        this.images = images;
        this.index = 0;
        this.timeout;
        this.inTransition = false;
        this.image = document.getElementById(imageId);
        if(backButton != null){
            this.backButton = document.getElementById(backButton);

            this.backButton.addEventListener("click", function(){
                if(this.inTransition){
                    return;
                }else{
                    this.inTransition = true;
                }
                clearTimeout(this.timeout);
                if(this.index == 0){
                    this.index = this.images.length - 1;
                }else{
                    this.index -= 1;
                }
            
                this.update();
            }.bind(this));
        }
        if(nextButton != null){
            this.nextButton = document.getElementById(nextButton);

            this.nextButton.addEventListener("click", function(){
                if(this.inTransition){
                    return;
                }else{
                    this.inTransition = true;
                }
                clearTimeout(this.timeout);
                if(this.index == this.images.length - 1){
                    this.index = 0;
                }else{
                    this.index += 1;
                }
            
                this.update();
            }.bind(this));
        }
        

        this.updateTimeRate = updateTimeRate;

        if(this.update == null){
            this.image.style.transition = "all "+this.animationTime/2+"ms linear";
            this.animationTime = animationTime;
            this.update = this.defaultUpdate;
        }else{
            this.update = update;
        }

        this.launchAnimation();
    }

    defaultUpdate(){
        this.image.style.opacity = 0;
        setTimeout(function(){
            this.image.src = this.images[this.index];
            this.image.style.opacity = 1;
            setTimeout(function(){
                this.inTransition = false;
                this.launchAnimation();
            }.bind(this), this.animationTime/2);
        }.bind(this), this.animationTime/2);
    }

    launchAnimation(){
        this.timeout = setTimeout(function(){
            while(this.inTransition){};
            this.inTransition = true;
            this.index += 1;
            if(this.index == this.images.length){
                this.index = 0;
            }
            this.update();
        }.bind(this), this.updateTimeRate);
    }
}

class Controller{
    constructor(scrollControlHideOverflowY = true){
        this.scrollControlHideOverflowY = scrollControlHideOverflowY;

        this.keysScroll = {37: 1, 38: 1, 39: 1, 40: 1};
        this.supportsPassive = false;
        this.wheelOpt = this.supportsPassive ? { passive: false } : false;
        this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        try {
            window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
              get: function () { this.supportsPassive = true; } 
            }));
        } catch(e) {}
    }

    preventDefault(e) {
        e.preventDefault();
    }

    preventDefaultForScrollKeys(e) {
        if (this.keysScroll[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    disableScroll() {
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt);
        window.addEventListener('touchmove', this.preventDefault, this.wheelOpt);
        window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
        this.scrollControlHideOverflowY ? document.body.style.overflowY = "hidden" : null;
    }

    enableScroll() {
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); 
        window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt);
        window.removeEventListener('keydown', this.preventDefaultForScrollKeys, false);
        this.scrollControlHideOverflowY ? document.body.style.overflowY = "" : null;
    }

    copyToClipboard(text) {
        if (!navigator.clipboard) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.display = "none";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            document.execCommand('copy');
            
            return document.body.removeChild(textArea);;
          }
          navigator.clipboard.writeText(text)
    }
}


// --- Prototypes ---

Function.prototype.executeSpeed = function(...args){
    let timestamp = Date.now();
    this(args);
    return Date.now() - timestamp;
}

String.prototype.toHtmlEntities = function(){
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

String.prototype.parseJwt = function(){
    return decodeURIComponent(window.atob(this.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')).split('').map(function(c) {
        return '%' + ('00' + this.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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
