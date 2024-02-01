export type DivisionWithStats = {
	_id: string;
	divisionName: string;
	season: string;
	teams: any[];
};

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface Link {
	label: string;
	href: string;
}
