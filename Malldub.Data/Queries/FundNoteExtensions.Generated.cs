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
    /// The query extension class for FundNote.
    /// </summary>
    public static partial class FundNoteExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.FundNote GetByKey(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 identification)
        {
            return queryable.FirstOrDefault(f => f.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.FundNote GetByIdentification(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.FundNote>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(f => f.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByIdentification(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 identification)
        {
            return queryable.Where(f => f.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByIdentification(this IQueryable<Malldub.Data.FundNote> queryable, ComparisonOperator comparisonOperator, System.Int32 identification)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(f => f.Identification > identification);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(f => f.Identification >= identification);
                case ComparisonOperator.LessThan:
                    return queryable.Where(f => f.Identification < identification);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(f => f.Identification <= identification);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(f => f.Identification != identification);
                default:
                    return queryable.Where(f => f.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByIdentification(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 identification, params System.Int32[] additionalValues)
        {
            var identificationList = new List<System.Int32> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByIdentification(this IQueryable<Malldub.Data.FundNote> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(f => values.Contains(f.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundUserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundUserId">FundUserId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundUserId(this IQueryable<Malldub.Data.FundNote> queryable, System.String fundUserId)
        {
            return queryable.Where(f => f.FundUserId == fundUserId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundUserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundUserId">FundUserId to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundUserId(this IQueryable<Malldub.Data.FundNote> queryable, ContainmentOperator containmentOperator, System.String fundUserId)
        {
            if (fundUserId == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("fundUserId", "Parameter 'fundUserId' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(f => f.FundUserId.Contains(fundUserId));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(f => f.FundUserId.StartsWith(fundUserId));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(f => f.FundUserId.EndsWith(fundUserId));
                case ContainmentOperator.NotContains:
                    return queryable.Where(f => f.FundUserId.Contains(fundUserId) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(f => f.FundUserId != fundUserId);
                default:
                    return queryable.Where(f => f.FundUserId == fundUserId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundUserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundUserId">FundUserId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundUserId(this IQueryable<Malldub.Data.FundNote> queryable, System.String fundUserId, params System.String[] additionalValues)
        {
            var fundUserIdList = new List<System.String> { fundUserId };

            if (additionalValues != null)
                fundUserIdList.AddRange(additionalValues);

            if (fundUserIdList.Count == 1)
                return queryable.ByFundUserId(fundUserIdList[0]);

            return queryable.ByFundUserId(fundUserIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundUserId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundUserId(this IQueryable<Malldub.Data.FundNote> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(f => values.Contains(f.FundUserId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundId">FundId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundId(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 fundId)
        {
            return queryable.Where(f => f.FundId == fundId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundId">FundId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundId(this IQueryable<Malldub.Data.FundNote> queryable, ComparisonOperator comparisonOperator, System.Int32 fundId)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(f => f.FundId > fundId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(f => f.FundId >= fundId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(f => f.FundId < fundId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(f => f.FundId <= fundId);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(f => f.FundId != fundId);
                default:
                    return queryable.Where(f => f.FundId == fundId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="fundId">FundId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundId(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32 fundId, params System.Int32[] additionalValues)
        {
            var fundIdList = new List<System.Int32> { fundId };

            if (additionalValues != null)
                fundIdList.AddRange(additionalValues);

            if (fundIdList.Count == 1)
                return queryable.ByFundId(fundIdList[0]);

            return queryable.ByFundId(fundIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.FundId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByFundId(this IQueryable<Malldub.Data.FundNote> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(f => values.Contains(f.FundId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.RespondNoteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="respondNoteId">RespondNoteId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByRespondNoteId(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32? respondNoteId)
        {
            // support nulls
            return respondNoteId == null 
                ? queryable.Where(f => f.RespondNoteId == null) 
                : queryable.Where(f => f.RespondNoteId == respondNoteId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.RespondNoteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="respondNoteId">RespondNoteId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByRespondNoteId(this IQueryable<Malldub.Data.FundNote> queryable, ComparisonOperator comparisonOperator, System.Int32? respondNoteId)
        {
            if (respondNoteId == null && comparisonOperator != ComparisonOperator.Equals && comparisonOperator != ComparisonOperator.NotEquals)
                throw new ArgumentNullException("respondNoteId", "Parameter 'respondNoteId' cannot be null with the specified ComparisonOperator.  Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support null.");

            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(f => f.RespondNoteId > respondNoteId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(f => f.RespondNoteId >= respondNoteId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(f => f.RespondNoteId < respondNoteId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(f => f.RespondNoteId <= respondNoteId);
                case ComparisonOperator.NotEquals:
                    return respondNoteId == null 
                        ? queryable.Where(f => f.RespondNoteId != null) 
                        : queryable.Where(f => f.RespondNoteId != respondNoteId);
                default:
                    return respondNoteId == null 
                        ? queryable.Where(f => f.RespondNoteId == null) 
                        : queryable.Where(f => f.RespondNoteId == respondNoteId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.RespondNoteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="respondNoteId">RespondNoteId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByRespondNoteId(this IQueryable<Malldub.Data.FundNote> queryable, System.Int32? respondNoteId, params System.Int32?[] additionalValues)
        {
            var respondNoteIdList = new List<System.Int32?> { respondNoteId };

            if (additionalValues != null)
                respondNoteIdList.AddRange(additionalValues);
            else
                respondNoteIdList.Add(null);

            if (respondNoteIdList.Count == 1)
                return queryable.ByRespondNoteId(respondNoteIdList[0]);

            return queryable.ByRespondNoteId(respondNoteIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.RespondNoteId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByRespondNoteId(this IQueryable<Malldub.Data.FundNote> queryable, IEnumerable<System.Int32?> values)
        {
            // creating dynmic expression to support nulls
            var expression = DynamicExpression.BuildExpression<Malldub.Data.FundNote, bool>("RespondNoteId", values);
            return queryable.Where(expression);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.TypeId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="typeId">TypeId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByTypeId(this IQueryable<Malldub.Data.FundNote> queryable, System.String typeId)
        {
            return queryable.Where(f => f.TypeId == typeId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.TypeId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="typeId">TypeId to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByTypeId(this IQueryable<Malldub.Data.FundNote> queryable, ContainmentOperator containmentOperator, System.String typeId)
        {
            if (typeId == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("typeId", "Parameter 'typeId' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(f => f.TypeId.Contains(typeId));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(f => f.TypeId.StartsWith(typeId));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(f => f.TypeId.EndsWith(typeId));
                case ContainmentOperator.NotContains:
                    return queryable.Where(f => f.TypeId.Contains(typeId) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(f => f.TypeId != typeId);
                default:
                    return queryable.Where(f => f.TypeId == typeId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.TypeId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="typeId">TypeId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByTypeId(this IQueryable<Malldub.Data.FundNote> queryable, System.String typeId, params System.String[] additionalValues)
        {
            var typeIdList = new List<System.String> { typeId };

            if (additionalValues != null)
                typeIdList.AddRange(additionalValues);

            if (typeIdList.Count == 1)
                return queryable.ByTypeId(typeIdList[0]);

            return queryable.ByTypeId(typeIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundNote.TypeId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundNote> ByTypeId(this IQueryable<Malldub.Data.FundNote> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(f => values.Contains(f.TypeId));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.FundNote> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.FundNote.FirstOrDefault(f => f.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, Malldub.Data.FundNote> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 identification) =>
                        db.FundNote.FirstOrDefault(f => f.Identification == identification));

        }
        #endregion
    }
}
#pragma warning restore 1591