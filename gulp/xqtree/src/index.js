!(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        global.xqtree = factory()
    }
})(this, function () {
    function xqtree() {

    }

    return xqtree;
});
