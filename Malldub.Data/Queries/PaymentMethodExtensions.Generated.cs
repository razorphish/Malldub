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
    /// The query extension class for PaymentMethod.
    /// </summary>
    public static partial class PaymentMethodExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.PaymentMethod GetByKey(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String identification)
        {
            return queryable.FirstOrDefault(p => p.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.PaymentMethod GetByIdentification(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.PaymentMethod>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(p => p.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.PaymentMethod GetByDetails(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String details)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.PaymentMethod>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByDetails.Invoke((Malldub.Data.MalldubDataContext)entity.Context, details);

            return queryable.FirstOrDefault(p => p.Details == details);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByIdentification(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String identification)
        {
            return queryable.Where(p => p.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByIdentification(this IQueryable<Malldub.Data.PaymentMethod> queryable, ContainmentOperator containmentOperator, System.String identification)
        {
            if (identification == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("identification", "Parameter 'identification' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(p => p.Identification.Contains(identification));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(p => p.Identification.StartsWith(identification));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(p => p.Identification.EndsWith(identification));
                case ContainmentOperator.NotContains:
                    return queryable.Where(p => p.Identification.Contains(identification) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(p => p.Identification != identification);
                default:
                    return queryable.Where(p => p.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByIdentification(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String identification, params System.String[] additionalValues)
        {
            var identificationList = new List<System.String> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByIdentification(this IQueryable<Malldub.Data.PaymentMethod> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(p => values.Contains(p.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDetails(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String details)
        {
            return queryable.Where(p => p.Details == details);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDetails(this IQueryable<Malldub.Data.PaymentMethod> queryable, ContainmentOperator containmentOperator, System.String details)
        {
            if (details == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("details", "Parameter 'details' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(p => p.Details.Contains(details));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(p => p.Details.StartsWith(details));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(p => p.Details.EndsWith(details));
                case ContainmentOperator.NotContains:
                    return queryable.Where(p => p.Details.Contains(details) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(p => p.Details != details);
                default:
                    return queryable.Where(p => p.Details == details);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="details">Details to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDetails(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String details, params System.String[] additionalValues)
        {
            var detailsList = new List<System.String> { details };

            if (additionalValues != null)
                detailsList.AddRange(additionalValues);

            if (detailsList.Count == 1)
                return queryable.ByDetails(detailsList[0]);

            return queryable.ByDetails(detailsList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Details"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDetails(this IQueryable<Malldub.Data.PaymentMethod> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(p => values.Contains(p.Details));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDescription(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String description)
        {
            // support nulls
            return description == null 
                ? queryable.Where(p => p.Description == null) 
                : queryable.Where(p => p.Description == description);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDescription(this IQueryable<Malldub.Data.PaymentMethod> queryable, ContainmentOperator containmentOperator, System.String description)
        {
            if (description == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("description", "Parameter 'description' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(p => p.Description.Contains(description));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(p => p.Description.StartsWith(description));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(p => p.Description.EndsWith(description));
                case ContainmentOperator.NotContains:
                    return queryable.Where(p => p.Description.Contains(description) == false);
                case ContainmentOperator.NotEquals:
                    return description == null 
                        ? queryable.Where(p => p.Description != null) 
                        : queryable.Where(p => p.Description != description);
                default:
                    return description == null 
                        ? queryable.Where(p => p.Description == null) 
                        : queryable.Where(p => p.Description == description);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="description">Description to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDescription(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.String description, params System.String[] additionalValues)
        {
            var descriptionList = new List<System.String> { description };

            if (additionalValues != null)
                descriptionList.AddRange(additionalValues);
            else
                descriptionList.Add(null);

            if (descriptionList.Count == 1)
                return queryable.ByDescription(descriptionList[0]);

            return queryable.ByDescription(descriptionList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.Description"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> ByDescription(this IQueryable<Malldub.Data.PaymentMethod> queryable, IEnumerable<System.String> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.PaymentMethod, bool>("Description", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> BySortOrderNumber(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.Byte sortOrderNumber)
        {
            return queryable.Where(p => p.SortOrderNumber == sortOrderNumber);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> BySortOrderNumber(this IQueryable<Malldub.Data.PaymentMethod> queryable, ComparisonOperator comparisonOperator, System.Byte sortOrderNumber)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(p => p.SortOrderNumber > sortOrderNumber);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(p => p.SortOrderNumber >= sortOrderNumber);
                case ComparisonOperator.LessThan:
                    return queryable.Where(p => p.SortOrderNumber < sortOrderNumber);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(p => p.SortOrderNumber <= sortOrderNumber);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(p => p.SortOrderNumber != sortOrderNumber);
                default:
                    return queryable.Where(p => p.SortOrderNumber == sortOrderNumber);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="sortOrderNumber">SortOrderNumber to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> BySortOrderNumber(this IQueryable<Malldub.Data.PaymentMethod> queryable, System.Byte sortOrderNumber, params System.Byte[] additionalValues)
        {
            var sortOrderNumberList = new List<System.Byte> { sortOrderNumber };

            if (additionalValues != null)
                sortOrderNumberList.AddRange(additionalValues);

            if (sortOrderNumberList.Count == 1)
                return queryable.BySortOrderNumber(sortOrderNumberList[0]);

            return queryable.BySortOrderNumber(sortOrderNumberList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.PaymentMethod.SortOrderNumber"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.PaymentMethod> BySortOrderNumber(this IQueryable<Malldub.Data.PaymentMethod> queryable, IEnumerable<System.Byte> values)
        {
            return queryable.Where(p => values.Contains(p.SortOrderNumber));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.PaymentMethod> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.PaymentMethod.FirstOrDefault(p => p.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.PaymentMethod> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.PaymentMethod.FirstOrDefault(p => p.Identification == identification));


            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.PaymentMethod> GetByDetails =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String details) =>
                        db.PaymentMethod.FirstOrDefault(p => p.Details == details));

        }
        #endregion
    }
}
#pragma warning restore 1591
