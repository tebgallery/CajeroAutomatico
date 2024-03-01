using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CajeroAutomaticoAPI.Migrations
{
    /// <inheritdoc />
    public partial class Tablas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Operaciones",
                columns: table => new
                {
                    ID_Operacion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_Tarjeta = table.Column<int>(type: "int", nullable: false),
                    FechaHora = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CodigoOperacion = table.Column<int>(type: "int", nullable: false),
                    CantidadRetirada = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operaciones", x => x.ID_Operacion);
                });

            migrationBuilder.CreateTable(
                name: "Tarjetas",
                columns: table => new
                {
                    ID_Tarjeta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<long>(type: "bigint", nullable: false),
                    PIN = table.Column<int>(type: "int", nullable: false),
                    Bloqueada = table.Column<bool>(type: "bit", nullable: false),
                    Intentos = table.Column<int>(type: "int", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FechaVencimiento = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarjetas", x => x.ID_Tarjeta);
                });

            migrationBuilder.Sql("INSERT INTO Tarjetas (Numero, PIN, Bloqueada, Intentos, Balance, FechaVencimiento) VALUES (4545303045453030, 3332, 0, 4, 200000.00, '2024-02-28')");
            migrationBuilder.Sql("INSERT INTO Tarjetas (Numero, PIN, Bloqueada, Intentos, Balance, FechaVencimiento) VALUES (1111222233334444, 1357, 0, 4, 3000.00, '2025-04-10')");
            migrationBuilder.Sql("INSERT INTO Tarjetas (Numero, PIN, Bloqueada, Intentos, Balance, FechaVencimiento) VALUES (7744888877448888, 7890, 1, 4, 450000.00, '2023-11-20')");
            migrationBuilder.Sql("INSERT INTO Tarjetas (Numero, PIN, Bloqueada, Intentos, Balance, FechaVencimiento) VALUES (4343909043439090, 4321, 0, 4, 5000.00, '2024-03-05')");

            migrationBuilder.Sql("INSERT INTO Operaciones (ID_Tarjeta, FechaHora, CodigoOperacion, CantidadRetirada) VALUES (2, '2024-02-28 12:00:00', 1, 0)");
            migrationBuilder.Sql("INSERT INTO Operaciones (ID_Tarjeta, FechaHora, CodigoOperacion, CantidadRetirada) VALUES (1, '2024-02-28 15:30:00', 2, 4000.00)");
            migrationBuilder.Sql("INSERT INTO Operaciones (ID_Tarjeta, FechaHora, CodigoOperacion, CantidadRetirada) VALUES (3, '2024-02-29 07:45:00', 2, 7500.00)");
            migrationBuilder.Sql("INSERT INTO Operaciones (ID_Tarjeta, FechaHora, CodigoOperacion, CantidadRetirada) VALUES (3, '2024-02-29 10:20:00', 2, 2000.00)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Operaciones");

            migrationBuilder.DropTable(
                name: "Tarjetas");
        }
    }
}
