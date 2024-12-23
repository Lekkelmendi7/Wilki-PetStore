using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using Wilki.Data;
using Stripe;
using Wilki.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.EnableSensitiveDataLogging(); //Per testim
});
builder.Services.AddDatabaseDeveloperPageExceptionFilter();



builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt =>
{
    var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value);

    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, // for development 
        ValidateAudience = false, // for development
        RequireExpirationTime = false, // for development -- needs to be updated when reffresh token is added
        ValidateLifetime = true
    };
}).AddGoogle(googleOptions =>
{
    googleOptions.ClientId = builder.Configuration.GetSection("Authentication:Google:ClientId").Value;
    googleOptions.ClientSecret = builder.Configuration.GetSection("Authentication:Google:ClientSecret").Value;
}).AddFacebook(facebookOptions =>
{
    facebookOptions.AppId = builder.Configuration.GetSection("Authentication:Facebook:AppId").Value;
    facebookOptions.AppSecret = builder.Configuration.GetSection("Authentication:Facebook:AppSecret").Value;
}); ;

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireUppercase = false;
    options.SignIn.RequireConfirmedAccount = false;
})
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultUI()
        .AddDefaultTokenProviders();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("punonAdministrat", policy =>
    {
        policy.RequireAssertion(context =>
        {
            return context.User.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value.Contains("Admin"));
        });
    });
});

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "JWTToken_Auth_API",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddSingleton<MongoDBService>();
builder.Services.AddScoped<IAdminLogService, AdminLogService>();

var app = builder.Build();

StripeConfiguration.ApiKey = "sk_test_51NNkyeKOmsM1eN2e1sUQutHGDQAfDM67Zz6T1CMTsCYWihaGwk1PmjxP8Cezdx3r7PXnhm7b8RHKqQLZt2J1XEFc001efotwaF";

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("CorsPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
      name: "areas",
      pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
    );
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
