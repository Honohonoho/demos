//解决addEventListener和attachEvent参数个数不相同，第一个参数意义不同
function bindEvent(node,type,handler) {
	if (node.addEventListener) { 
		node.addEventListener(type,handler); 
    }else{
		node.attachEvent("on"+type,handler); 
	}
}
/*
事件处理程序的作用域不相同，addEventListener的作用域是元素本身，this是指的触发元素，
而attachEvent事件处理程序会在全局变量内运行，this是window，
*/
function addEvent(node, type, handler) {
    if (!node) return false;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
    }
    else if (node.attachEvent) {
        node['e' + type + handler] = handler;
        node[type + handler] = function() {
            node['e' + type + handler](window.event);
        };
        node.attachEvent('on' + type, node[type + handler]);
        return true;
    }
    return false;
}
//在取消事件处理程序的时候
function removeEvent(node, type, handler) {
    if (!node) return false;
    if (node.removeEventListener) {
        node.removeEventListener(type, handler, false);
        return true;
    }
    else if (node.detachEvent) {
        node.detachEvent('on' + type, node[type + handler]);
        node[type + handler] = null;
    }
    return false;
}