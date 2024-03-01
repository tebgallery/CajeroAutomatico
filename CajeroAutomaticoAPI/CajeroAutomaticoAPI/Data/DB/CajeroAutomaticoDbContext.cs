using System;
using System.Collections.Generic;
using CajeroAutomaticoAPI.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CajeroAutomaticoAPI.Data.DB;

public partial class CajeroAutomaticoDbContext : DbContext
{
    public CajeroAutomaticoDbContext()
    {
    }

    public CajeroAutomaticoDbContext(DbContextOptions<CajeroAutomaticoDbContext> options)
        : base(options)
    {
    }

    public DbSet<Operacion> Operaciones { get; set; }

    public DbSet<Tarjeta> Tarjetas { get; set; }

    public DbSet<TipoOperacion> TipoOperacion { get; set; }

    public DbSet<LastOperation> LastOperation { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Operacion>().ToTable("Operaciones");
        modelBuilder.Entity<Tarjeta>().ToTable("Tarjetas");

        modelBuilder.Entity<TipoOperacion>().ToTable("Tipo_Operacion");

        modelBuilder.Entity<LastOperation>().HasNoKey();

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
