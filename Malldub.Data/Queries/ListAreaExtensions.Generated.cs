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
    /// The query extension class for ListArea.
    /// </summary>
    public static partial class ListAreaExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.ListArea GetByKey(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.ListArea>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(l => l.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.ListArea GetByIdentification(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.ListArea>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(l => l.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByIdentification(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32 identification)
        {
            return queryable.Where(l => l.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByIdentification(this IQueryable<Malldub.Data.ListArea> queryable, ComparisonOperator comparisonOperator, System.Int32 identification)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(l => l.Identification > identification);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(l => l.Identification >= identification);
                case ComparisonOperator.LessThan:
                    return queryable.Where(l => l.Identification < identification);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(l => l.Identification <= identification);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(l => l.Identification != identification);
                default:
                    return queryable.Where(l => l.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByIdentification(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32 identification, params System.Int32[] additionalValues)
        {
            var identificationList = new List<System.Int32> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByIdentification(this IQueryable<Malldub.Data.ListArea> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(l => values.Contains(l.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.ListPortalSiteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="listPortalSiteId">ListPortalSiteId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByListPortalSiteId(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32? listPortalSiteId)
        {
            // support nulls
            return listPortalSiteId == null 
                ? queryable.Where(l => l.ListPortalSiteId == null) 
                : queryable.Where(l => l.ListPortalSiteId == listPortalSiteId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.ListPortalSiteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="listPortalSiteId">ListPortalSiteId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByListPortalSiteId(this IQueryable<Malldub.Data.ListArea> queryable, ComparisonOperator comparisonOperator, System.Int32? listPortalSiteId)
        {
            if (listPortalSiteId == null && comparisonOperator != ComparisonOperator.Equals && comparisonOperator != ComparisonOperator.NotEquals)
                throw new ArgumentNullException("listPortalSiteId", "Parameter 'listPortalSiteId' cannot be null with the specified ComparisonOperator.  Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support null.");

            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(l => l.ListPortalSiteId > listPortalSiteId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(l => l.ListPortalSiteId >= listPortalSiteId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(l => l.ListPortalSiteId < listPortalSiteId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(l => l.ListPortalSiteId <= listPortalSiteId);
                case ComparisonOperator.NotEquals:
                    return listPortalSiteId == null 
                        ? queryable.Where(l => l.ListPortalSiteId != null) 
                        : queryable.Where(l => l.ListPortalSiteId != listPortalSiteId);
                default:
                    return listPortalSiteId == null 
                        ? queryable.Where(l => l.ListPortalSiteId == null) 
                        : queryable.Where(l => l.ListPortalSiteId == listPortalSiteId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.ListPortalSiteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="listPortalSiteId">ListPortalSiteId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByListPortalSiteId(this IQueryable<Malldub.Data.ListArea> queryable, System.Int32? listPortalSiteId, params System.Int32?[] additionalValues)
        {
            var listPortalSiteIdList = new List<System.Int32?> { listPortalSiteId };

            if (additionalValues != null)
                listPortalSiteIdList.AddRange(additionalValues);
            else
                listPortalSiteIdList.Add(null);

            if (listPortalSiteIdList.Count == 1)
                return queryable.ByListPortalSiteId(listPortalSiteIdList[0]);

            return queryable.ByListPortalSiteId(listPortalSiteIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.ListPortalSiteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByListPortalSiteId(this IQueryable<Malldub.Data.ListArea> queryable, IEnumerable<System.Int32?> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.ListArea, bool>("ListPortalSiteId", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Name"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="name">Name to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByName(this IQueryable<Malldub.Data.ListArea> queryable, System.String name)
        {
            // support nulls
            return name == null 
                ? queryable.Where(l => l.Name == null) 
                : queryable.Where(l => l.Name == name);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Name"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="name">Name to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByName(this IQueryable<Malldub.Data.ListArea> queryable, ContainmentOperator containmentOperator, System.String name)
        {
            if (name == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("name", "Parameter 'name' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(l => l.Name.Contains(name));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(l => l.Name.StartsWith(name));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(l => l.Name.EndsWith(name));
                case ContainmentOperator.NotContains:
                    return queryable.Where(l => l.Name.Contains(name) == false);
                case ContainmentOperator.NotEquals:
                    return name == null 
                        ? queryable.Where(l => l.Name != null) 
                        : queryable.Where(l => l.Name != name);
                default:
                    return name == null 
                        ? queryable.Where(l => l.Name == null) 
                        : queryable.Where(l => l.Name == name);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Name"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="name">Name to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByName(this IQueryable<Malldub.Data.ListArea> queryable, System.String name, params System.String[] additionalValues)
        {
            var nameList = new List<System.String> { name };

            if (additionalValues != null)
                nameList.AddRange(additionalValues);
            else
                nameList.Add(null);

            if (nameList.Count == 1)
                return queryable.ByName(nameList[0]);

            return queryable.ByName(nameList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.ListArea.Name"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.ListArea> ByName(this IQueryable<Malldub.Data.ListArea> queryable, IEnumerable<System.String> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.ListArea, bool>("Name", values);
            return queryable.Where(expression);
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.ListArea> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.ListArea.FirstOrDefault(l => l.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.ListArea> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.ListArea.FirstOrDefault(l => l.Identification == identification));

        }
        #endregion
    }
}
#pragma warning restore 1591
