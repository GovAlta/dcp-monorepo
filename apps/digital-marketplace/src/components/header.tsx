import React from 'react';
import albertaLogo from '../img/albertaLogo.svg';
import mobileLogo from '../img/mobile-logo.svg'
const Header = ({ page }: any) => {
  // useEffect(() => { });

  return (
    <>
      <header>
        <div className="goa-adm-skiplinks">
          <a href="#main">Skip to content</a>
        </div>
        <div className="goa-adm-microsite-header">
          <div className="container">
            {/* <!--div className="goa-adm-microsite-header-type"><span>Alpha</span></div--> */}

            <div className="goa-adm-microsite-header-content">
              <p>
                This is a new <a href="https://www.alberta.ca/" target="_blank">Alberta Government</a> service.
              </p>
            </div>
          </div>
        </div>

        <div className="goa-adm-main-header">
          <div className="container">
            <div className="goa-adm-logo">
              <div className="goa-logo">
                <a href="/" title="Home" rel="home">
                  <img className="desktop-logo" src={albertaLogo} alt="Alberta Logo" />
                  <img className="mobile-logo" src={mobileLogo} alt="Mobile Logo" />
                </a>
              </div>
            </div>

            <div className="goa-adm-nav">
              <div className="goa-adm-nav-button">
                <button className="goa-adm-button" aria-expanded="false">
                  Menu
                </button>
              </div>
              <nav className="goa-adm-nav-menu">
                <ul>
                <li className={page === 'About' ? 'goa-adm-nav-active-item' : ''}> <a href="/about-us/">About</a></li>
                <li className={page === 'Supplier Outreach Program' ? 'goa-adm-nav-active-item' : ''}> <a href="/supplier-outreach-program/">Supplier Outreach Program</a></li>
                <li className={page === 'Understanding Procurement' ? 'goa-adm-nav-active-item' : ''}> <a href="/understanding-procurement/">Understanding Procurement</a></li>
                <li className={page === 'Join' ? 'goa-adm-nav-active-item' : ''}> <a href="/join/">Join</a></li>
                <li className={page === 'Contact'   ? 'goa-adm-nav-active-item' : ''}> <a href="/contact-us/">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;