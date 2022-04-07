import React from 'react'
import clsx from 'clsx'

import styles from './footer.module.css'

export default function Footer({ title, content }) {
    return (
        <section className={clsx('container', 'container-fluid')}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
        </section>
    );
}