using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CajeroAutomaticoAPI.Data.Models;

public partial class CajeroAutomaticoDbContext : DbContext
{
    public CajeroAutomaticoDbContext()
    {
    }

    public CajeroAutomaticoDbContext(DbContextOptions<CajeroAutomaticoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Operacion> Operaciones { get; set; }

    public virtual DbSet<Tarjeta> Tarjetas { get; set; }

    public virtual DbSet<TipoOperacion> TipoOperacions { get; set; }

    public virtual DbSet<LastOperation> LastOperation { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Operacion>(entity =>
        {
            entity.HasKey(e => e.IdOperacion).HasName("PK__Operacio__73B674488FF58874");

            entity.Property(e => e.IdOperacion).HasColumnName("ID_Operacion");
            entity.Property(e => e.CantidadRetirada).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.FechaHora).HasColumnType("datetime");
            entity.Property(e => e.IdTarjeta).HasColumnName("ID_Tarjeta");
        });

        modelBuilder.Entity<Tarjeta>(entity =>
        {
            entity.HasKey(e => e.IdTarjeta).HasName("PK__Tarjetas__ECA5F9525EB66401");

            entity.Property(e => e.IdTarjeta).HasColumnName("ID_Tarjeta");
            entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Pin).HasColumnName("PIN");
        });

        modelBuilder.Entity<TipoOperacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tipo_Ope__3214EC27346799E0");

            entity.ToTable("Tipo_Operacion");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LastOperation>().HasNoKey();


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
