using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Wilki.Migrations
{
    public partial class Mbrojtjaeprojektit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planet",
                columns: table => new
                {
                    PlanetID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isDeleted = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planet", x => x.PlanetID);
                });

            migrationBuilder.CreateTable(
                name: "Satellite",
                columns: table => new
                {
                    SatelliteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isDeleted = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlanetID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Satellite", x => x.SatelliteID);
                    table.ForeignKey(
                        name: "FK_Satellite_Planet_PlanetID",
                        column: x => x.PlanetID,
                        principalTable: "Planet",
                        principalColumn: "PlanetID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Satellite_PlanetID",
                table: "Satellite",
                column: "PlanetID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Satellite");

            migrationBuilder.DropTable(
                name: "Planet");
        }
    }
}
