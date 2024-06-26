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
    /// The query extension class for AspNetUserClaim.
    /// </summary>
    public static partial class AspNetUserClaimExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.AspNetUserClaim GetByKey(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.Int32 identification)
        {
            return queryable.FirstOrDefault(a => a.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.AspNetUserClaim GetByIdentification(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.AspNetUserClaim>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(a => a.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByIdentification(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.Int32 identification)
        {
            return queryable.Where(a => a.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByIdentification(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, ComparisonOperator comparisonOperator, System.Int32 identification)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(a => a.Identification > identification);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(a => a.Identification >= identification);
                case ComparisonOperator.LessThan:
                    return queryable.Where(a => a.Identification < identification);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(a => a.Identification <= identification);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(a => a.Identification != identification);
                default:
                    return queryable.Where(a => a.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByIdentification(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.Int32 identification, params System.Int32[] additionalValues)
        {
            var identificationList = new List<System.Int32> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByIdentification(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(a => values.Contains(a.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimType"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimType">ClaimType to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimType(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String claimType)
        {
            // support nulls
            return claimType == null 
                ? queryable.Where(a => a.ClaimType == null) 
                : queryable.Where(a => a.ClaimType == claimType);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimType"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimType">ClaimType to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimType(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, ContainmentOperator containmentOperator, System.String claimType)
        {
            if (claimType == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("claimType", "Parameter 'claimType' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(a => a.ClaimType.Contains(claimType));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(a => a.ClaimType.StartsWith(claimType));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(a => a.ClaimType.EndsWith(claimType));
                case ContainmentOperator.NotContains:
                    return queryable.Where(a => a.ClaimType.Contains(claimType) == false);
                case ContainmentOperator.NotEquals:
                    return claimType == null 
                        ? queryable.Where(a => a.ClaimType != null) 
                        : queryable.Where(a => a.ClaimType != claimType);
                default:
                    return claimType == null 
                        ? queryable.Where(a => a.ClaimType == null) 
                        : queryable.Where(a => a.ClaimType == claimType);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimType"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimType">ClaimType to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimType(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String claimType, params System.String[] additionalValues)
        {
            var claimTypeList = new List<System.String> { claimType };

            if (additionalValues != null)
                claimTypeList.AddRange(additionalValues);
            else
                claimTypeList.Add(null);

            if (claimTypeList.Count == 1)
                return queryable.ByClaimType(claimTypeList[0]);

            return queryable.ByClaimType(claimTypeList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimType"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimType(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, IEnumerable<System.String> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.AspNetUserClaim, bool>("ClaimType", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimValue"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimValue">ClaimValue to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimValue(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String claimValue)
        {
            // support nulls
            return claimValue == null 
                ? queryable.Where(a => a.ClaimValue == null) 
                : queryable.Where(a => a.ClaimValue == claimValue);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimValue"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimValue">ClaimValue to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimValue(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, ContainmentOperator containmentOperator, System.String claimValue)
        {
            if (claimValue == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("claimValue", "Parameter 'claimValue' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(a => a.ClaimValue.Contains(claimValue));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(a => a.ClaimValue.StartsWith(claimValue));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(a => a.ClaimValue.EndsWith(claimValue));
                case ContainmentOperator.NotContains:
                    return queryable.Where(a => a.ClaimValue.Contains(claimValue) == false);
                case ContainmentOperator.NotEquals:
                    return claimValue == null 
                        ? queryable.Where(a => a.ClaimValue != null) 
                        : queryable.Where(a => a.ClaimValue != claimValue);
                default:
                    return claimValue == null 
                        ? queryable.Where(a => a.ClaimValue == null) 
                        : queryable.Where(a => a.ClaimValue == claimValue);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimValue"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="claimValue">ClaimValue to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimValue(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String claimValue, params System.String[] additionalValues)
        {
            var claimValueList = new List<System.String> { claimValue };

            if (additionalValues != null)
                claimValueList.AddRange(additionalValues);
            else
                claimValueList.Add(null);

            if (claimValueList.Count == 1)
                return queryable.ByClaimValue(claimValueList[0]);

            return queryable.ByClaimValue(claimValueList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.ClaimValue"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByClaimValue(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, IEnumerable<System.String> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.AspNetUserClaim, bool>("ClaimValue", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByUserId(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String userId)
        {
            return queryable.Where(a => a.UserId == userId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByUserId(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, ContainmentOperator containmentOperator, System.String userId)
        {
            if (userId == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("userId", "Parameter 'userId' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(a => a.UserId.Contains(userId));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(a => a.UserId.StartsWith(userId));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(a => a.UserId.EndsWith(userId));
                case ContainmentOperator.NotContains:
                    return queryable.Where(a => a.UserId.Contains(userId) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(a => a.UserId != userId);
                default:
                    return queryable.Where(a => a.UserId == userId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="userId">UserId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByUserId(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, System.String userId, params System.String[] additionalValues)
        {
            var userIdList = new List<System.String> { userId };

            if (additionalValues != null)
                userIdList.AddRange(additionalValues);

            if (userIdList.Count == 1)
                return queryable.ByUserId(userIdList[0]);

            return queryable.ByUserId(userIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUserClaim.UserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUserClaim> ByUserId(this IQueryable<Malldub.Data.AspNetUserClaim> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(a => values.Contains(a.UserId));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.AspNetUserClaim> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.AspNetUserClaim.FirstOrDefault(a => a.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.AspNetUserClaim> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.AspNetUserClaim.FirstOrDefault(a => a.Identification == identification));

        }
        #endregion
    }
}
#pragma warning restore 1591
