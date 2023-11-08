import Link from 'next/link';
import React from 'react';
import styles from '../user.module.scss';

const AdminPage = () => {
  return (
    <div className={styles.admin__container}>
      <h1>Admin</h1>
      <Link href="/">Home</Link>
    </div>
  );
};

export default AdminPage;
