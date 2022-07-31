import React from 'react';
import { NavLink } from 'react-router-dom';

import categoriesIcon from '../../assets/icons/categories.svg';
import purchasesIcon from '../../assets/icons/purchases.svg';
import overviewIcon from '../../assets/icons/overview.svg';

import styles from './Nav.module.scss';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/categories">
        <img src={categoriesIcon} alt="Categories"></img>
        <span>Categories</span>
      </NavLink>

      <NavLink to="/purchases">
        <img src={purchasesIcon} alt="Purchases"></img>
        <span>Purchases</span>
      </NavLink>

      <NavLink to="/overview">
        <img src={overviewIcon} alt="Overview"></img>
        <span>Overview</span>
      </NavLink>
    </nav>
  );
}
