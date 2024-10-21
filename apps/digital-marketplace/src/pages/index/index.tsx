import React, { useEffect } from 'react';

import hero_mobile from '../../img/hero-mobile-tablet.svg';
import suppliers_thumb from '../../img/supplier-icon-home.svg';
import partners_thumb from '../../img/stakeholder-icon-home.svg';
import handShakeLine from '../../img/handShakeLine.svg';

const HomePage = () => {
  // useEffect(() => { }, []);

  return (
    <>
      <div className="goa-adm-body-header goa-adm-body-full">
        <div className="container">
          <div className="goa-adm-body-header-content">
            <h1>Introducing the Alberta Digital Marketplace</h1>
            <p className="lede">
              Streamlining digital procurement for suppliers and public sector
              buyers.
            </p>
          </div>

          <div className="goa-adm-body-header-graphic">
            <div className="goa-adm-home-tablet-graphic">
              <img
                src={hero_mobile}
                alt="Illustration of Alberta's landscape"
              />
            </div>
            <div className="goa-adm-body-full-side-one">
              <div className="goa-adm-body-full-side-one-img">
                <img
                  src={handShakeLine}
                  width="144"
                  height="612"
                  alt="Hand shake line"
                />
              </div>
            </div>
            <div className="goa-adm-body-full-side-two">
              <div className="goa-adm-body-full-side-two-img">
                <div className="sun-cloud">
                  {' '}
                  {/* The class creates movement */}
                  {/* svg must be on the page to allow movement */}
                  <svg width="113" height="118" viewBox="0 0 113 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse fill="#E0B701" cx="62.4381" cy="57.9333" rx="46.4381" ry="45.9333" />
                  </svg>
                  <svg width="133" height="53" viewBox="0 0 133 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M1.00007 52.833V52.7192C1.00002 52.7382 1 52.7571 1 52.7761C1 52.7951 1.00002 52.814 1.00007 52.833ZM3.41897 42.1895C7.35522 34.0615 15.6829 28.4563 25.3198 28.4563C26.946 28.4563 28.535 28.6159 30.0718 28.9203C34.5015 22.9297 41.6167 19.0452 49.6391 19.0452C55.8488 19.0452 61.515 21.3726 65.8129 25.2026C69.7861 11.2316 82.6414 1 97.8865 1C116.301 1 131.228 15.9276 131.228 34.3417C131.228 37.0448 130.906 39.6728 130.299 42.1895H3.41897Z" />
                    <path fill="#004070" d="M1.00007 52.833L6.77247e-05 52.8353L2.00007 52.833H1.00007ZM1.00007 52.7192H2.00007L6.77247e-05 52.7169L1.00007 52.7192ZM3.41897 42.1895L2.51896 41.7536L1.8236 43.1895H3.41897V42.1895ZM30.0718 28.9203L29.8775 29.9013L30.4991 30.0244L30.8758 29.5149L30.0718 28.9203ZM65.8129 25.2026L65.1476 25.9492L66.3384 27.0104L66.7747 25.4762L65.8129 25.2026ZM130.299 42.1895V43.1895H131.087L131.271 42.424L130.299 42.1895ZM2.00007 52.833V52.7192H6.51042e-05V52.833H2.00007ZM6.77247e-05 52.7169C2.25828e-05 52.7367 0 52.7564 0 52.7761H2C2 52.7579 2.00002 52.7397 2.00006 52.7215L6.77247e-05 52.7169ZM0 52.7761C0 52.7958 2.25828e-05 52.8156 6.77247e-05 52.8353L2.00006 52.8307C2.00002 52.8125 2 52.7943 2 52.7761H0ZM25.3198 27.4563C15.2852 27.4563 6.61591 33.2937 2.51896 41.7536L4.31899 42.6253C8.09453 34.8292 16.0807 29.4563 25.3198 29.4563V27.4563ZM30.2661 27.9394C28.6656 27.6224 27.0116 27.4563 25.3198 27.4563V29.4563C26.8804 29.4563 28.4043 29.6094 29.8775 29.9013L30.2661 27.9394ZM49.6391 18.0452C41.2861 18.0452 33.8779 22.0911 29.2677 28.3258L30.8758 29.5149C35.1251 23.7683 41.9472 20.0452 49.6391 20.0452V18.0452ZM66.4782 24.456C62.0042 20.4691 56.1035 18.0452 49.6391 18.0452V20.0452C55.5941 20.0452 61.0258 22.2761 65.1476 25.9492L66.4782 24.456ZM97.8865 0C82.1827 0 68.9433 10.5396 64.851 24.9291L66.7747 25.4762C70.629 11.9237 83.1001 2 97.8865 2V0ZM132.228 34.3417C132.228 15.3753 116.853 0 97.8865 0V2C115.748 2 130.228 16.4799 130.228 34.3417H132.228ZM131.271 42.424C131.897 39.8311 132.228 37.1244 132.228 34.3417H130.228C130.228 36.9652 129.916 39.5145 129.327 41.9549L131.271 42.424ZM3.41897 43.1895H130.299V41.1895H3.41897V43.1895Z" />
                  </svg>
                </div>

                <svg width="822" height="612" viewBox="0 0 822 612" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1903_12257)">
                    <g clip-path="url(#clip1_1903_12257)">
                    <path d="M380.5 461L380.5 509.114C380.5 514.637 376.023 519.114 370.5 519.114L-505.154 519.114L-762.606 519.114" stroke="#005072" stroke-width="2"/>
                    <path d="M158.984 279.523L160.953 272.855L173.493 257.932L182.611 272.855L175.523 267.71L170.601 275.713L169.616 269.616L158.984 279.523Z" fill="#AAC9E7"/>
                    <path d="M540.363 226.81L534.705 214.077L562.526 177.296L580.917 199.931L570.543 217.85L559.697 205.118L540.363 226.81Z" fill="#AAC9E7"/>
                    <path d="M323.028 218.56L314.017 207.476L337.123 177.768L376.734 225.395L352.616 212.131L344.171 223.311L333.767 205.422L323.028 218.56Z" fill="#AAC9E7"/>
                    <path d="M456.549 315.875L398.565 251.322L443.92 194.796L500.452 258.217L484.384 279.22L456.549 315.875Z" fill="#AAC9E7"/>
                    <path d="M76.3523 376.158L173.199 258.217L220.479 323.697M180.094 376.158L336.758 177.499L398.565 251.322M456.872 316.234L398.565 251.322M398.565 251.322L443.92 194.796L500.452 258.217M410.771 376.158L484.384 279.22L562.2 177.499L727.342 375.682" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M218.497 361.436V374.351" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M712.74 139.912V218.372" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M724.598 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M751.874 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M737.644 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M766.105 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M777.965 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M805.238 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M792.195 139.912V225.395" stroke="#00B6ED" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M686.966 79.772L686.966 358.994" stroke="#005072" stroke-width="2"/>
                    <ellipse cx="685.891" cy="107.159" rx="20.4047" ry="20.9416" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M666.56 107.693C670.29 107.693 737.82 107.693 833.019 107.693" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M31.1863 341.333L53.5002 193.609L78.4392 341.333H53.5002H31.1863Z" fill="#40CE97"/>
                    <path d="M54.1892 341.869V375.821" stroke="#005072" stroke-width="2"/>
                    <path d="M96.6956 352.427L110.895 254.823L126.766 352.427H110.895H96.6956Z" fill="#1EA9A1"/>
                    <path d="M673.004 348.246L687.204 265.562L703.074 348.246H687.204H673.004Z" fill="#40CE97"/>
                    <path d="M687.204 375.682V348.246M687.204 348.246H673.004L687.204 265.562L703.074 348.246H687.204Z" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M140.962 345.692C140.299 345.049 139.448 343.948 139.243 342.77C138.812 340.29 142.855 338.29 144.335 340.326C144.927 341.141 145.172 342.526 144.699 344.691" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M144.757 344.609C145.31 343.897 146.242 343.036 147.321 342.765C149.762 342.152 152.074 346.065 150.117 347.646C149.362 348.256 148.074 348.487 146.115 347.889" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M144.055 349.975C144.37 350.807 144.643 352.014 144.356 353.054C143.689 355.481 139.394 355.275 138.735 352.846C138.404 351.627 138.909 350.088 141.181 348.679" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M140.798 348.572C140.009 348.898 138.773 349.467 137.655 349.542C135.144 349.711 134.606 344.792 137.094 344.412C137.989 344.276 139.236 344.641 140.918 345.854" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M146.264 347.902C146.756 348.127 147.403 348.331 148.024 348.588C151.412 349.993 146.239 355.296 144.684 351.974C144.426 351.425 144.231 350.739 144.124 349.902" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="143.413" cy="347.092" r="2.95664" transform="rotate(19.5393 143.413 347.092)" fill="#DFBC40" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M144.982 353.749C145.034 358.295 147.71 368.689 158.001 373.897" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M156.761 373.894L152.731 336.389M152.731 336.389L154.436 331.74M152.731 336.389L151.956 331.74M152.731 336.389L149.942 333.444M152.731 336.389L156.141 334.064M152.731 336.389L149.322 336.079" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M162.057 347.115C161.882 346.652 161.716 346.004 161.713 345.353C161.701 342.836 166.629 342.849 166.176 345.325C166.059 345.965 165.7 346.736 165.001 347.646" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M165.068 347.609C165.484 347.397 166.041 347.195 166.617 347.134C169.119 346.868 169.439 351.987 166.968 351.51C166.384 351.397 165.703 351.044 164.938 350.351" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M162.81 351.133C162.775 351.586 162.672 352.147 162.451 352.658C161.45 354.967 157.048 352.683 158.462 350.601C158.892 349.967 159.751 349.45 161.226 349.28" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M160.994 349.078C160.545 349.057 159.914 349.045 159.302 348.941C156.822 348.516 158.544 343.797 160.522 345.353C160.986 345.718 161.475 346.315 161.974 347.216" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M165.037 350.409C165.081 350.46 165.127 350.513 165.176 350.566C167.656 353.268 161.842 355.052 162.764 351.503C162.798 351.373 162.837 351.24 162.881 351.104" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="163.311" cy="348.905" r="2.28654" transform="rotate(44.7516 163.311 348.905)" fill="#DFBC40" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M156.938 373.441V373.441C160.672 368.122 162.676 361.781 162.676 355.283V353.167" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M282.077 367.505C268.219 367.505 260.5 373.363 258.373 376.293H504.525C494.193 371.166 466.964 362.232 440.708 367.505C407.888 374.096 370.509 357.253 344.07 356.52C317.632 355.788 299.398 367.505 282.077 367.505Z" fill="#40CE97"/>
                    <path d="M970.296 367.505C984.154 367.505 991.873 373.363 994 376.293H747.848C758.18 371.166 785.409 362.232 811.665 367.505C844.485 374.096 881.864 357.253 908.303 356.52C934.741 355.788 952.975 367.505 970.296 367.505Z" fill="#1EA9A1"/>
                    <path d="M737.946 329.412C735.659 331.512 732.458 336.915 737.946 341.732C744.196 337.193 740.232 331.542 737.946 329.412Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M748.854 337.175C745.72 336.433 739.29 336.838 738.649 344.395C746.223 347.127 748.485 340.396 748.854 337.175Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M748.854 344.779C745.72 344.037 739.29 344.442 738.649 351.999C746.223 354.73 748.485 348 748.854 344.779Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M748.854 352.278C745.72 351.536 739.29 351.941 738.649 359.498C746.223 362.23 748.485 355.499 748.854 352.278Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M727.382 337.175C730.517 336.433 736.947 336.838 737.588 344.395C730.014 347.127 727.752 340.396 727.382 337.175Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M727.382 344.779C730.517 344.037 736.947 344.442 737.588 351.999C730.014 354.73 727.752 348 727.382 344.779Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <path d="M727.382 352.278C730.517 351.536 736.947 351.941 737.588 359.498C730.014 362.23 727.752 355.499 727.382 352.278Z" fill="#DFBC40" stroke="#004070" stroke-width="2"/>
                    <rect x="737.996" y="341.62" width="0.684461" height="33.0823" fill="#DFBC40" stroke="#004070" stroke-width="0.684461"/>
                    <ellipse cx="218.965" cy="346.108" rx="13.4241" ry="15.035" fill="#1EA9A1" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M830.19 376.054H7.55957" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M194.103 354.262V375.786" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <ellipse cx="194.802" cy="313.89" rx="13.9611" ry="40.8094" fill="#40CE97" stroke="#004070" stroke-width="2" stroke-linecap="round"/>
                    <path d="M111.248 351.772V375.821" stroke="#005072" stroke-width="2"/>
                    <path d="M582.814 322.152C582.814 323.28 581.116 325.01 579.549 324.784C577.59 324.502 576.471 322.998 576.378 321.494M576.378 321.494C576.285 319.99 577.404 315.572 582.627 315.384C587.85 315.196 590.426 321.776 587.664 325.066C587.469 325.36 587.214 325.654 586.918 325.932M576.378 321.494C575.632 321.337 573.524 321.4 572.927 322.904M582.814 327.604C584.069 327.827 585.791 326.99 586.918 325.932M572.927 322.904C572.181 324.784 569.14 325.066 567.983 322.152C566.23 317.734 570.875 313.692 575.352 315.384M572.927 322.904L571.254 327.962C570.691 329.664 570.253 331.404 569.942 333.169V333.169C569.403 336.238 569.891 340.568 573.004 340.42C574.871 340.331 576.416 338.803 576.751 338.32M584.119 331.74C584.151 332.085 583.933 332.943 582.814 333.62C581.415 334.466 577.404 337.38 576.751 338.32M576.751 338.32C576.627 340.137 576.583 345.051 577.404 350.164C578.225 355.278 582.72 357.434 584.866 357.872M597.475 331.874C595.31 331.441 591.544 331.138 586.918 325.932" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M596.392 331.657C605.713 333.706 614.942 331.667 619.864 332.039C626.016 332.505 627.227 336.043 627.227 338.371C627.227 339.445 627.558 341.251 627.933 342.934M612.966 347.775C613.389 351.577 615.091 354.5 616.898 356.528M627.034 336.788C629.923 338.588 636.418 343.083 634.404 344.423C632.391 345.764 629.251 343.989 627.933 342.934M627.933 342.934C628.209 344.169 628.508 345.337 628.719 346.099C629.154 347.372 629.893 351.854 629.371 359.601C628.986 365.316 629.727 370.47 630.479 373.74C630.788 375.083 629.792 376.455 628.414 376.455H627.55C626.445 376.455 625.55 375.559 625.55 374.455V372.637C625.671 371.572 625.24 368.587 623.027 363.932C621.648 361.032 619.035 358.925 616.898 356.528V356.528M616.898 356.528C615.656 357.396 613.292 358.724 610.357 359.601M597.867 360.253C602.59 361.1 606.89 360.636 610.357 359.601M598.799 349.358C599.047 350.258 598.966 353.865 596.655 361.091V373.989C596.655 375.094 595.759 375.989 594.655 375.989H592.998C591.813 375.989 590.888 374.964 591.009 373.785L591.155 372.358C590.441 368.633 589.068 360.104 589.291 355.783M587.707 360.253C587.179 361.37 586.029 364.145 585.656 366.305C585.363 368.001 585.013 371.569 584.786 374.15C584.695 375.188 583.827 375.989 582.785 375.989H581.326C580.115 375.989 579.182 374.922 579.344 373.722L580.343 366.305L582.021 357.739M619.864 359.415V370.03C620.338 371.09 621.098 373.089 621.306 374.588C621.422 375.427 620.695 375.989 619.847 375.989H617.763C616.658 375.989 615.763 375.094 615.763 373.989V371.333C615.701 369.934 614.458 365.743 610.357 359.601" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M555.745 334.115C555.745 334.994 557.069 336.343 558.291 336.167C559.818 335.947 560.691 334.774 560.763 333.602M560.763 333.602C560.836 332.429 559.963 328.984 555.891 328.838C551.818 328.691 549.81 333.822 551.963 336.387C552.115 336.616 552.314 336.845 552.545 337.062M560.763 333.602C561.345 333.48 562.989 333.528 563.454 334.701M555.745 338.366C554.767 338.54 553.423 337.887 552.545 337.062M563.454 334.701C564.036 336.167 566.407 336.387 567.309 334.115C568.676 330.67 565.054 327.518 561.563 328.838M563.454 334.701L564.759 338.645C565.197 339.972 565.539 341.329 565.781 342.705V342.705C566.202 345.098 565.821 348.474 563.394 348.358C561.938 348.289 560.734 347.097 560.472 346.721M554.727 341.591C554.703 341.859 554.872 342.529 555.745 343.057C556.836 343.716 559.963 345.988 560.472 346.721M560.472 346.721C560.569 348.138 560.603 351.969 559.963 355.956C559.323 359.943 555.818 361.624 554.145 361.966M543.085 341.797C544.83 341.664 548.938 341.121 552.545 337.062" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <path d="M545.818 341.535C538.551 343.132 530.693 341.535 526.856 341.825C522.059 342.188 521.114 344.947 521.114 346.762C521.114 347.599 520.857 349.008 520.564 350.319M532.234 354.095C531.904 357.059 530.578 359.338 529.168 360.919M521.265 345.528C519.013 346.931 513.949 350.436 515.518 351.481C517.088 352.526 519.536 351.142 520.564 350.319M520.564 350.319C520.349 351.283 520.116 352.194 519.952 352.788C519.612 353.78 519.036 357.275 519.443 363.315C519.728 367.553 519.22 371.395 518.665 373.955C518.396 375.193 519.316 376.456 520.584 376.456V376.456C521.599 376.456 522.423 375.633 522.423 374.617V373.479C522.328 372.649 522.664 370.322 524.389 366.692C525.464 364.431 527.502 362.788 529.168 360.919V360.919M529.168 360.919C530.137 361.596 531.98 362.631 534.269 363.315M544.007 363.823C540.324 364.484 536.971 364.122 534.269 363.315M543.281 355.329C543.087 356.031 543.15 358.843 544.952 364.477V374.093C544.952 375.198 545.848 376.093 546.952 376.093H547.315C548.5 376.093 549.425 375.068 549.304 373.889L549.24 373.262C549.797 370.358 550.868 363.707 550.693 360.338M551.929 363.823C552.341 364.695 553.237 366.858 553.528 368.542C553.741 369.778 553.994 372.288 554.17 374.254C554.264 375.293 555.131 376.093 556.174 376.093H556.4C557.611 376.093 558.544 375.026 558.382 373.826L557.67 368.542L556.362 361.863M526.856 363.17V371.447C526.518 372.203 525.993 373.571 525.782 374.693C525.625 375.526 526.332 376.093 527.18 376.093H528.054C529.158 376.093 530.054 375.198 530.054 374.093V372.463C530.102 371.372 531.071 368.104 534.269 363.315" stroke="#005072" stroke-width="2" stroke-linecap="round"/>
                    <g clip-path="url(#clip2_1903_12257)">
                    <path d="M11.0002 398H71.7416M87.1294 398H104.947M121.954 398H189.175H179.456M201.323 398H313.897" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M390.19 413.941H329.221M313.775 413.941H295.891M278.819 413.941H234.921M221.101 413.941H211.346M199.152 413.941H86.1549" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M410.687 413.941H522.487M550.81 413.941H583.605M614.909 413.941H695.405M720.747 413.941H738.635" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M190.916 429.885H129.581M114.043 429.885H96.0514M78.8776 429.885H34.7163M20.8137 429.885H11.0001" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M207.997 429.885H240.363M257.616 429.885H337.06M353.179 429.885H370.833" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M390.19 429.885H451.16M466.606 429.885H484.49M501.562 429.885H545.46M559.28 429.885H569.035M581.229 429.885H694.226" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M39.468 444.687H100.209M115.597 444.687H133.415M150.422 444.687H194.156M207.924 444.687H217.643M229.791 444.687H342.365" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    <path d="M883.251 444.687H705.08M689.631 444.687H671.744M654.67 444.687H610.765M596.943 444.687H587.186" stroke="#00B6ED" stroke-width="3" stroke-linecap="round"/>
                    </g>
                    <path d="M440.423 210.554L436 206.5L443.5 196L456 210L452.961 216.572L444.537 205.185L440.423 210.554Z" fill="white"/>
                    </g>
                    </g>
                    <defs>
                    <clipPath id="clip0_1903_12257">
                    <rect width="822" height="612" fill="white"/>
                    </clipPath>
                    <clipPath id="clip1_1903_12257">
                    <rect width="1728" height="612" fill="white" transform="translate(-906)"/>
                    </clipPath>
                    <clipPath id="clip2_1903_12257">
                    <rect width="842" height="106" fill="white" transform="translate(-20 368)"/>
                    </clipPath>
                    </defs>
                </svg>
              </div>
            </div>
            <div className="goa-adm-body-owl">
              <div className="goa-adm-body-owl-line"></div>
              <div className="goa-adm-body-owl-eye"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="goa-adm-body">
        <div className="container">
          {/* CUSTOMIZABLE */}
          <section className="goa-adm-intro">
            <p>
              Step into the future with the Alberta government! We want to
              partner with top-tier technology vendors and service design
              professionals from coast to coast to create cutting-edge,
              impactful solutions that make life easier for Albertans, wherever
              they are, on any device. Join us on this exciting journey and be
              part of something truly remarkable.
            </p>
          </section>

          {/* CUSTOMIZABLE */}
          <section className="goa-adm-cards-info">
            <h2>Sign up and keep up to date</h2>
            <div className="goa-adm-cards">
              <div className="goa-adm-single-card">
                <div className="goa-adm-single-card-thumb">
                  <img src={suppliers_thumb} alt="Suppliers illustration" />
                </div>
                <h3>Suppliers</h3>
                <div className="goa-adm-single-card-content">
                  <p>
                    Do you have the technology and vision to help shape the
                    future? We want to hear ideas that support government
                    initiatives to create impactful, accessible digital
                    experiences for Albertans.
                  </p>
                </div>
                <div className="goa-adm-single-card-link">
                  <a
                    className="goa-adm-button-link goa-adm-secondary"
                    href="/for-suppliers/"
                  >
                    View supplier benefits
                  </a>
                </div>
              </div>
              <div className="goa-adm-single-card">
                <div className="goa-adm-single-card-thumb">
                  <img src={partners_thumb} alt="Partners illustration" />
                </div>
                <h3>Community partners</h3>
                <div className="goa-adm-single-card-content">
                  <p>
                    Curious? Keep connected as a digitally curious Albertan,
                    another government or community organization.
                  </p>
                </div>
                <div className="goa-adm-single-card-link">
                  <a
                    className="goa-adm-button-link goa-adm-secondary"
                    href="/for-partners/"
                  >
                    View partner benefits
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* CUSTOMIZABLE */}
          <section className="goa-adm-intro">
            <p>
              We're seeking talented vendors who are passionate about making a
              real impact for Albertans. Explore open opportunities and see how
              you can join us on this journey.
            </p>
          </section>

          {/* CUSTOMIZABLE */}
          <section className="goa-adm-apc-callout">
            <h2>
              Discover more about our opportunities and procurement process
              today.
            </h2>
            <a
              className="goa-adm-button-link"
              href="https://purchasing.alberta.ca/search"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore opportunities
            </a>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
