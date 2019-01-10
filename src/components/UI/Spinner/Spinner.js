import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.SpinneBox}>
        <div className={classes.CircleBorder}>
            <div className={classes.CircleCore}></div>
        </div> 
    </div> 
    );
// const spinner = () => (<div className={classes.Loader}>Loading...</div>);

export default spinner;