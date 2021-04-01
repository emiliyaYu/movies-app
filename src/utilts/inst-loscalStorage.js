const instLocalStorage  = {
    set (key, value) {
        window.localStorage.setItem( key, JSON.stringify(value) );
    },
    get (key) {
        try {
            return JSON.parse( window.localStorage.getItem(key) );
        } catch {
            return null;
        }
    }
}
export default instLocalStorage;