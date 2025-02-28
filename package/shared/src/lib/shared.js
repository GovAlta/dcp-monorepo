export function jsdomPolyfill() {
    return {
        name: 'jsdom-polyfill',
        enforce: 'pre',
        async configureServer() {
            const { JSDOM } = await import('jsdom');
            const { window } = new JSDOM('<!DOCTYPE html>');

            global.HTMLElement = window.HTMLElement;
            global.customElements = window.customElements;
        },
    };
}
