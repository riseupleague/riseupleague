import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/ui/",
		},
	};
};

export default robots;
