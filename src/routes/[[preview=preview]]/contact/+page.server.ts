import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      pronouns: data.get('pronouns'),
      message: data.get('message')
    };

    // Send an email, write to a DB, call an API, etc.
    console.log('Contact form submission:', payload);

    return { success: true };
  }
};

export const prerender = false;