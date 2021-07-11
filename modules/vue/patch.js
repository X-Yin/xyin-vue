

function patch(oldDom, newDom) {
    const nodeTypeOld = oldDom.nodeType;
    const nodeTypeNew = newDom.nodeType;
    if(nodeTypeOld !== nodeTypeNew) {
        const cloneNode = newDom.cloneNode(true);
        oldDom.parentNode.replaceChild(cloneNode, oldDom);
        return;
    }

    if (nodeTypeNew === 3) { // element 中实际的文字
        if (oldDom.nodeValue !== newDom.nodeValue) {
            oldDom.textContent = newDom.nodeValue;
        }
        return;
    }

    const tagName1 = oldDom.tagName;
    const tagName2 = newDom.tagName;
    if (tagName1 !== tagName2) {
        const cloneNode = newDom.cloneNode(true);
        oldDom.parentNode.replaceChild(cloneNode, oldDom);
        return;
    }
    if (oldDom.attributes.length === newDom.attributes.length) {
        let attrsOld = oldDom.attributes;
        let attrsNew = newDom.attributes;

        // 先比对 attr- 表示的 html 原生属性，这种不需要替换 node，只需要动态的设置属性值即可，比如 input.value
        for (let i = 0; i < attrsNew.length; i++) {
            const attr = attrsNew[i];
            const nodeName = attr.nodeName;
            if (nodeName.startsWith('attr-')) {
                const k = nodeName.replace('attr-', '');
                if (attr.nodeValue !== oldDom[k]) {
                    oldDom[k] = attr.nodeValue;
                }
                // oldDom.setAttribute(nodeName, attr.nodeValue);
            }
        }

        for (let i = 0; i < oldDom.attributes.length; i++) {
            const nodeNameOld = attrsOld[i].nodeName;
            const nodeNameNew = attrsNew[i].nodeName;
            const nodeValueOld = attrsOld[i].nodeValue;
            const nodeValueNew = attrsNew[i].nodeValue;
            if (nodeNameOld.startsWith('attr-')) {
                continue;
            }
            if (nodeNameOld !== nodeNameNew || nodeValueOld !== nodeValueNew) {
                // const cloneNode = newDom.cloneNode(true);
                // oldDom.parentNode.replaceChild(cloneNode, oldDom);
                oldDom.parentNode.replaceChild(newDom, oldDom);
                return;
            }
        }
        const childNodesOld = oldDom.childNodes;
        const childNodesNew = newDom.childNodes;
        const maxLength = Math.max(childNodesOld.length, childNodesNew.length);
        for (let i = 0; i < maxLength; i++) {
            const nodeOld = childNodesOld[i];
            const nodeNew = childNodesNew[i];
            if (!nodeOld && nodeNew) {
                // const cloneNode = nodeNew.cloneNode(true);
                // oldDom.appendChild(cloneNode);
                oldDom.appendChild(nodeNew);
            }
            if (!nodeNew && nodeOld) {
                oldDom.removeChild(nodeOld);
            }
            if (nodeOld && nodeNew) {
                patch(nodeOld, nodeNew);
            }
        }
    } else {
        const cloneNode = newDom.cloneNode(true);
        oldDom.parentNode.replaceChild(cloneNode, oldDom);
        return;
    }
}

export default patch;