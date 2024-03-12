﻿#pragma warning disable 1591
// <auto-generated>
//     This code was generated from a CodeSmith Generator template.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using CodeSmith.Data.Linq;
using CodeSmith.Data.Linq.Dynamic;

namespace Malldub.Data
{
    /// <summary>
    /// The query extension class for UserPhone.
    /// </summary>
    public static partial class UserPhoneExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.UserPhone GetByKey(this IQueryable<Malldub.Data.UserPhone> queryable, System.String userId, System.Int32 phoneId)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.UserPhone>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, userId, phoneId);

            return queryable.FirstOrDefault(u => u.UserId == userId 
					&& u.PhoneId == phoneId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByUserId(this IQueryable<Malldub.Data.UserPhone> queryable, System.String userId)
        {
            return queryable.Where(u => u.UserId == userId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByUserId(this IQueryable<Malldub.Data.UserPhone> queryable, ContainmentOperator containmentOperator, System.String userId)
        {
            if (userId == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("userId", "Parameter 'userId' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(u => u.UserId.Contains(userId));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(u => u.UserId.StartsWith(userId));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(u => u.UserId.EndsWith(userId));
                case ContainmentOperator.NotContains:
                    return queryable.Where(u => u.UserId.Contains(userId) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(u => u.UserId != userId);
                default:
                    return queryable.Where(u => u.UserId == userId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByUserId(this IQueryable<Malldub.Data.UserPhone> queryable, System.String userId, params System.String[] additionalValues)
        {
            var userIdList = new List<System.String> { userId };

            if (additionalValues != null)
                userIdList.AddRange(additionalValues);

            if (userIdList.Count == 1)
                return queryable.ByUserId(userIdList[0]);

            return queryable.ByUserId(userIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByUserId(this IQueryable<Malldub.Data.UserPhone> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(u => values.Contains(u.UserId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.PhoneId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="phoneId">PhoneId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByPhoneId(this IQueryable<Malldub.Data.UserPhone> queryable, System.Int32 phoneId)
        {
            return queryable.Where(u => u.PhoneId == phoneId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.PhoneId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="phoneId">PhoneId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByPhoneId(this IQueryable<Malldub.Data.UserPhone> queryable, ComparisonOperator comparisonOperator, System.Int32 phoneId)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(u => u.PhoneId > phoneId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(u => u.PhoneId >= phoneId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(u => u.PhoneId < phoneId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(u => u.PhoneId <= phoneId);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(u => u.PhoneId != phoneId);
                default:
                    return queryable.Where(u => u.PhoneId == phoneId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.PhoneId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="phoneId">PhoneId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByPhoneId(this IQueryable<Malldub.Data.UserPhone> queryable, System.Int32 phoneId, params System.Int32[] additionalValues)
        {
            var phoneIdList = new List<System.Int32> { phoneId };

            if (additionalValues != null)
                phoneIdList.AddRange(additionalValues);

            if (phoneIdList.Count == 1)
                return queryable.ByPhoneId(phoneIdList[0]);

            return queryable.ByPhoneId(phoneIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.PhoneId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByPhoneId(this IQueryable<Malldub.Data.UserPhone> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(u => values.Contains(u.PhoneId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.IsDefault"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="isDefault">IsDefault to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByIsDefault(this IQueryable<Malldub.Data.UserPhone> queryable, System.Boolean isDefault)
        {
            return queryable.Where(u => u.IsDefault == isDefault);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.IsDefault"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="isDefault">IsDefault to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByIsDefault(this IQueryable<Malldub.Data.UserPhone> queryable, ComparisonOperator comparisonOperator, System.Boolean isDefault)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                case ComparisonOperator.GreaterThanOrEquals:
                case ComparisonOperator.LessThan:
                case ComparisonOperator.LessThanOrEquals:
                    throw new ArgumentException("Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support System.Boolean type.", "comparisonOperator");
                case ComparisonOperator.NotEquals:
                    return queryable.Where(u => u.IsDefault != isDefault);
                default:
                    return queryable.Where(u => u.IsDefault == isDefault);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.IsDefault"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="isDefault">IsDefault to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByIsDefault(this IQueryable<Malldub.Data.UserPhone> queryable, System.Boolean isDefault, params System.Boolean[] additionalValues)
        {
            var isDefaultList = new List<System.Boolean> { isDefault };

            if (additionalValues != null)
                isDefaultList.AddRange(additionalValues);

            if (isDefaultList.Count == 1)
                return queryable.ByIsDefault(isDefaultList[0]);

            return queryable.ByIsDefault(isDefaultList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UserPhone.IsDefault"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UserPhone> ByIsDefault(this IQueryable<Malldub.Data.UserPhone> queryable, IEnumerable<System.Boolean> values)
        {
            return queryable.Where(u => values.Contains(u.IsDefault));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, System.Int32, Malldub.Data.UserPhone> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String userId, System.Int32 phoneId) =>
                        db.UserPhone.FirstOrDefault(u => u.UserId == userId 
							&& u.PhoneId == phoneId));
        }
        #endregion
    }
}
#pragma warning restore 1591
