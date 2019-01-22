!(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        global.xqTree = factory()
    }
})(window, function () {

    var type = function (obj) {
        var str = Object.prototype.toString.call(obj);
        return str.match(/\[object (.*?)\]/)[1].toLowerCase();
    };

    ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach(function (item) {
        type['is' + item] = function (obj) {
            return type(obj) === item.toLowerCase();
        };
    });

    var defaultNode = {
        open: false
    };

    function xqTree(ele, config, nodes) {
        if (ele !== Object(ele)) {
            throw new Error("xqTree需要一个元素容器");
        }

        this.element = ele;

        if (type.isArray(nodes) && nodes.length > 0) {
            this.setNodes(nodes);
        }
    }

    xqTree.prototype.setNodes = function (nodes) {
        var tree = _createTree(nodes);
        this.element.append(tree);

        _event.call(this);
    }

    // 绑定事件
    function _event() {
        // 复选框事件
        function _eventCheckbox(e) {
            e.target.classList.toggle("xqtree-node-checkbox-select-false");
            e.target.classList.toggle("xqtree-node-checkbox-select-true");
        }

        Array.prototype.forEach.call(this.element.getElementsByClassName("xqtree-node-checkbox"), node => {
            node.addEventListener("click", _eventCheckbox, false);
        })
    }

    // 创建树组件
    function _createTree(nodes, level) {
        level = level || 0;
        var ul = _createUl(level);
        nodes.forEach(node => {
            node = Object.assign({}, defaultNode, node);

            var li = _createLi(level);
            var spanCheckbox = _createSpanCheckbox();
            var aLink = _createALink();
            var spanIcon = _createSpanIcon();
            var spanText = _createSpanText(node.name);
            var spanSwitch = _createSpanSwitch();

            li.append(spanCheckbox);
            li.append(aLink);
            aLink.append(spanIcon, spanText);
            li.append(spanSwitch);

            if (type.isArray(node.children) && node.children.length > 0) {
                var child = _createTree(node.children, level + 1);
                child.style.display = node.open ? "block" : "none";
                li.append();
            }

            ul.append(li);
        });
        return ul;
    }

    function _createUl(level) {
        var ele = document.createElement("ul");
        ele.classList.add("xqtree");
        ele.setAttribute("root", level === 0 ? true : false);
        return ele;
    }

    function _createLi(level) {
        var ele = document.createElement("li");
        ele.classList.add("xqtree-node");
        ele.setAttribute("level", level);
        return ele;
    }

    function _createSpanCheckbox() {
        var ele = document.createElement("span");
        ele.classList.add("xqtree-node-checkbox");
        ele.classList.add("xqtree-node-checkbox-select-false");
        return ele;
    }

    function _createALink() {
        var ele = document.createElement("a");
        ele.classList.add("xqtree-node-link");
        ele.href = "javascript:void(0)";
        return ele;
    }

    function _createSpanIcon() {
        var ele = document.createElement("span");
        ele.classList.add("xqtree-node-link-icon");
        return ele;
    }

    function _createSpanText(text) {
        var ele = document.createElement("span");
        ele.classList.add("xqtree-node-link-text");
        ele.innerText = text;
        return ele;
    }

    function _createSpanSwitch() {
        var ele = document.createElement("span");
        ele.classList.add("xqtree-node-switch");
        ele.classList.add("xqtree-node-switch-close");
        return ele;
    }

    return xqTree;
});
