import Link from 'next/link';
import React, { Fragment } from 'react';
import styles from './user.module.scss';

const UserDashboard = () => {
  return (
    <Fragment>
      <div className={styles.dashboard__container}>
        <nav>
          <ul className={styles.dashboard__nav}>
            <Link href="/user/admin">
              <li>STREFA AUTORA</li>
            </Link>
            <Link href="/">
              <li>WYLOGUJ</li>
            </Link>
            tymczasowe:
            <Link href="/user/login">
              <li>ZALOGUJ</li>
            </Link>
            <Link href="/user/register">
              <li>UTWORZ KONTO</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className={styles.user__profile}>
        <h1>Moje konto</h1>
        <div className={styles.admin__card}>
          <h2>Konsultacje</h2>
          <p>Nie masz zaplanowanych konsultacji</p>
        </div>
        <div className={styles.admin__card}>
          <h2>Dane osobowe</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
            ratione quo sunt aperiam accusamus molestiae voluptatibus.
            Voluptatem aperiam suscipit eos, assumenda saepe cum? Hic aspernatur
            iure dicta cupiditate nostrum vero quas. Voluptatibus praesentium
            tenetur quidem earum illo deserunt quos sint veritatis consectetur
            corporis nisi similique doloribus placeat doloremque, quia mollitia
            autem omnis, nobis eaque quibusdam pariatur, sed quasi! Fugit illo
            facere deserunt
          </p>
        </div>
        <div className={styles.admin__card}>
          <h2>Ustawienia konta</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
            ratione quo sunt aperiam accusamus molestiae voluptatibus.
            Voluptatem
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
