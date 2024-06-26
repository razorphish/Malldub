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
    /// The query extension class for Metum.
    /// </summary>
    public static partial class MetumExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.Metum GetByKey(this IQueryable<Malldub.Data.Metum> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.Metum>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(m => m.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.Metum GetByIdentification(this IQueryable<Malldub.Data.Metum> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.Metum>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(m => m.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByIdentification(this IQueryable<Malldub.Data.Metum> queryable, System.Int32 identification)
        {
            return queryable.Where(m => m.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByIdentification(this IQueryable<Malldub.Data.Metum> queryable, ComparisonOperator comparisonOperator, System.Int32 identification)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(m => m.Identification > identification);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(m => m.Identification >= identification);
                case ComparisonOperator.LessThan:
                    return queryable.Where(m => m.Identification < identification);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(m => m.Identification <= identification);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(m => m.Identification != identification);
                default:
                    return queryable.Where(m => m.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByIdentification(this IQueryable<Malldub.Data.Metum> queryable, System.Int32 identification, params System.Int32[] additionalValues)
        {
            var identificationList = new List<System.Int32> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByIdentification(this IQueryable<Malldub.Data.Metum> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(m => values.Contains(m.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaKeyId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaKeyId">MetaKeyId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaKeyId(this IQueryable<Malldub.Data.Metum> queryable, System.String metaKeyId)
        {
            return queryable.Where(m => m.MetaKeyId == metaKeyId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaKeyId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaKeyId">MetaKeyId to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaKeyId(this IQueryable<Malldub.Data.Metum> queryable, ContainmentOperator containmentOperator, System.String metaKeyId)
        {
            if (metaKeyId == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("metaKeyId", "Parameter 'metaKeyId' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(m => m.MetaKeyId.Contains(metaKeyId));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(m => m.MetaKeyId.StartsWith(metaKeyId));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(m => m.MetaKeyId.EndsWith(metaKeyId));
                case ContainmentOperator.NotContains:
                    return queryable.Where(m => m.MetaKeyId.Contains(metaKeyId) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(m => m.MetaKeyId != metaKeyId);
                default:
                    return queryable.Where(m => m.MetaKeyId == metaKeyId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaKeyId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaKeyId">MetaKeyId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaKeyId(this IQueryable<Malldub.Data.Metum> queryable, System.String metaKeyId, params System.String[] additionalValues)
        {
            var metaKeyIdList = new List<System.String> { metaKeyId };

            if (additionalValues != null)
                metaKeyIdList.AddRange(additionalValues);

            if (metaKeyIdList.Count == 1)
                return queryable.ByMetaKeyId(metaKeyIdList[0]);

            return queryable.ByMetaKeyId(metaKeyIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaKeyId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaKeyId(this IQueryable<Malldub.Data.Metum> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(m => values.Contains(m.MetaKeyId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaOption"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaOption">MetaOption to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaOption(this IQueryable<Malldub.Data.Metum> queryable, System.String metaOption)
        {
            return queryable.Where(m => m.MetaOption == metaOption);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaOption"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaOption">MetaOption to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaOption(this IQueryable<Malldub.Data.Metum> queryable, ContainmentOperator containmentOperator, System.String metaOption)
        {
            if (metaOption == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("metaOption", "Parameter 'metaOption' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(m => m.MetaOption.Contains(metaOption));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(m => m.MetaOption.StartsWith(metaOption));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(m => m.MetaOption.EndsWith(metaOption));
                case ContainmentOperator.NotContains:
                    return queryable.Where(m => m.MetaOption.Contains(metaOption) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(m => m.MetaOption != metaOption);
                default:
                    return queryable.Where(m => m.MetaOption == metaOption);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaOption"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="metaOption">MetaOption to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaOption(this IQueryable<Malldub.Data.Metum> queryable, System.String metaOption, params System.String[] additionalValues)
        {
            var metaOptionList = new List<System.String> { metaOption };

            if (additionalValues != null)
                metaOptionList.AddRange(additionalValues);

            if (metaOptionList.Count == 1)
                return queryable.ByMetaOption(metaOptionList[0]);

            return queryable.ByMetaOption(metaOptionList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.Metum.MetaOption"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.Metum> ByMetaOption(this IQueryable<Malldub.Data.Metum> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(m => values.Contains(m.MetaOption));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.Metum> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.Metum.FirstOrDefault(m => m.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.Metum> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.Metum.FirstOrDefault(m => m.Identification == identification));

        }
        #endregion
    }
}
#pragma warning restore 1591
