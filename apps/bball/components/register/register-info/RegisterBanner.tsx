import styles from "./RegisterBanner.module.css";
import Image from "next/image";

const RegisterBanner = () => {
	return (
		<section id={styles["banner-1106"]} className={`${styles["banner-1106"]}`}>
			<div className={styles["cs-container"]}>
				<span className="font-abolition text-8xl uppercase">
					About Registration
				</span>
				{/* <div className={styles["cs-breadcrumbs"]}>
					<a href="" className={styles["cs-link"]}>
						Home
					</a>
					<a href="" className={`${styles["cs-link"]} ${styles["cs-active"]}`}>
						Contact
					</a>
				</div> */}
			</div>

			<div className={styles["cs-background"]}>
				<Image
					src="/images/register/registrationBanner.jpg"
					alt="create a team image"
					className="object-cover"
					fill
				/>
			</div>
		</section>
	);
};

export default RegisterBanner;
