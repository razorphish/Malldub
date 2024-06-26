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
    /// The query extension class for UploadType.
    /// </summary>
    public static partial class UploadTypeExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.UploadType GetByKey(this IQueryable<Malldub.Data.UploadType> queryable, System.String identification)
        {
            return queryable.FirstOrDefault(u => u.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.UploadType GetByIdentification(this IQueryable<Malldub.Data.UploadType> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.UploadType>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(u => u.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.UploadType GetByDetails(this IQueryable<Malldub.Data.UploadType> queryable, System.String details)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.UploadType>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByDetails.Invoke((Malldub.Data.MalldubDataContext)entity.Context, details);

            return queryable.FirstOrDefault(u => object.Equals(u.Details, details));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByIdentification(this IQueryable<Malldub.Data.UploadType> queryable, System.String identification)
        {
            return queryable.Where(u => u.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByIdentification(this IQueryable<Malldub.Data.UploadType> queryable, ContainmentOperator containmentOperator, System.String identification)
        {
            if (identification == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("identification", "Parameter 'identification' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(u => u.Identification.Contains(identification));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(u => u.Identification.StartsWith(identification));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(u => u.Identification.EndsWith(identification));
                case ContainmentOperator.NotContains:
                    return queryable.Where(u => u.Identification.Contains(identification) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(u => u.Identification != identification);
                default:
                    return queryable.Where(u => u.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByIdentification(this IQueryable<Malldub.Data.UploadType> queryable, System.String identification, params System.String[] additionalValues)
        {
            var identificationList = new List<System.String> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByIdentification(this IQueryable<Malldub.Data.UploadType> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(u => values.Contains(u.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDescription(this IQueryable<Malldub.Data.UploadType> queryable, System.String description)
        {
            return queryable.Where(u => u.Description == description);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDescription(this IQueryable<Malldub.Data.UploadType> queryable, ContainmentOperator containmentOperator, System.String description)
        {
            if (description == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("description", "Parameter 'description' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(u => u.Description.Contains(description));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(u => u.Description.StartsWith(description));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(u => u.Description.EndsWith(description));
                case ContainmentOperator.NotContains:
                    return queryable.Where(u => u.Description.Contains(description) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(u => u.Description != description);
                default:
                    return queryable.Where(u => u.Description == description);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDescription(this IQueryable<Malldub.Data.UploadType> queryable, System.String description, params System.String[] additionalValues)
        {
            var descriptionList = new List<System.String> { description };

            if (additionalValues != null)
                descriptionList.AddRange(additionalValues);

            if (descriptionList.Count == 1)
                return queryable.ByDescription(descriptionList[0]);

            return queryable.ByDescription(descriptionList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDescription(this IQueryable<Malldub.Data.UploadType> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(u => values.Contains(u.Description));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDetails(this IQueryable<Malldub.Data.UploadType> queryable, System.String details)
        {
            // support nulls
            return details == null 
                ? queryable.Where(u => u.Details == null) 
                : queryable.Where(u => u.Details == details);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDetails(this IQueryable<Malldub.Data.UploadType> queryable, ContainmentOperator containmentOperator, System.String details)
        {
            if (details == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("details", "Parameter 'details' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(u => u.Details.Contains(details));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(u => u.Details.StartsWith(details));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(u => u.Details.EndsWith(details));
                case ContainmentOperator.NotContains:
                    return queryable.Where(u => u.Details.Contains(details) == false);
                case ContainmentOperator.NotEquals:
                    return details == null 
                        ? queryable.Where(u => u.Details != null) 
                        : queryable.Where(u => u.Details != details);
                default:
                    return details == null 
                        ? queryable.Where(u => u.Details == null) 
                        : queryable.Where(u => u.Details == details);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDetails(this IQueryable<Malldub.Data.UploadType> queryable, System.String details, params System.String[] additionalValues)
        {
            var detailsList = new List<System.String> { details };

            if (additionalValues != null)
                detailsList.AddRange(additionalValues);
            else
                detailsList.Add(null);

            if (detailsList.Count == 1)
                return queryable.ByDetails(detailsList[0]);

            return queryable.ByDetails(detailsList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> ByDetails(this IQueryable<Malldub.Data.UploadType> queryable, IEnumerable<System.String> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.UploadType, bool>("Details", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> BySortOrderNumber(this IQueryable<Malldub.Data.UploadType> queryable, System.Byte sortOrderNumber)
        {
            return queryable.Where(u => u.SortOrderNumber == sortOrderNumber);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> BySortOrderNumber(this IQueryable<Malldub.Data.UploadType> queryable, ComparisonOperator comparisonOperator, System.Byte sortOrderNumber)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(u => u.SortOrderNumber > sortOrderNumber);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(u => u.SortOrderNumber >= sortOrderNumber);
                case ComparisonOperator.LessThan:
                    return queryable.Where(u => u.SortOrderNumber < sortOrderNumber);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(u => u.SortOrderNumber <= sortOrderNumber);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(u => u.SortOrderNumber != sortOrderNumber);
                default:
                    return queryable.Where(u => u.SortOrderNumber == sortOrderNumber);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> BySortOrderNumber(this IQueryable<Malldub.Data.UploadType> queryable, System.Byte sortOrderNumber, params System.Byte[] additionalValues)
        {
            var sortOrderNumberList = new List<System.Byte> { sortOrderNumber };

            if (additionalValues != null)
                sortOrderNumberList.AddRange(additionalValues);

            if (sortOrderNumberList.Count == 1)
                return queryable.BySortOrderNumber(sortOrderNumberList[0]);

            return queryable.BySortOrderNumber(sortOrderNumberList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.UploadType.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.UploadType> BySortOrderNumber(this IQueryable<Malldub.Data.UploadType> queryable, IEnumerable<System.Byte> values)
        {
            return queryable.Where(u => values.Contains(u.SortOrderNumber));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.UploadType> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.UploadType.FirstOrDefault(u => u.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.UploadType> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.UploadType.FirstOrDefault(u => u.Identification == identification));


            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.UploadType> GetByDetails =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String details) =>
                        db.UploadType.FirstOrDefault(u => object.Equals(u.Details, details)));

        }
        #endregion
    }
}
#pragma warning restore 1591
