/******************************************************************************
 * adm-scripts
 *
 ******************************************************************************/

window.addEventListener(
    'load',
    function () {
        var fieldset = document.querySelectorAll('form > fieldset > fieldset');
        if (fieldset.length > 0) {
            for (var c = 0; c < fieldset.length; c++) {
                if (fieldset[c].children.length <= 6) {
                    fieldset[c].classList.add('adm-single-column');
                }
            }
        }

        /* Mobile Menu Toggle ****/

        var mobileBtn = document.querySelector('button.goa-adm-button');
        var mobileMenu = document.querySelector('nav.goa-adm-nav-menu');

        mobileBtn.onclick = function () {
            if (mobileBtn.getAttribute('aria-expanded') == 'true') {
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('mobile-active');
            } else {
                mobileBtn.setAttribute('aria-expanded', 'true');
                mobileMenu.classList.add('mobile-active');
            }
            return false;
        };

        window.addEventListener(
            'resize',
            function () {
                var viewWidth = getViewportWidth();
                if (viewWidth > 1080) {
                    if (mobileMenu.className.indexOf('mobile-active') != -1) {
                        mobileMenu.classList.remove('mobile-active');
                        mobileBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            },
            false,
        );

        /* getViewportWidth **********************************************/

        function getViewportWidth() {
            return window.innerWidth
                ? window.innerWidth
                : document.documentElement &&
                    document.documentElement.clientWidth
                  ? document.documentElement.clientWidth
                  : document.body && document.body.clientWidth
                    ? document.body.clientWidth
                    : 0;
        }
    },
    false,
);

window.onload = function () {
    var body = document.querySelector('body');
    body.classList.add('loaded');
};
