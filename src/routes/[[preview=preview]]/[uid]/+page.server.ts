import { error } from "@sveltejs/kit";
import { NotFoundError } from "@prismicio/client";
import type { PageServerLoad } from "./$types";
import { createClient } from "$lib/prismicio";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });

	try {
		const page = await client.getByUID("show", params.uid);
		return { page };
	} catch (e) {
		if (e instanceof NotFoundError) {
			throw error(404, "Page not found");
		}
		throw e;
	}
};