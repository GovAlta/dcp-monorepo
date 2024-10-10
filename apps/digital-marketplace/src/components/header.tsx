import React from 'react';
import albertaLogo from '../img/albertaLogo.svg';

const Header = ({ page }: any) => {
  // useEffect(() => { });

  return (
    <>
      <header>
        <div className="goa-adm-microsite-header">
          <div className="container">
            {/* <!--div className="goa-adm-microsite-header-type"><span>Alpha</span></div--> */}
            <div className="goa-adm-microsite-header-content">
              <p>
                This is a new{' '}
                <a href="https://www.alberta.ca/" target="_blank">
                  Alberta Government
                </a>{' '}
                service.
              </p>
            </div>
          </div>
        </div>

        <div className="goa-adm-main-header">
          <div className="container">
            <div className="goa-adm-logo">
              <div className="goa-logo">
                <a href="/" title="Home" rel="home">
                  <img
                    className="desktop-logo"
                    src={albertaLogo}
                    alt="Alberta Logo"
                  />
                  <svg
                    className="mobile-logo"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2034_17934)">
                      <path fill="#00AAD2"
                        d="M20 0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56824 36.9638 8.69181 38.4776 12.3463C39.9913 16.0009 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0009 39.9913 12.3463 38.4776C8.69181 36.9638 5.56824 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0V0Z"
                      />
                      <path fill="white"
                        d="M25.8691 27.5888C24.5003 27.084 23.1643 26.4942 21.8691 25.8228C23.0449 25.391 24.1915 24.8833 25.3015 24.3028C25.4147 25.4103 25.6041 26.5086 25.8683 27.59M33.2195 13.978C32.6467 13.9056 32.9443 14.172 32.7847 14.9268C32.0947 18.1812 29.4331 20.5268 26.7611 22.1004C26.4811 18.3736 26.5955 14.236 27.2971 11.7004C27.8891 9.56001 28.5931 9.95281 27.7199 9.50321C26.7999 9.03001 25.8139 9.65521 25.0151 11.2496C24.2163 12.844 20.5379 21.4992 14.6579 27.3436C11.6503 30.3352 8.9299 28.7944 8.3851 28.3344C7.9419 27.96 7.7783 28.538 8.3283 29.13C10.7607 31.7528 14.3143 30.248 15.6083 28.9548C19.1843 25.3804 23.3419 17.686 25.0239 14.4212C24.828 17.2647 24.8731 20.1197 25.1587 22.9556C23.804 23.6203 22.3911 24.1593 20.9379 24.5656C20.1043 24.784 19.5887 25.1236 19.5735 25.5096C19.5571 25.9324 20.1167 26.2892 20.9259 26.6732C22.3659 27.3572 26.5851 29.3504 27.6247 29.9532C28.5147 30.4696 28.9491 30.0668 29.2127 29.5092C29.5571 28.7824 28.6127 28.3624 27.6975 28.0888C27.2936 26.5548 27.0192 24.9895 26.8771 23.4096C29.0219 22.0896 31.1335 20.3296 32.3507 18.1348C32.7437 17.3635 33.0358 16.5447 33.2199 15.6988C33.3473 15.1779 33.3821 14.6386 33.3227 14.1056C33.3227 14.1056 33.3067 13.9892 33.2199 13.978"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2034_17934">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                <li className={page === 'About'     ? 'goa-adm-nav-active-item' : ''}> <a href="/about-us/">About</a></li>
                <li className={page === 'Suppliers' ? 'goa-adm-nav-active-item' : ''}> <a href="/for-suppliers/">Suppliers</a></li>
                <li className={page === 'Partners'  ? 'goa-adm-nav-active-item' : ''}> <a href="/for-partners/">Community partners</a></li>
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