const getAcccessToken = async () => {
	const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
	const basicToken = Buffer
		.from(`${import.meta.env.SPOTIFY_CLIENT_ID}:${import.meta.env.SPOTIFY_CLIENT_SECRET}`)
		.toString("base64");

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Authorization": `Basic ${basicToken}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			"grant_type": "refresh_token",
			"refresh_token": refreshToken,
		}),
	});

	return response.json();
};

export async function GET() {
	try {
		const { access_token } = await getAcccessToken();
		const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=6&time_range=short_term", {
			headers: {
				"Authorization": `Bearer ${access_token}`,
			},
		});

		const { items } = await response.json();
        const ret = [];

        for (const item of items) {
            const { artists, name, album } = item;
            const { url, width, height } = album.images[0];

            ret.push({
                title: name,
                artist: artists[0].name,
                image: { url, width, height },
                url: item.external_urls.spotify,
            });
        }

		return new Response(
            JSON.stringify(ret), {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
                },
            },
        );
	} catch (err) {
		console.log("Something went wrong", err);
		return new Response(null, {
			status: 400,
			statusText: "INVALID REQUEST",
		});
	}
}