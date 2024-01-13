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
    const { access_token } = await getAcccessToken();
	try {
		const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				"Authorization": `Bearer ${access_token}`,
			},
		});

		if (response.status === 204 || response.status > 400) {
			return { isPlaying : false };
		}

		const parsedRes = await response.json();

		const { artists, name, album } = parsedRes.item;
		const { url, width, height } = album.images[0];

		return new Response(
            JSON.stringify({
                isPlaying: true,
                artist: artists[0].name,
                title: name,
                image: { url, width, height },
                url: parsedRes.item.external_urls.spotify,
		    }), {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
                },
            },
        );
	} catch (err) {
		console.log("Something went wrong", err);
	}
}