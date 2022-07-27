type ParsedGitUrl = {
	url: string;
	text: string;
};

// parse ssh url manually
function parseSshUrl(sshUrl: string): ParsedGitUrl {
	// example: git@github.com:teknologi-umum/blog.git
	const matched = sshUrl.match(/git@([\w.]+):([\w.-]+)\/(\w+)(.git)?/);

	// failed to parse
	if (matched === null) {
		return {
			url: sshUrl,
			text: sshUrl,
		};
	}

	const [_sshUrl, provider, owner, repository] = matched;
	return {
		url: `https://${provider}/${owner}/${repository}`,
		text: `${owner}/${repository}`,
	};
}

// parse http url using the URL object
function parseHttpUrl(httpUrl: string): ParsedGitUrl {
	try {
		const url = new URL(httpUrl);
		const [_, owner, repository] = url.pathname.split("/");

		return {
			url: httpUrl,
			// remove the `.git` suffix
			text: `${owner}/${repository.replace(".git", "")}`,
		};
	} catch {
		// failed to parse
		return {
			url: httpUrl,
			text: httpUrl,
		};
	}
}

export function parseGitUrl(url: string): ParsedGitUrl {
	if (url.startsWith("git@")) return parseSshUrl(url);
	if (url.startsWith("http://") || url.startsWith("https://")) return parseHttpUrl(url);

	// unknown url schema
	return {
		url,
		text: url,
	};
}
