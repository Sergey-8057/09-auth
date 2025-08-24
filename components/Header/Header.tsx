import Link from 'next/link';
import styles from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home" className={styles.headerLink}>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link href="/" className={styles.navigationLink}>
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <TagsMenu />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
