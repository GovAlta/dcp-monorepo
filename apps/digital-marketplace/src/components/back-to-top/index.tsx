import React, { useState, useEffect } from "react";
import './styles.css';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > 700);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
            /* you can also use 'auto' behaviour
         in place of 'smooth' */
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    })
    

    return (
        <>
        <div className={visible ? "goa-adm-back-to-top active" : "goa-adm-back-to-top"}>
            <button className="goa-adm-back-to-top-btn" onClick={scrollToTop} aria-label="Back to Top">
                <span></span>
            </button>
        </div>
        </>
    );
};

export default BackToTop;