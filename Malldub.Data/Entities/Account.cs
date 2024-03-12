namespace Malldub.Data
{
    using System;

    partial class Account
    {
        public Account()
        {
            DateEntered = DateTime.UtcNow;
            DateUpdated = DateTime.UtcNow;
        }
    }
}