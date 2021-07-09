

function patch(oldDom, newDom) {

    const nodeTypeOld = oldDom.nodeType;
    const nodeTypeNew = newDom.nodeType;
    if(nodeTypeOld !== nodeTypeNew) {
        const cloneNode = newDom.cloneNode(true);
        console.log(oldDom, newDom);
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
        const attrsOld = oldDom.attributes;
        const attrsNew = newDom.attributes;
        for (let i = 0; i < oldDom.attributes.length; i++) {
            const nodeNameOld = attrsOld[i].nodeName;
            const nodeNameNew = attrsNew[i].nodeName;
            const nodeValueOld = attrsOld[i].nodeValue;
            const nodeValueNew = attrsNew[i].nodeValue;
            if (nodeNameOld !== nodeNameNew || nodeValueOld !== nodeValueNew) {
                const cloneNode = newDom.cloneNode(true);
                oldDom.parentNode.replaceChild(cloneNode, oldDom);
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
                const cloneNode = nodeNew.cloneNode(true);
                oldDom.appendChild(cloneNode);
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