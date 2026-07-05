import type { PageServerLoad } from "./$types";
import { createClient } from "$lib/prismicio";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getSingle("talenti", {
		fetchLinks: [
			"show.meta_title",
			"show.meta_description",
			"show.meta_image",
			"singolo_performer.meta_title",
			"singolo_performer.meta_description",
			"singolo_performer.meta_image",
		],
	});

	return { page };
};