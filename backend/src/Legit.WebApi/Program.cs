using System.Reactive.Subjects;

using Google.Protobuf;

using Legit.DomainServices;
using Legit.DomainServices.Registration;
using Legit.GitClient;
using Legit.RepositoryDALs;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add configuration providers
builder.Configuration
	.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
	.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
	.AddKeyPerFile("/run/secrets", optional: true, reloadOnChange: true)
	.AddEnvironmentVariables("ASPNETCORE_");

// Configure options
builder.Services.Configure<LegitOptions>(builder.Configuration.GetSection("LegitOptions"));

// serialise protobuf generated class to json
builder.Services.AddSingleton<JsonFormatter>(sp =>
{
	JsonFormatter.Settings formatterSettings = new JsonFormatter.Settings(false);
	JsonFormatter formatter = new JsonFormatter(formatterSettings);
	return formatter;
});

// subject for clone progress events
builder.Services.AddSingleton<Subject<ProgressEvent>>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddMemoryCache();
builder.Services.AddGitClient();
builder.Services.AddDomainServices();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(corsBuilder =>
{
	CorsPolicy policy = new CorsPolicyBuilder().AllowAnyHeader().WithMethods("GET", "POST").WithOrigins("http://localhost:5173").Build();
	corsBuilder.AddPolicy("frontend", policy);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

if (app.Environment.IsProduction())
{
	app.UseHttpsRedirection();
}

app.UseCors("frontend");

app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();