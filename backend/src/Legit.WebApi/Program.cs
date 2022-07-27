using Google.Protobuf;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(corsBuilder =>
{
    CorsPolicy policy = new CorsPolicyBuilder().AllowAnyHeader().WithMethods("GET", "POST").WithOrigins("http://localhost:5173").Build();
    corsBuilder.AddPolicy("frontend", policy);
});

// serialise protobuf generated class to json
builder.Services.AddSingleton<JsonFormatter>(sp =>
{
    JsonFormatter.Settings formatterSettings = new JsonFormatter.Settings(false);
    JsonFormatter formatter = new JsonFormatter(formatterSettings);
    return formatter;
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

app.MapControllers();

app.Run();
