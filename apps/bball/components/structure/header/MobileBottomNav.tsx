import Link from "next/link";
import SideNav from "./SideNav";

const MobileBottomNav = ({ headerOptions, path }): JSX.Element => {
	const nonMobileOptions = ["league"];

	const options = headerOptions.filter(
		(option) => !nonMobileOptions.includes(option.label)
	);

	return (
		<ul className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-around border border-neutral-600 bg-neutral-700 px-[15px] pb-[25px] pt-[15px] backdrop-blur-md md:hidden">
			{options.map((option, index) => {
				let isActive;

				// if homepage, make active class exact
				if (option.label === "home") {
					isActive = path === option.href;

					// else just .includes()
				} else {
					isActive = path.includes(option.href);
				}

				return option.label !== "teams" && option.label !== "players" ? (
					<li className="flex flex-col items-center justify-center" key={index}>
						<Link
							href={option.href}
							className={`${isActive && "text-primary"} flex flex-col items-center justify-center`}
						>
							{option.icon}
							<span className="font-barlow text-base capitalize tracking-tighter">
								{option.label}
							</span>
						</Link>
					</li>
				) : null;
			})}

			<SideNav navPosition="bottom" />
		</ul>
	);
};

export default MobileBottomNav;
