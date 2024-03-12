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
    /// The query extension class for RefactorLog.
    /// </summary>
    public static partial class RefactorLogExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.RefactorLog GetByKey(this IQueryable<Malldub.Data.RefactorLog> queryable, System.Guid operationKey)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.RefactorLog>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, operationKey);

            return queryable.FirstOrDefault(r => r.OperationKey == operationKey);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.RefactorLog GetByOperationKey(this IQueryable<Malldub.Data.RefactorLog> queryable, System.Guid operationKey)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.RefactorLog>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByOperationKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, operationKey);

            return queryable.FirstOrDefault(r => r.OperationKey == operationKey);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.RefactorLog.OperationKey"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="operationKey">OperationKey to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.RefactorLog> ByOperationKey(this IQueryable<Malldub.Data.RefactorLog> queryable, System.Guid operationKey)
        {
            return queryable.Where(r => r.OperationKey == operationKey);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.RefactorLog.OperationKey"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="operationKey">OperationKey to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.RefactorLog> ByOperationKey(this IQueryable<Malldub.Data.RefactorLog> queryable, ComparisonOperator comparisonOperator, System.Guid operationKey)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                case ComparisonOperator.GreaterThanOrEquals:
                case ComparisonOperator.LessThan:
                case ComparisonOperator.LessThanOrEquals:
                    throw new ArgumentException("Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support System.Guid type.", "comparisonOperator");
                case ComparisonOperator.NotEquals:
                    return queryable.Where(r => r.OperationKey != operationKey);
                default:
                    return queryable.Where(r => r.OperationKey == operationKey);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.RefactorLog.OperationKey"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="operationKey">OperationKey to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.RefactorLog> ByOperationKey(this IQueryable<Malldub.Data.RefactorLog> queryable, System.Guid operationKey, params System.Guid[] additionalValues)
        {
            var operationKeyList = new List<System.Guid> { operationKey };

            if (additionalValues != null)
                operationKeyList.AddRange(additionalValues);

            if (operationKeyList.Count == 1)
                return queryable.ByOperationKey(operationKeyList[0]);

            return queryable.ByOperationKey(operationKeyList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.RefactorLog.OperationKey"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.RefactorLog> ByOperationKey(this IQueryable<Malldub.Data.RefactorLog> queryable, IEnumerable<System.Guid> values)
        {
            return queryable.Where(r => values.Contains(r.OperationKey));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Guid, Malldub.Data.RefactorLog> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Guid operationKey) =>
                        db.RefactorLog.FirstOrDefault(r => r.OperationKey == operationKey));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Guid, Malldub.Data.RefactorLog> GetByOperationKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Guid operationKey) =>
                        db.RefactorLog.FirstOrDefault(r => r.OperationKey == operationKey));

        }
        #endregion
    }
}
#pragma warning restore 1591