using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CajeroAutomaticoAPI.Migrations
{
    /// <inheritdoc />
    public partial class ProcedimientosAlmacenados : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[sp_ActualizarIntentos]
                @Id INT,
                @Intentos INT
            AS
            BEGIN
                -- Actualizar el campo Intentos
                UPDATE Tarjetas
                SET Intentos = @Intentos
                WHERE ID_Tarjeta = @Id;

                -- Verificar si los intentos restantes son cero
                IF @Intentos = 0
                BEGIN
                    -- Actualizar el campo Bloqueada a 1
                    UPDATE Tarjetas
                    SET Bloqueada = 1
                    WHERE ID_Tarjeta = @Id;
                END;

                SELECT TOP 1 Bloqueada, Intentos FROM
                Tarjetas WHERE ID_Tarjeta = @Id
            END");

            migrationBuilder.Sql(@"
                CREATE PROCEDURE [dbo].[sp_ObtenerUltimaOperacion]
        @CardId INT
                    AS
                    BEGIN
                        SELECT TOP 1 T.ID_Tarjeta, T.Numero, O.CantidadRetirada, T.Balance, O.FechaHora
                        FROM Operaciones O
                        INNER JOIN Tarjetas T ON O.ID_Tarjeta = T.ID_Tarjeta
                        WHERE O.ID_Tarjeta = @CardId
                        AND 
                        O.CodigoOperacion = 2
                        ORDER BY O.FechaHora DESC;
                    END");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[sp_ActualizarIntentos]");
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS [dbo].[sp_ObtenerUltimaOperacion]");
        }
    }
}
