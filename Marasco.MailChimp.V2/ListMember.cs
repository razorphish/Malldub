// ***********************************************************************
// Assembly         : Marasco.MailChimp
// Author           : David Antonio Marasco
// Created          : 03-14-2017
//
// Last Modified By : David Antonio Marasco
// Last Modified On : 03-14-2017
// ***********************************************************************
// <copyright file="ListMember.cs" company="Maras,co">
//     Copyright ©  2017
// </copyright>
// ***********************************************************************
namespace Marasco.MailChimpApi
{
  #region Directives

  using System.Threading.Tasks;

  using MailChimp.Net.Models;

  using Marasco.MailChimpApi.Models;

  #endregion

  /// <summary>
  /// Class ListMember.
  /// </summary>
  /// <seealso cref="Marasco.MailChimpApi.MarascoMailChimpBase" />
  public class ListMember : MarascoMailChimpBase
  {
    #region Public Methods and Operators

    public ListMember()
    {
      Initialize();
    }

    /// <summary>
    /// Adds the specified list identifier.
    /// </summary>
    /// <param name="listId">The list identifier.</param>
    /// <param name="memberModel">The member model.</param>
    /// <returns>Task.</returns>
    public async Task<Member> Add(string listId, MemberModel memberModel)
    {
      var member = new Member
      {
        EmailAddress = memberModel.Email,
        StatusIfNew = Status.Subscribed,
        EmailType = DefaultEmailType,
        Location = new Location()
        {
          Longitude = memberModel.Longitude,
          Latitude = memberModel.Latitude
        }

      };

      member.MergeFields.Add("FNAME", memberModel.FirstName);
      member.MergeFields.Add("LNAME", memberModel.LastName);
      member.MergeFields.Add("USERID", memberModel.AspNetUserId); // *|MERGE4|*
      // member.MergeFields.Add("FUNDUSRTYP", memberModel.UserTypeId); // *|MERGE3|*

      var taskMember = await MailChimpManager.Members.AddOrUpdateAsync(listId, member);

      return taskMember;
    }

    #endregion
  }
}