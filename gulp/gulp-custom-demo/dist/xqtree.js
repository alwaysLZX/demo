"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (global, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.xqTree = factory();
  }
}(window, function () {
  // 默认配置
  var defaultConfig = {
    onClick: function onClick() {},
    onCheck: function onCheck() {}
  }; // 默认节点对象

  var defaultNode = {
    _id: "",
    open: false,
    checked: false,
    checkedPart: false
  }; // 树构造函数

  function xqTree(ele, config, nodes) {
    if (ele !== Object(ele)) {
      throw new Error("xqTree需要一个元素容器");
    }

    this.element = ele;
    this.originalNodes = nodes;
    this.config = _objectSpread({}, defaultConfig, {}, config);
    this.nodes = {};

    if (xqTree.type.isArray(nodes) && nodes.length > 0) {
      this.setNodes(nodes);
    }
  } // 静态方法 - forEach循环


  xqTree.forEach = function (arr, func) {
    Array.prototype.forEach.call(arr, func);
  }; // 静态方法 - 类型判断


  xqTree.type = function (obj) {
    var str = Object.prototype.toString.call(obj);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
  };

  ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach(function (item) {
    xqTree.type['is' + item] = function (obj) {
      return xqTree.type(obj) === item.toLowerCase();
    };
  }); // 设置节点

  xqTree.prototype.setNodes = function (nodes) {
    var tree = _renderTree.call(this, nodes);

    this.element.append(tree);

    _event.call(this);
  }; // 展开节点


  xqTree.prototype.setNodeOpen = function (node) {
    var ul = node.lastChild;

    if (ul.nodeName === "UL") {
      var spanSwitch = ul.previousSibling;
      var aLink = spanSwitch.previousSibling;
      aLink.classList.add("xqtree-node-link-open");
      spanSwitch.classList.remove("xqtree-node-switch-close");
      spanSwitch.classList.add("xqtree-node-switch-open");
      this.nodes[node.id].open = true;
      var height = this.getNodeOpenHeight(node);
      ul.style.height = height + "px";
      this.setNodeParentOpen(node, height);
    }
  }; // 展开父节点，调整高度


  xqTree.prototype.setNodeParentOpen = function (node, height) {
    var ul = node.parentNode;

    if (ul.getAttribute("root") === "false") {
      var parentHeight = ul.clientHeight + height;
      ul.style.height = parentHeight + "px";
      this.setNodeParentOpen(ul.parentNode, height);
    }
  }; // 关闭节点


  xqTree.prototype.setNodeClose = function (node) {
    var ul = node.lastChild;

    if (ul.nodeName === "UL") {
      var spanSwitch = ul.previousSibling;
      var aLink = spanSwitch.previousSibling;
      aLink.classList.remove("xqtree-node-link-open");
      spanSwitch.classList.remove("xqtree-node-switch-open");
      spanSwitch.classList.add("xqtree-node-switch-close");
      this.nodes[node.id].open = false;
      var height = ul.clientHeight;
      ul.style.height = "0px";
      this.setNodeParentClose(node, height);
    }
  }; // 关闭父节点，调整高度


  xqTree.prototype.setNodeParentClose = function (node, height) {
    var ul = node.parentNode;

    if (ul.getAttribute("root") === "false") {
      var parentHeight = ul.clientHeight - height;
      ul.style.height = parentHeight + "px";
      this.setNodeParentClose(ul.parentNode, height);
    }
  }; // 获取打开的子节点高度


  xqTree.prototype.getNodeOpenHeight = function (node) {
    var ul = node.lastChild;
    var result = 0;

    if (ul.nodeName === "UL" && this.nodes[node.id].open) {
      xqTree.forEach(ul.children, function (item) {
        result += item.clientHeight;
      });
    }

    return result;
  }; // 设置节点选中


  xqTree.prototype.setNodeChecked = function (node) {
    this.setNodeCheckedStatus(node, true, false);

    if (node.lastChild.nodeName === "UL") {
      this.setNodeChildChecked(node);
    }

    if (node.parentNode.nodeName === "UL" && node.parentNode.getAttribute("root") === "false") {
      this.setNodeParentCheckedStatus(node);
    }
  }; // 设置子节点选中


  xqTree.prototype.setNodeChildChecked = function (node) {
    var _this2 = this;

    var ul = node.lastChild;

    if (ul.nodeName === "UL") {
      xqTree.forEach(ul.children, function (item) {
        _this2.setNodeCheckedStatus(item, true, false);

        _this2.setNodeChildChecked(item);
      });
    }
  }; // 设置父节点选中不选中状态


  xqTree.prototype.setNodeParentCheckedStatus = function (node) {
    var ul = node.parentNode;

    if (ul.nodeName === "UL" && ul.getAttribute("root") === "false") {
      var crtNode = ul.parentNode;
      var status = this.getNodeCheckedStatus(crtNode);
      this.setNodeCheckedStatus(crtNode, status.checked, status.checkedPart);
      this.setNodeParentCheckedStatus(crtNode);
    }
  }; // 设置节点不选中


  xqTree.prototype.setNodeNoChecked = function (node) {
    this.setNodeCheckedStatus(node, false, false);

    if (node.lastChild.nodeName === "UL") {
      this.setNodeChildNoChecked(node);
    }

    if (node.parentNode.nodeName === "UL" && node.parentNode.getAttribute("root") === "false") {
      this.setNodeParentCheckedStatus(node);
    }
  }; // 设置子节点选中


  xqTree.prototype.setNodeChildNoChecked = function (node) {
    var _this3 = this;

    var ul = node.lastChild;

    if (ul.nodeName === "UL") {
      xqTree.forEach(ul.children, function (item) {
        _this3.setNodeCheckedStatus(item, false, false);

        _this3.setNodeChildNoChecked(item);
      });
    }
  }; // 设置节点选中状态


  xqTree.prototype.setNodeCheckedStatus = function (node, checked, part) {
    var spanCheckbox = node.firstChild;
    spanCheckbox.classList.remove("xqtree-node-checkbox-select-false");
    spanCheckbox.classList.remove("xqtree-node-checkbox-select-part");
    spanCheckbox.classList.remove("xqtree-node-checkbox-select-true");

    if (checked && !part) {
      spanCheckbox.classList.add("xqtree-node-checkbox-select-true");
      this.nodes[node.id].checked = true;
      this.nodes[node.id].checkedPart = false;
    } else if (checked && part) {
      spanCheckbox.classList.add("xqtree-node-checkbox-select-part");
      this.nodes[node.id].checked = true;
      this.nodes[node.id].checkedPart = true;
    } else {
      spanCheckbox.classList.add("xqtree-node-checkbox-select-false");
      this.nodes[node.id].checked = false;
      this.nodes[node.id].checkedPart = false;
    }
  }; // 获取节点选中状态通过子节点确认


  xqTree.prototype.getNodeCheckedStatus = function (node) {
    var _this4 = this;

    var ul = node.lastChild;
    var result = {
      checked: true,
      checkedPart: false
    };

    if (ul.nodeName === "UL") {
      var checkCount = 0;
      var checkedPartCount = 0;
      xqTree.forEach(ul.children, function (item) {
        var nodeData = _this4.getNodeObj(item);

        if (nodeData.checked) {
          checkCount++;

          if (nodeData.checkedPart) {
            checkedPartCount++;
          }
        }
      });

      if (checkCount === 0) {
        result.checked = false;
        result.checkedPart = false;
      } else if (checkCount === ul.childElementCount && checkedPartCount === 0) {
        result.checked = true;
        result.checkedPart = false;
      } else {
        result.checked = true;
        result.checkedPart = true;
      }
    }

    return result;
  }; // 获取节点数据


  xqTree.prototype.getNodeObj = function (node) {
    return this.nodes[node.id];
  }; // 绑定事件


  function _event() {
    var _this = this; // 复选框点击事件


    function _eventCheckbox(e) {
      var node = this.parentNode;

      var obj = _this.getNodeObj(node);

      if (obj.checked && !obj.checkedPart) {
        _this.setNodeNoChecked(node);
      } else {
        _this.setNodeChecked(node);
      }

      _this.config.onCheck(e, obj);
    }

    Array.prototype.forEach.call(this.element.getElementsByClassName("xqtree-node-checkbox"), function (node) {
      node.addEventListener("click", _eventCheckbox, false);
    }); // 节点点击事件

    function _eventLink(e) {
      var node = this.parentNode;

      var obj = _this.getNodeObj(node);

      if (obj.open) {
        _this.setNodeClose(node);
      } else {
        _this.setNodeOpen(node);
      }

      _this.config.onClick(e, obj);
    }

    Array.prototype.forEach.call(this.element.getElementsByClassName("xqtree-node-link"), function (node) {
      node.addEventListener("click", _eventLink, false);
    });
  } // 渲染树组件函数


  function _renderTree(nodes, level, parentId) {
    var _this5 = this;

    level = level || 0;
    parentId = parentId || "tree_0_0_0";

    var ul = _createElement.ul(level);

    nodes.forEach(function (node) {
      node = Object.assign({}, defaultNode, node);

      var id = _getNodeId.call(_this5, node, level, parentId);

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
        var child = _renderTree.call(_this5, node.children, level + 1, id);

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
      var filterNodes = Object.keys(this.nodes).filter(function (item) {
        return item.indexOf(prefix) > -1;
      });
      node._id = prefix + (filterNodes.length + 1);
    }

    this.nodes[node._id] = node;
    return node;
  } // 创建元素


  var _createElement = {
    ul: function ul(level) {
      var ele = document.createElement("ul");

      if (level === 0) {
        ele.classList.add("xqtree");
      }

      ele.setAttribute("root", level === 0 ? true : false);
      return ele;
    },
    li: function li(level, node) {
      var ele = document.createElement("li");
      ele.id = node._id;
      ele.classList.add("xqtree-node");
      ele.setAttribute("level", level);
      return ele;
    },
    spanCheckbox: function spanCheckbox() {
      var ele = this.span("xqtree-node-checkbox", "xqtree-node-checkbox-select-false");
      return ele;
    },
    aLink: function aLink() {
      var ele = document.createElement("a");
      ele.classList.add("xqtree-node-link");
      ele.href = "javascript:void(0)";
      return ele;
    },
    spanIcon: function spanIcon() {
      var ele = this.span("xqtree-node-link-icon");
      return ele;
    },
    spanText: function spanText(text) {
      var ele = this.span("xqtree-node-link-text");
      ele.innerText = text;
      return ele;
    },
    spanSwitch: function spanSwitch() {
      var ele = this.span("xqtree-node-switch", "xqtree-node-switch-close");
      return ele;
    },
    span: function span() {
      var _ele$classList;

      var ele = document.createElement("span");

      (_ele$classList = ele.classList).add.apply(_ele$classList, arguments);

      return ele;
    }
  };
  return xqTree;
});