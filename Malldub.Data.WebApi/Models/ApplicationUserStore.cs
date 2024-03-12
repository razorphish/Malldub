namespace Malldub.WebApi.Models
{
    #region Directives

    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;

    using Microsoft.AspNet.Identity;

    #endregion

    public class ApplicationUserStore : IUserStore<ApplicationUser>
    {
        #region Fields

        private readonly ApplicationDbContext _context;

        #endregion

        #region Constructors and Destructors

        public ApplicationUserStore(ApplicationDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Public Methods and Operators

        public Task CreateAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            // Dispose of unmanaged resources.
            _context.Dispose();

            // Suppress finalization.
            GC.SuppressFinalize(this);
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            return await _context.Users.Include(x => x.Roles).FirstOrDefaultAsync(n => n.Id == userId);
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            return await _context.Users.Include(x => x.Roles).FirstOrDefaultAsync(n => n.UserName == userName);
        }

        public Task UpdateAsync(ApplicationUser user)
        {
            return Task.Factory.StartNew(
                () =>
                {
                    var usera = _context.Users.SingleOrDefault(n => n.Id == user.Id);
                    usera.FirstName = user.FirstName;
                    _context.SaveChanges();
                });
        }

        #endregion
    }
}