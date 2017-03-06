class BrowserPolyfill {
    static init() {
        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function remove() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
    }
}

export default BrowserPolyfill;
