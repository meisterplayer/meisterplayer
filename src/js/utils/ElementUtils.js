class ElementUtils {
    static classListAdd(element, ...classNames) {
        for (let i = 0; i < classNames.length; i += 1) {
            const className = classNames[i];

            element.classList.add(className);
        }
    }

    static classListRemove(element, ...classNames) {
        for (let i = 0; i < classNames.length; i += 1) {
            const className = classNames[i];

            element.classList.remove(className);
        }
    }
}

export default ElementUtils;
