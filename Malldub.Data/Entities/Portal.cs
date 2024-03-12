namespace Malldub.Data
{
    using System;

    partial class Portal
    {
        public Portal()
        {
            DateEntered = DateTime.UtcNow;
            DateUpdated = DateEntered;
            StatusId = "Active";

        }
    }
}