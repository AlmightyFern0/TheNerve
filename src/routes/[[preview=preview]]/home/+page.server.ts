import type { PageServerLoad } from "./$types";
import { createClient } from "$lib/prismicio";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getSingle("home");

	return { page };
};