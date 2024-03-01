using CajeroAutomaticoAPI.Data.DB;
using CajeroAutomaticoAPI.Data.Models;
using CajeroAutomaticoAPI.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CajeroAutomaticoAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<CajeroAutomaticoDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<ITarjetaRepository, TarjetaRepository>();
            builder.Services.AddScoped<IOperacionRepository, OperacionRepository>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<CajeroAutomaticoDbContext>();
                context.Database.Migrate();
                InsertarDatosIniciales(context);
                CreateStoredProcedures(context);
            }

            app.UseCors("AllowOrigin");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        private static void InsertarDatosIniciales(CajeroAutomaticoDbContext context)
        {
            var tarjeta1 = new Tarjeta
            {
                Numero = 2020444420204444,
                PIN = 4321,
                Bloqueada = false,
                Intentos = 4,
                Balance = 1500.00m,
                FechaVencimiento = DateOnly.FromDateTime(DateTime.Now.AddYears(3))
            };

            context.Tarjetas.Add(tarjeta1);

            var tarjeta2 = new Tarjeta
            {
                Numero = 1111222233334444,
                PIN = 6789,
                Bloqueada = true,
                Intentos = 4,
                Balance = 2000.00m,
                FechaVencimiento = DateOnly.FromDateTime(DateTime.Now.AddYears(2))
            };

            context.Tarjetas.Add(tarjeta2);

            var tarjeta3 = new Tarjeta
            {
                Numero = 9999555577773333,
                PIN = 2468,
                Bloqueada = true,
                Intentos = 4,
                Balance = 3000.00m,
                FechaVencimiento = DateOnly.FromDateTime(DateTime.Now.AddYears(4))
            };

            context.Tarjetas.Add(tarjeta3);

            var tarjeta4 = new Tarjeta
            {
                Numero = 4545303045453030,
                PIN = 3332,
                Bloqueada = false,
                Intentos = 4,
                Balance = 3000.00m,
                FechaVencimiento = DateOnly.FromDateTime(DateTime.Now.AddYears(4))
            };

            context.Tarjetas.Add(tarjeta4);

            var operacion1 = new Operacion
            {
                ID_Tarjeta = tarjeta1.ID_Tarjeta,
                FechaHora = DateTime.Now,
                CodigoOperacion = 1,
                CantidadRetirada = 0
            };

            context.Operaciones.Add(operacion1);

            var operacion2 = new Operacion
            {
                ID_Tarjeta = tarjeta4.ID_Tarjeta,
                FechaHora = DateTime.Now,
                CodigoOperacion = 2,
                CantidadRetirada = 300.00m
            };

            context.Operaciones.Add(operacion2);

            var operacion3 = new Operacion
            {
                ID_Tarjeta = tarjeta2.ID_Tarjeta,
                FechaHora = DateTime.Now,
                CodigoOperacion = 2,
                CantidadRetirada = 400.00m
            };

            context.Operaciones.Add(operacion3);

            var operacion4 = new Operacion
            {
                ID_Tarjeta = tarjeta2.ID_Tarjeta,
                FechaHora = DateTime.Now,
                CodigoOperacion = 1,
                CantidadRetirada = 0
            };

            context.Operaciones.Add(operacion4);

            var tipoOperacion1 = new TipoOperacion
            {
                Nombre = "Balance"
            };

            context.TipoOperacion.Add(tipoOperacion1);

            var tipoOperacion2 = new TipoOperacion
            { 
                Nombre = "Retiro"
            };

            context.TipoOperacion.Add(tipoOperacion2);

            context.SaveChanges();
        }

        private static void CreateStoredProcedures(CajeroAutomaticoDbContext context)
        {
            var createProcedure1 = @"
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
                        END";

            context.Database.ExecuteSqlRaw(createProcedure1);

            var createProcedure2 = @"
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
                                END";
            context.Database.ExecuteSqlRaw(createProcedure2);

        }
    }
}
