import type { PageServerLoad } from "./$types";
import { createClient } from "$lib/prismicio";

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getByUID("singolo_performer", params.uid);

	return { page };
};