import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.heroInner}>
					<span className={styles.badge}>ITI Learning Platform</span>
					<h1 className={styles.heroTitle}>
						Learn smarter.
						<br />
						<em>Track everything.</em>
					</h1>
					<p className={styles.heroSub}>Enroll in courses, follow your lessons, and watch your progress grow. all in one place built for ITI.</p>
					<div className={styles.heroBtns}>
						<Link href="/auth/register" className={styles.btnPrimary}>
							Get Started
						</Link>
						<Link href="/auth/login" className={styles.btnOutline}>
							Sign In
						</Link>
					</div>
				</div>

				<div className={styles.gridLines} aria-hidden="true">
					{[...Array(6)].map((_, i) => (
						<div key={i} className={styles.gridLine} />
					))}
				</div>
			</section>

			<section className={styles.cta}>
				<h2 className={styles.ctaTitle}>Ready to start learning?</h2>
				<p className={styles.ctaSub}>Create your account and join your first course today.</p>
				<Link href="/auth/register" className={styles.btnPrimary}>
					Create Free Account
				</Link>
			</section>
		</main>
	);
}
