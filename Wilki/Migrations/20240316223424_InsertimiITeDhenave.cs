﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wilki.Migrations
{
    public partial class InsertimiITeDhenave : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.InsertData(
              table: "AspNetRoles",
              columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
              values: new object[,]
              {
            { "01010101-0101-0101-0101-010101010101", "Klient", "KLIENT", "01010101-0101-0101-0101-010101010101" },
            { "02020202-0202-0202-0202-020202020202", "Admin", "ADMIN", "02020202-0202-0202-0202-020202020202" },
            { "03030303-0303-0303-0303-030303030303", "Shites", "SHITES", "03030303-0303-0303-0303-030303030303" },
              });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[]
                {
            "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail",
            "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp",
            "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled",
            "LockoutEnd", "LockoutEnabled", "AccessFailedCount"
                },
                values: new object[,]
                {
            {
                "01010101-0101-0101-0101-010101010101", "admin@wilki.com", "ADMIN@WILKI.COM",
                "admin@wilki.com", "ADMIN@WILKI.COM", false,
                "AQAAAAEAACcQAAAAELLjjlFHUVkbwtDOorEU6HVbq2qnXSEdkqZzadodugKLCxM3E2rWpIESXFgq+tJ/IA==",
                "PKJ54KGIZB4MOS3BACM2INRJE54VBB32", "9e6bf9b8-daa7-42b1-9529-f17ee6633b0f",
                null, false, false, null, true, 0
            },
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[,]
                {

            { "01010101-0101-0101-0101-010101010101", "01010101-0101-0101-0101-010101010101" },
            { "01010101-0101-0101-0101-010101010101", "02020202-0202-0202-0202-020202020202" },
                });

            migrationBuilder.InsertData(
                table: "Perdoruesit",
                columns: new[] { "UserID", "Emri", "Mbiemri", "Email", "Username", "AspNetUserId" },
                values: new object[,]
                {
            { 1, "Admin", "Admin", "admin@wilki.com", "admin@wilki.com", "01010101-0101-0101-0101-010101010101" },
                });

            migrationBuilder.InsertData(
                table: "TeDhenatPerdoruesit",
                columns: new[] { "TeDhenatID", "NrKontaktit", "Qyteti", "ZipKodi", "Adresa", "Shteti", "UserID", "DataKrijimit", "DataLindjes", "EmailPersonal", "EmriPrindit", "Gjinia", "NrPersonal" },
                values: new object[,]
                {
            { 1, "+38344111222", "Prishtine", "10000", "P.A.", "Kosove", 1, "1900-01-01T00:00:00.000Z", "1900-01-01T00:00:00.000Z", "admin@wilki.com", "Filani", "M", "1100110011" },
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
