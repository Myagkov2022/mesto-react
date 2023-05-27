import React from "react";
import headerLogo from '../images/logo.svg'
function Header() {
    return (
        <header className="header page__header">
            <img className="header__logo" src={headerLogo} alt="Логотип сайта Mesto"/>
        </header>
    )
}
export default Header;