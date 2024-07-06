import React from "react";
import logoFooter from '../../assets/logo-footer.png';
import socialLinksData from '../../Data/socialLinks.json';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="row-box">

        <div className="copyright">
          <p><a href="#">Coobrang</a> © 2024. All Rights Reserved.</p>
        </div>

        <div className="logo">
          <img src={logoFooter}></img>
        </div>

        <div className="social">
          <ul>
            {socialLinksData.socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>
                  <i className={link.iconClass}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Footer;
