import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.png';
import menuData from '../../Data/menuData.json';
import extraLinks from '../../Data/extraLinks.json'

const Header = () => {
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  return (
    <header className="header">
      <div className="row-wrapper">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Menu */}
        <nav className="menu">
          <ul>
            {menuData.menu.map((link, index) => (
              
              <li key={index}
                onMouseEnter={() => link.submenu.length > 0 && toggleDropdown(index)}
                onMouseLeave={() => link.submenu.length > 0 && toggleDropdown(index)}
              >
                <a href={link.url}>
                  {link.name} {link.submenu.length > 0 && <i className="fa-solid fa-plus"></i>}
                </a>

                {link.submenu.length > 0 && dropdownVisibleIndex === index && (
                  <div className="dropdown">
                    <ul>
                      {link.submenu.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <a href={sublink.url}>{sublink.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </li>
            ))}
          </ul>
        </nav>

          {/* Items */}
          <div className="items">
            {extraLinks.links.map((link, index) => (
              <div key={index} className={link.name.toLowerCase().replace(' ', '-')}>
                <a href={link.url}>
                  <i className={link.iconClass}></i> {link.name}
                </a>
              </div>
            ))}
        </div>

      </div>
    </header>
  );
};

export default Header;