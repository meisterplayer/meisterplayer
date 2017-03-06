class Cookie {
    static set(key, value, date = null) {
        let expires = '';
        
        if (date !== null) { 
            expires = '; expires=' + date.toGMTString();
        }
        
        document.cookie = key + '=' + value + expires + '; path=/';
    }
    
    static get(key) {
        let keyEQ = key + '=';
        let ca = document.cookie.split(';');
    
        for (let i = 0; i < ca.length; i++) {
            let cookie = ca[i];
            
            while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(keyEQ) == 0) return cookie.substr(keyEQ.length, cookie.length);
        }
        
        return null;
    }
    
    static delete(key) {
        this.set(key, '', -1);
    }
}

export default Cookie;