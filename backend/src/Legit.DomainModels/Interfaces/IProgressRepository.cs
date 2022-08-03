using System;
using System.Collections.Generic;

namespace Legit.DomainModels;

public interface IProgressListRepository
{
	IEnumerable<TData> Append<TData>(string key, TData progress);
	IEnumerable<TData> GetOrCreate<TData>(string key, Func<IEnumerable<TData>> createFactory);
	IEnumerable<TData> Get<TData>(string key);
}
