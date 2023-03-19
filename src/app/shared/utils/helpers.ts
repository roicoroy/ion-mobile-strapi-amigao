/**
 * Class extension methods for HTMLElement
 * Implemented using augmenting global scope from modules
 *
 * {@link https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#augmenting-globalmodule-scope-from-modules}
 */
export { };

/** Function type required for symbolic link handler */
export type SymbolicLinkHandler = (element: Element, navigateTo: string, navigateType: string) => void;

declare global {
    /** Extension for HTMLElement */
    interface HTMLElement {

        /**
         * Finds or creates a label for this element and links it to native `<input>` element via id.
         * This element must be placed into an `ancestorTag`, else nothing will be done.
         * If ancestor tag does not contain a child `<label>`, creates it and wraps around `tagToWrap`.
         *
         * @param id value provided for linking
         * @param ancestorTag name of the ancestor tag (default value `ion-item`)
         * @param tagToWrap name of the tag that the label should wrap (default value `ion-label`)
         */
        linkToLabelById(id: string, ancestorTag?: string, tagToWrap?: string): void;

        /**
         * Finds and returns a child element `wrapperTag`.
         * If not found, creates it as a wrapper for a child element `tagToWrap`, which must exist.
         * If tag-to-wrap is not found, does not create the wrapper and returns `undefined`.
         *
         * @param wrapperTag name of the wrapper to find / create
         * @param tagToWrap name of the tag the wrapper should wrap when created
         * @returns found or created wrapper element, or `undefined`
         */
        findOrCreateChildWrapper(wrapperTag: string, tagToWrap?: string): HTMLElement;

        /**
         * Creates a wrapper element for this element.
         *
         * @param tagName name of the element to be created
         * @returns created element
         */
        createWrapperElement(tagName: string): HTMLElement;

        /**
         * Finds and returns an element `siblingTag` which has a common parent with this element
         * or with its ancestor `ancestorTag` (if provided).
         * @param siblingTag name of the tag in question
         * @param ancestorTag optional name of the common ancestor tag
         * @returns found sibling element or `null`
         */
        findSiblingElement(siblingTag: string, ancestorTag?: string): HTMLElement;

        /**
         * Identify symbolic links within current scope and add handler to it
         * @param handlerFn on tap handler for symbolic links
         */
        addSymbolicLinkHandler(handlerFn: SymbolicLinkHandler): void;
    }
}


HTMLElement.prototype.linkToLabelById = function(this: HTMLElement, id: string, ancestorTag = 'ion-item', tagToWrap = 'ion-label'): void {

    const ancestorElement: HTMLElement = this.closest(ancestorTag);
    if (ancestorElement == null) { return; }
    const labelElement = ancestorElement.findOrCreateChildWrapper('label', tagToWrap);
    if (labelElement == null) { return; }

    labelElement.setAttribute('for', id);
};

HTMLElement.prototype.findOrCreateChildWrapper = function(this: HTMLElement, wrapperTag: string, tagToWrap?: string): HTMLElement {

    let wrapperElement = this.querySelector<HTMLElement>(wrapperTag);

    if (wrapperElement == null && tagToWrap != null) {
        const elementToWrap = this.querySelector<HTMLElement>(tagToWrap);

        if (elementToWrap != null) {
            wrapperElement = elementToWrap.createWrapperElement(wrapperTag);
        }
    }

    return wrapperElement;
};

HTMLElement.prototype.createWrapperElement = function(this: HTMLElement, tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    this.parentElement.appendChild(element);
    element.appendChild(this);

    return element;
};

HTMLElement.prototype.findSiblingElement = function(this: HTMLElement, siblingTag: string, ancestorTag?: string): HTMLElement {
    const parentElement = ancestorTag != null ? this.closest(ancestorTag) : this.parentElement;

    return parentElement != null ? parentElement.querySelector(siblingTag) : null;
};

HTMLElement.prototype.addSymbolicLinkHandler = function(this: HTMLElement, handlerFn: SymbolicLinkHandler): void {
    this.querySelectorAll('a[navigateto]')
        .forEach(element => {
            const navigateTo = element.getAttribute('navigateto');
            const navigateType = element.getAttribute('navigationtype');
            const handler: EventListener = (event) => {
                handlerFn(element, navigateTo, navigateType);
                // prevent default click event for checkbox and radio button labels
                event.preventDefault();
            };
            element.removeEventListener('click', element['symbolic-link-handler']);
            element.addEventListener('click', handler);
            element['symbolic-link-handler'] = handler;
        });
};
