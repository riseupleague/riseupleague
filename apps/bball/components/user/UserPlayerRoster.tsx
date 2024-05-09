import FeaturedPlayerCard from "../general/FeaturedPlayerCard";

const UserPlayerRoster = ({ team }) => {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{team?.map((player, index) => {
				return <FeaturedPlayerCard player={player} key={index} />;
			})}
		</div>
	);
};

export default UserPlayerRoster;
