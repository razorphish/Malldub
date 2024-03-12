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
    /// The query extension class for DonationStatus.
    /// </summary>
    public static partial class DonationStatusExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.DonationStatus GetByKey(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String identification)
        {
            return queryable.FirstOrDefault(d => d.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.DonationStatus GetByIdentification(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.DonationStatus>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(d => d.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.DonationStatus GetByFriendlyName(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String friendlyName)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.DonationStatus>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByFriendlyName.Invoke((Malldub.Data.MalldubDataContext)entity.Context, friendlyName);

            return queryable.FirstOrDefault(d => d.FriendlyName == friendlyName);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByIdentification(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String identification)
        {
            return queryable.Where(d => d.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByIdentification(this IQueryable<Malldub.Data.DonationStatus> queryable, ContainmentOperator containmentOperator, System.String identification)
        {
            if (identification == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("identification", "Parameter 'identification' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(d => d.Identification.Contains(identification));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(d => d.Identification.StartsWith(identification));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(d => d.Identification.EndsWith(identification));
                case ContainmentOperator.NotContains:
                    return queryable.Where(d => d.Identification.Contains(identification) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(d => d.Identification != identification);
                default:
                    return queryable.Where(d => d.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByIdentification(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String identification, params System.String[] additionalValues)
        {
            var identificationList = new List<System.String> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByIdentification(this IQueryable<Malldub.Data.DonationStatus> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(d => values.Contains(d.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByFriendlyName(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String friendlyName)
        {
            return queryable.Where(d => d.FriendlyName == friendlyName);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByFriendlyName(this IQueryable<Malldub.Data.DonationStatus> queryable, ContainmentOperator containmentOperator, System.String friendlyName)
        {
            if (friendlyName == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("friendlyName", "Parameter 'friendlyName' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(d => d.FriendlyName.Contains(friendlyName));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(d => d.FriendlyName.StartsWith(friendlyName));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(d => d.FriendlyName.EndsWith(friendlyName));
                case ContainmentOperator.NotContains:
                    return queryable.Where(d => d.FriendlyName.Contains(friendlyName) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(d => d.FriendlyName != friendlyName);
                default:
                    return queryable.Where(d => d.FriendlyName == friendlyName);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByFriendlyName(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String friendlyName, params System.String[] additionalValues)
        {
            var friendlyNameList = new List<System.String> { friendlyName };

            if (additionalValues != null)
                friendlyNameList.AddRange(additionalValues);

            if (friendlyNameList.Count == 1)
                return queryable.ByFriendlyName(friendlyNameList[0]);

            return queryable.ByFriendlyName(friendlyNameList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByFriendlyName(this IQueryable<Malldub.Data.DonationStatus> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(d => values.Contains(d.FriendlyName));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByDescription(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String description)
        {
            return queryable.Where(d => d.Description == description);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByDescription(this IQueryable<Malldub.Data.DonationStatus> queryable, ContainmentOperator containmentOperator, System.String description)
        {
            if (description == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("description", "Parameter 'description' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(d => d.Description.Contains(description));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(d => d.Description.StartsWith(description));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(d => d.Description.EndsWith(description));
                case ContainmentOperator.NotContains:
                    return queryable.Where(d => d.Description.Contains(description) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(d => d.Description != description);
                default:
                    return queryable.Where(d => d.Description == description);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByDescription(this IQueryable<Malldub.Data.DonationStatus> queryable, System.String description, params System.String[] additionalValues)
        {
            var descriptionList = new List<System.String> { description };

            if (additionalValues != null)
                descriptionList.AddRange(additionalValues);

            if (descriptionList.Count == 1)
                return queryable.ByDescription(descriptionList[0]);

            return queryable.ByDescription(descriptionList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> ByDescription(this IQueryable<Malldub.Data.DonationStatus> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(d => values.Contains(d.Description));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> BySortOrderNumber(this IQueryable<Malldub.Data.DonationStatus> queryable, System.Byte? sortOrderNumber)
        {
            // support nulls
            return sortOrderNumber == null 
                ? queryable.Where(d => d.SortOrderNumber == null) 
                : queryable.Where(d => d.SortOrderNumber == sortOrderNumber);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> BySortOrderNumber(this IQueryable<Malldub.Data.DonationStatus> queryable, ComparisonOperator comparisonOperator, System.Byte? sortOrderNumber)
        {
            if (sortOrderNumber == null && comparisonOperator != ComparisonOperator.Equals && comparisonOperator != ComparisonOperator.NotEquals)
                throw new ArgumentNullException("sortOrderNumber", "Parameter 'sortOrderNumber' cannot be null with the specified ComparisonOperator.  Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support null.");

            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(d => d.SortOrderNumber > sortOrderNumber);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(d => d.SortOrderNumber >= sortOrderNumber);
                case ComparisonOperator.LessThan:
                    return queryable.Where(d => d.SortOrderNumber < sortOrderNumber);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(d => d.SortOrderNumber <= sortOrderNumber);
                case ComparisonOperator.NotEquals:
                    return sortOrderNumber == null 
                        ? queryable.Where(d => d.SortOrderNumber != null) 
                        : queryable.Where(d => d.SortOrderNumber != sortOrderNumber);
                default:
                    return sortOrderNumber == null 
                        ? queryable.Where(d => d.SortOrderNumber == null) 
                        : queryable.Where(d => d.SortOrderNumber == sortOrderNumber);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> BySortOrderNumber(this IQueryable<Malldub.Data.DonationStatus> queryable, System.Byte? sortOrderNumber, params System.Byte?[] additionalValues)
        {
            var sortOrderNumberList = new List<System.Byte?> { sortOrderNumber };

            if (additionalValues != null)
                sortOrderNumberList.AddRange(additionalValues);
            else
                sortOrderNumberList.Add(null);

            if (sortOrderNumberList.Count == 1)
                return queryable.BySortOrderNumber(sortOrderNumberList[0]);

            return queryable.BySortOrderNumber(sortOrderNumberList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.DonationStatus.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.DonationStatus> BySortOrderNumber(this IQueryable<Malldub.Data.DonationStatus> queryable, IEnumerable<System.Byte?> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.DonationStatus, bool>("SortOrderNumber", values);
            return queryable.Where(expression);
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.DonationStatus> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.DonationStatus.FirstOrDefault(d => d.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.DonationStatus> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.DonationStatus.FirstOrDefault(d => d.Identification == identification));


            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.DonationStatus> GetByFriendlyName =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String friendlyName) =>
                        db.DonationStatus.FirstOrDefault(d => d.FriendlyName == friendlyName));

        }
        #endregion
    }
}
#pragma warning restore 1591