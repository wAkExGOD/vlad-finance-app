import styles from './Settings.module.scss';

export function Settings() {
  return (
    <section className={["app-section", styles.settings].join(' ')}>
      <div>Settings</div>
    </section>
  )
}