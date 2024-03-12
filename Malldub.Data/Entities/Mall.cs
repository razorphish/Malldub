namespace Malldub.Data
{
    using System;

    partial class Mall
    {
        public Mall()
        {
            DateEntered = DateTime.UtcNow;
            DateUpdated = DateTime.UtcNow;
        }
    }
}