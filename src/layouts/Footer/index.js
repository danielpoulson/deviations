import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export const Footer = () => (
  <footer className={`${styles}`}>
    <div className="container">
      <div className="dpFooter">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Daniel Poulson &copy; 2016
        </div>
      </div>
    </div>
  </footer>
);
