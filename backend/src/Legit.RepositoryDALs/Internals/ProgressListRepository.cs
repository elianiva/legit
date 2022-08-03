using System;
using System.Collections.Generic;
using System.Linq;

using Legit.DomainModels;

using Microsoft.Extensions.Caching.Memory;

namespace Legit.RepositoryDALs;

internal class ProgressListRepository : IProgressListRepository
{
	private readonly IMemoryCache _cache;
	private readonly MemoryCacheEntryOptions _cacheOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(1));

	public ProgressListRepository(IMemoryCache cache)
	{
		_cache = cache;
	}

	public IEnumerable<TData> GetOrCreate<TData>(string key, Func<IEnumerable<TData>> createFactory)
	{
		return _cache.GetOrCreate(key, (_) => createFactory.Invoke());
	}

	public IEnumerable<TData> Get<TData>(string key)
	{
		IEnumerable<TData> value;
		if (_cache.TryGetValue(key, out value)) return value;
		return Enumerable.Empty<TData>();
	}

	public IEnumerable<TData> Append<TData>(string key, TData progress)
	{
		IEnumerable<TData> previous = GetOrCreate<TData>(key, () => Enumerable.Empty<TData>());
		return _cache.Set(key, previous.Append(progress), _cacheOptions);
	}
}
