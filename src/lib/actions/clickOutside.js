/** @param {HTMLElement} node */
export function clickOutside(node) {
    /** @param {MouseEvent} event */
    const handleClick = (event) => {
        if (!node.contains(/** @type {Node} */ (event.target))) {
            node.dispatchEvent(new CustomEvent('clickoutside'));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
} 