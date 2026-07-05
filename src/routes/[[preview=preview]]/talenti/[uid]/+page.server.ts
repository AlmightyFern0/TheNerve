import { error } from "@sveltejs/kit";
import { NotFoundError } from "@prismicio/client";
import type { PageServerLoad } from "./$types";
import { createClient } from "$lib/prismicio";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	try {
		const page = await client.getByUID("singolo_performer", params.uid);
		return { page };
	} catch (e) {
		if (e instanceof NotFoundError) {
			throw error(404, "Performer not found");
		}
		throw e;
	}
};