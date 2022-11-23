import react from "react";
import styles from './About.module.scss';

const About = () => {
    return(
        <div className={styles.About}>
            <div>About</div>
            <text>
                Это web application на react + ts.
                Показывает какие компоненты умею делать на момент XX.05.22
            </text>
        </div>
    )
}

export default About