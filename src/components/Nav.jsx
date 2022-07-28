import React from 'react';
import { NavLink } from 'react-router-dom';

import categoriesIcon from '../assets/icons/categories.svg';
import purchasesIcon from '../assets/icons/purchases.svg';
import overviewIcon from '../assets/icons/overview.svg';

export function Nav() {
  return (
    <nav id="nav">
      <NavLink to="/categories">
        <img src={categoriesIcon} alt="Categories"></img>
        <span>Categories</span>
      </NavLink>

      <NavLink to="/purchases">
        <img src={purchasesIcon} alt="purchases"></img>
        <span>Purchases</span>
      </NavLink>

      <NavLink to="/overview">
        <img src={overviewIcon} alt="overview"></img>
        <span>Overview</span>
      </NavLink>
    </nav>
  );
}
