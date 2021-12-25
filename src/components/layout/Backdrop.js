import classes from './Layout.module.css';

function Backdrop({ onBackdropClick }) {
    return <div className={classes.backdrop} onClick={onBackdropClick} />;
}

export default Backdrop
