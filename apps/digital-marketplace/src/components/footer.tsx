import React from 'react';
const Header = () => {
    return (
        <>
            <footer>
                <div className="goa-adm-footer">
                    <div className="goa-adm-footer-container">
                        <div className="goa-adm-footer--social-copy">
                            <div className="goa-linkedin">
                                <a
                                    href="https://www.linkedin.com/showcase/alberta-technology-and-innovation/"
                                    target="_blank"
                                >
                                    Linkedin
                                </a>
                            </div>
                            <div className="goa-copyright">
                                ©{' '}
                                <script type="text/javascript">
                                    document.write(new Date().getFullYear())
                                </script>{' '}
                                Government of Alberta
                            </div>
                            <div className="goa-disclaimer">
                                <a
                                    href="https://www.alberta.ca/disclaimer"
                                    target="_blank"
                                >
                                    Disclaimer
                                </a>
                            </div>
                        </div>
                        <span className="goa-logo">Alberta.ca</span>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Header;
