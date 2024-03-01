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

    public virtual DbSet<Operacion> Operaciones { get; set; }

    public virtual DbSet<Tarjeta> Tarjetas { get; set; }

    public virtual DbSet<LastOperation> LastOperation { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Operacion>().ToTable("Operaciones");
        modelBuilder.Entity<Tarjeta>().ToTable("Tarjetas");
        modelBuilder.Entity<LastOperation>().ToView("LastOperationView").HasNoKey();


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
