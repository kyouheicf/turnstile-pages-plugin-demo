/**
 * POST /api/submit
 */

import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

export const onRequestPost = [
    (async (context) => {
			console.log(turnstilePlugin({
				secret: context.env.SECRET_KEY,
			}).data.turnstile)
    	// Request has been validated as coming from a human
    	const formData = await context.request.formData()

    	var tmp, outcome = {};
	for (let [key, value] of formData) {
		tmp = outcome[key];
		if (tmp === undefined) {
			outcome[key] = value;
		} else {
			outcome[key] = [].concat(tmp, value);
		}
	}

	// Attach Turnstile outcome to the response
	outcome["turnstile_outcome"] = context.data.turnstile;

	let pretty = JSON.stringify(outcome, null, 2);

      	return new Response(pretty, {
      		headers: {
      			'Content-Type': 'application/json;charset=utf-8'
      		}
      	});
    })
];
