using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

namespace Legit.WebApi;

public static class HttpContextSSEExtensions
{
	public static async Task InitializeSseAsync(this HttpContext context)
	{
		context.Response.Headers.Add("Cache-Control", "no-cache");
		context.Response.Headers.Add("Content-Type", "text/event-stream");
		context.Response.StatusCode = 200;
		await context.Response.Body.FlushAsync();
	}

	public static async Task SendSseEventAsync(this HttpContext context, string id, string type, object data)
	{
		if (!string.IsNullOrWhiteSpace(id))
		{
			await context.Response.WriteAsync($"id: {id}\n");
		}

		if (!string.IsNullOrWhiteSpace(type))
		{
			await context.Response.WriteAsync($"event: {type}\n");
		}

		List<string> normalisedData = data switch
		{
			string line => new() { line },
			List<string> lines => lines,
			_ => throw new NotImplementedException()
		};

		foreach (string line in normalisedData)
		{
			await context.Response.WriteAsync($"data: {line}\n");
		}

		await context.Response.WriteAsync("\n");
		await context.Response.Body.FlushAsync();
	}
}
