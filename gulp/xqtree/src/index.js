!(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        global.xqTree = factory()
    }
})(window, function () {
    // 默认配置
    var defaultConfig = {};

    // 默认节点对象
    var defaultNode = {
        _id: "",
        open: false,
        checked: false
    };

    // 树构造函数
    function xqTree(ele, config, nodes) {
        if (ele !== Object(ele)) {
            throw new Error("xqTree需要一个元素容器");
        }

        this.element = ele;
        this.originalNodes = nodes;
        this.config = Object.assign({}, defaultConfig, config);
        this.nodes = {};

        if (xqTree.type.isArray(nodes) && nodes.length > 0) {
            this.setNodes(nodes);
        }
    }

    // 静态方法 - forEach循环
    xqTree.forEach = function (arr, func) {
        Array.prototype.forEach.call(arr, func);
    }

    // 静态方法 - 类型判断
    xqTree.type = function (obj) {
        var str = Object.prototype.toString.call(obj);
        return str.match(/\[object (.*?)\]/)[1].toLowerCase();
    };

    ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach(function (item) {
        xqTree.type['is' + item] = function (obj) {
            return xqTree.type(obj) === item.toLowerCase();
        };
    });

    // 设置节点
    xqTree.prototype.setNodes = function (nodes) {
        var tree = _renderTree.call(this, nodes);
        this.element.append(tree);
        _event.call(this);
    }

    // 展开节点
    xqTree.prototype.setNodeOpen = function (node) {
        var ul = node.lastChild;
        if (ul.nodeName === "UL") {
            let spanSwitch = ul.previousSibling;
            let aLink = spanSwitch.previousSibling;

            aLink.classList.add("xqtree-node-link-open");
            spanSwitch.classList.remove("xqtree-node-switch-close");
            spanSwitch.classList.add("xqtree-node-switch-open");
            this.nodes[node.id].open = true;

            let height = this.getNodeOpenHeight(node);
            ul.style.height = height + "px";
            this.setNodeParentOpen(node, height);
        }
    }

    // 展开父节点，调整高度
    xqTree.prototype.setNodeParentOpen = function (node, height) {
        var ul = node.parentNode;
        if (ul.getAttribute("root") === "false") {
            var parentHeight = ul.clientHeight + height;
            ul.style.height = parentHeight + "px";
            this.setNodeParentOpen(ul.parentNode, height);
        }
    }

    // 关闭节点
    xqTree.prototype.setNodeClose = function (node) {
        var ul = node.lastChild;
        if (ul.nodeName === "UL") {
            let spanSwitch = ul.previousSibling;
            let aLink = spanSwitch.previousSibling;

            aLink.classList.remove("xqtree-node-link-open");
            spanSwitch.classList.remove("xqtree-node-switch-open");
            spanSwitch.classList.add("xqtree-node-switch-close");
            this.nodes[node.id].open = false;

            let height = ul.clientHeight;
            ul.style.height = "0px";
            this.setNodeParentClose(node, height);
        }
    }

    // 关闭父节点，调整高度
    xqTree.prototype.setNodeParentClose = function (node, height) {
        var ul = node.parentNode;
        if (ul.getAttribute("root") === "false") {
            var parentHeight = ul.clientHeight - height;
            ul.style.height = parentHeight + "px";
            this.setNodeParentClose(ul.parentNode, height);
        }
    }

    // 获取打开的子节点高度
    xqTree.prototype.getNodeOpenHeight = function (node) {
        var ul = node.lastChild;
        var result = 0;
        if (ul.nodeName === "UL" && this.nodes[node.id].open) {
            xqTree.forEach(ul.children, item => {
                result += item.clientHeight;
            });
        }
        return result;
    }

    // 设置节点选中
    xqTree.prototype.setNodesChecked = function (node) {
        var spanCheckbox = node.firstChild;
        spanCheckbox.classList.remove("xqtree-node-checkbox-select-false");
        spanCheckbox.classList.remove("xqtree-node-checkbox-select-part");
        spanCheckbox.classList.add("xqtree-node-checkbox-select-true");
        this.nodes[node.id].checked = true;
        if (node.lastChild.nodeName === "UL") {
            this.setNodesChildChecked(node);
        }
    }

    // 设置子节点选中
    xqTree.prototype.setNodesChildChecked = function (node) {
        var ul = node.lastChild;
        if (ul.nodeName === "UL") {
            xqTree.forEach(ul.children, item => {
                this.setNodesChecked(item);
            });
        }
    }

    // 设置子节点选中
    xqTree.prototype.setNodesParentChecked = function (node) {
        var ul = node.lastChild;
        if (ul.nodeName === "UL") {
            xqTree.forEach(ul.children, item => {
                this.setNodesChecked(item);
            });
        }
    }

    // 设置节点不选中
    xqTree.prototype.setNodesNoChecked = function (node) {
        var spanCheckbox = node.firstChild;;
        spanCheckbox.classList.add("xqtree-node-checkbox-select-false");
        spanCheckbox.classList.remove("xqtree-node-checkbox-select-part");
        spanCheckbox.classList.remove("xqtree-node-checkbox-select-true");
        this.nodes[node.id].checked = false;
        if (node.lastChild.nodeName === "UL") {
            this.setNodesChildNoChecked(node);
        }
    }

    // 设置子节点选中
    xqTree.prototype.setNodesChildNoChecked = function (node) {
        var ul = node.lastChild;
        if (ul.nodeName === "UL") {
            xqTree.forEach(ul.children, item => {
                this.setNodesNoChecked(item);
            });
        }
    }



    // 绑定事件
    function _event() {
        var _this = this;
        // 复选框点击事件
        function _eventCheckbox(e) {
            var node = this.parentNode;
            if (_this.nodes[node.id].checked) {
                _this.setNodesNoChecked(node);
            } else {
                _this.setNodesChecked(node);
            }
        }
        Array.prototype.forEach.call(this.element.getElementsByClassName("xqtree-node-checkbox"), node => {
            node.addEventListener("click", _eventCheckbox, false);
        })

        // 节点点击事件
        function _eventLink(e) {
            var node = this.parentNode;
            if (_this.nodes[node.id].open) {
                _this.setNodeClose(node);
            } else {
                _this.setNodeOpen(node);
            }
        }
        Array.prototype.forEach.call(this.element.getElementsByClassName("xqtree-node-link"), node => {
            node.addEventListener("click", _eventLink, false);
        });
    }

    // 渲染树组件函数
    function _renderTree(nodes, level, parentId) {
        level = level || 0;
        parentId = parentId || "tree_0_0_0";
        var ul = _createElement.ul(level);
        nodes.forEach(node => {
            node = Object.assign({}, defaultNode, node);

            var id = _getNodeId.call(this, node, level, parentId);

            var li = _createElement.li(level, node);
            var spanCheckbox = _createElement.spanCheckbox();
            var aLink = _createElement.aLink();
            var spanIcon = _createElement.spanIcon();
            var spanText = _createElement.spanText(node.name);
            var spanSwitch = _createElement.spanSwitch();

            li.append(spanCheckbox);
            li.append(aLink);
            aLink.append(spanIcon, spanText);
            if (xqTree.type.isArray(node.children) && node.children.length > 0) {
                var child = _renderTree.call(this, node.children, level + 1, id);
                child.style.height = node.open ? "auto" : "0";
                li.append(spanSwitch);
                li.append(child);
            }

            ul.append(li);
        });
        return ul;
    }

    function _getNodeId(node, level, parentId) {
        return _saveNode.call(this, node, level, parentId)._id;
    }

    function _saveNode(node, level, parentId) {
        parentId = parentId.split("_")[3];
        var prefix = "tree_" + level + "_" + parentId + "_";
        if (node._id === "") {
            var filterNodes = Object.keys(this.nodes).filter(item => {
                return item.indexOf(prefix) > -1;
            });
            node._id = prefix + (filterNodes.length + 1);
        }
        this.nodes[node._id] = node;
        return node;
    }

    // 获取ul的高度
    function _getUlHeight(node) {
        let allHeight = 0;
        Array.prototype.forEach.call(ul.children, item => {
            allHeight += item.clientHeight;
        });
    }

    // 创建元素
    var _createElement = {
        ul(level) {
            var ele = document.createElement("ul");
            if (level === 0) {
                ele.classList.add("xqtree");
            }
            ele.setAttribute("root", level === 0 ? true : false);
            return ele;
        },
        li(level, node) {
            var ele = document.createElement("li");
            ele.id = node._id;
            ele.classList.add("xqtree-node");
            ele.setAttribute("level", level);
            return ele;
        },
        spanCheckbox() {
            var ele = this.span("xqtree-node-checkbox", "xqtree-node-checkbox-select-false");
            return ele;
        },
        aLink() {
            var ele = document.createElement("a");
            ele.classList.add("xqtree-node-link");
            ele.href = "javascript:void(0)";
            return ele;
        },
        spanIcon() {
            var ele = this.span("xqtree-node-link-icon");
            return ele;
        },
        spanText(text) {
            var ele = this.span("xqtree-node-link-text");
            ele.innerText = text;
            return ele;
        },
        spanSwitch() {
            var ele = this.span("xqtree-node-switch", "xqtree-node-switch-close");
            return ele;
        },
        span(...className) {
            var ele = document.createElement("span");
            ele.classList.add(...className);
            return ele;
        }
    };

    return xqTree;
});
