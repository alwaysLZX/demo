(function($) {
    $.fn.dragsort = function(func) {
        return this.each(function() {
            var draging = null;
            this.ondragstart = function(event) {
                event.dataTransfer.setData("tmp", event.target.nodeName);
                draging = event.target;
            };
            this.ondragenter = function(event) {
                event.preventDefault();
                var target = event.target;
                if (target.nodeName === "LI") {
                    if (target !== draging) {
                        var targetRect = target.getBoundingClientRect();
                        var dragingRect = draging.getBoundingClientRect();
                        if (target) {
                            if (target.animated) {
                                return;
                            }
                        }

                        if (_index(draging) < _index(target)) {
                            target.parentNode.insertBefore(draging, target.nextSibling);
                        } else {
                            target.parentNode.insertBefore(draging, target);
                        }
                        _animate(dragingRect, draging);
                        _animate(targetRect, target);
                    }
                }
            };

            this.ondragend = function(event) {
                var target = event.target;
                if (target.nodeName === "LI") {
                    if (typeof func === "function") {
                        var ul = target.parentNode;
                        func.call(this, event, ul, Array.prototype.slice.call(ul.children));
                    }
                }
            };
        });
    };

    // 获取元素在父元素中的index
    function _index(el) {
        var index = 0;

        if (!el || !el.parentNode) {
            return -1;
        }

        while (el && (el = el.previousElementSibling)) {
            index++;
        }

        return index;
    }

    function _animate(prevRect, target) {
        var ms = 300;
        if (ms) {
            var currentRect = target.getBoundingClientRect();

            if (prevRect.nodeType === 1) {
                prevRect = prevRect.getBoundingClientRect();
            }

            _css(target, "transition", "none");
            _css(target, "transform", "translate3d(" + (prevRect.left - currentRect.left) + "px," + (prevRect.top - currentRect.top) + "px,0)");

            target.offsetWidth;
            _css(target, "transition", "all " + ms + "ms");
            _css(target, "transform", "translate3d(0,0,0)");

            clearTimeout(target.animated);
            target.animated = setTimeout(function() {
                _css(target, "transition", "");
                _css(target, "transform", "");
                target.animated = false;
            }, ms);
        }
    }
    // 给元素添加style
    function _css(el, prop, val) {
        var style = el && el.style;
        if (style) {
            if (val === void 0) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    val = document.defaultView.getComputedStyle(el, "");
                } else if (el.currentStyle) {
                    val = el.currentStyle;
                }

                return prop === void 0 ? val : val[prop];
            } else {
                if (!(prop in style)) {
                    prop = "-webkit-" + prop;
                }
                style[prop] = val + (typeof val === "string" ? "" : "px");
            }
        }
    }
})(jQuery);
