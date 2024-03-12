CREATE TABLE [Core].[PaymentMethod] (
    [PaymentMethodId] NVARCHAR (20) NOT NULL,
    [Details]         NVARCHAR (30) NOT NULL,
    [Description]     NVARCHAR (50) NULL,
    [SortOrderNumber] TINYINT       NOT NULL,
    CONSTRAINT [PK_PaymentMethod] PRIMARY KEY CLUSTERED ([PaymentMethodId] ASC),
    CONSTRAINT [IX_PaymentMethod] UNIQUE NONCLUSTERED ([Details] ASC)
);

