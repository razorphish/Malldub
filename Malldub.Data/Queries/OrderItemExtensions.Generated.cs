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
    /// The query extension class for OrderItem.
    /// </summary>
    public static partial class OrderItemExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.OrderItem GetByKey(this IQueryable<Malldub.Data.OrderItem> queryable, System.Int32 orderId, System.Int32 itemId)
        {
            return queryable.FirstOrDefault(o => o.OrderId == orderId 
					&& o.ItemId == itemId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.OrderId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="orderId">OrderId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByOrderId(this IQueryable<Malldub.Data.OrderItem> queryable, System.Int32 orderId)
        {
            return queryable.Where(o => o.OrderId == orderId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.OrderId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="orderId">OrderId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByOrderId(this IQueryable<Malldub.Data.OrderItem> queryable, ComparisonOperator comparisonOperator, System.Int32 orderId)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(o => o.OrderId > orderId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(o => o.OrderId >= orderId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(o => o.OrderId < orderId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(o => o.OrderId <= orderId);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(o => o.OrderId != orderId);
                default:
                    return queryable.Where(o => o.OrderId == orderId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.OrderId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="orderId">OrderId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByOrderId(this IQueryable<Malldub.Data.OrderItem> queryable, System.Int32 orderId, params System.Int32[] additionalValues)
        {
            var orderIdList = new List<System.Int32> { orderId };

            if (additionalValues != null)
                orderIdList.AddRange(additionalValues);

            if (orderIdList.Count == 1)
                return queryable.ByOrderId(orderIdList[0]);

            return queryable.ByOrderId(orderIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.OrderId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByOrderId(this IQueryable<Malldub.Data.OrderItem> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(o => values.Contains(o.OrderId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemId">ItemId to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemId(this IQueryable<Malldub.Data.OrderItem> queryable, System.Int32 itemId)
        {
            return queryable.Where(o => o.ItemId == itemId);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemId">ItemId to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemId(this IQueryable<Malldub.Data.OrderItem> queryable, ComparisonOperator comparisonOperator, System.Int32 itemId)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(o => o.ItemId > itemId);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(o => o.ItemId >= itemId);
                case ComparisonOperator.LessThan:
                    return queryable.Where(o => o.ItemId < itemId);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(o => o.ItemId <= itemId);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(o => o.ItemId != itemId);
                default:
                    return queryable.Where(o => o.ItemId == itemId);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemId">ItemId to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemId(this IQueryable<Malldub.Data.OrderItem> queryable, System.Int32 itemId, params System.Int32[] additionalValues)
        {
            var itemIdList = new List<System.Int32> { itemId };

            if (additionalValues != null)
                itemIdList.AddRange(additionalValues);

            if (itemIdList.Count == 1)
                return queryable.ByItemId(itemIdList[0]);

            return queryable.ByItemId(itemIdList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemId"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemId(this IQueryable<Malldub.Data.OrderItem> queryable, IEnumerable<System.Int32> values)
        {
            return queryable.Where(o => values.Contains(o.ItemId));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.Price"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="price">Price to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByPrice(this IQueryable<Malldub.Data.OrderItem> queryable, System.Decimal price)
        {
            return queryable.Where(o => o.Price == price);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.Price"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="price">Price to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByPrice(this IQueryable<Malldub.Data.OrderItem> queryable, ComparisonOperator comparisonOperator, System.Decimal price)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                    return queryable.Where(o => o.Price > price);
                case ComparisonOperator.GreaterThanOrEquals:
                    return queryable.Where(o => o.Price >= price);
                case ComparisonOperator.LessThan:
                    return queryable.Where(o => o.Price < price);
                case ComparisonOperator.LessThanOrEquals:
                    return queryable.Where(o => o.Price <= price);
                case ComparisonOperator.NotEquals:
                    return queryable.Where(o => o.Price != price);
                default:
                    return queryable.Where(o => o.Price == price);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.Price"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="price">Price to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByPrice(this IQueryable<Malldub.Data.OrderItem> queryable, System.Decimal price, params System.Decimal[] additionalValues)
        {
            var priceList = new List<System.Decimal> { price };

            if (additionalValues != null)
                priceList.AddRange(additionalValues);

            if (priceList.Count == 1)
                return queryable.ByPrice(priceList[0]);

            return queryable.ByPrice(priceList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.Price"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByPrice(this IQueryable<Malldub.Data.OrderItem> queryable, IEnumerable<System.Decimal> values)
        {
            return queryable.Where(o => values.Contains(o.Price));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemOrderGuid"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemOrderGuid">ItemOrderGuid to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemOrderGuid(this IQueryable<Malldub.Data.OrderItem> queryable, System.Guid itemOrderGuid)
        {
            return queryable.Where(o => o.ItemOrderGuid == itemOrderGuid);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemOrderGuid"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemOrderGuid">ItemOrderGuid to search for. This is on the right side of the operator.</param>
        /// <param name="comparisonOperator">The comparison operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemOrderGuid(this IQueryable<Malldub.Data.OrderItem> queryable, ComparisonOperator comparisonOperator, System.Guid itemOrderGuid)
        {
            switch (comparisonOperator)
            {
                case ComparisonOperator.GreaterThan:
                case ComparisonOperator.GreaterThanOrEquals:
                case ComparisonOperator.LessThan:
                case ComparisonOperator.LessThanOrEquals:
                    throw new ArgumentException("Parameter 'comparisonOperator' must be ComparisonOperator.Equals or ComparisonOperator.NotEquals to support System.Guid type.", "comparisonOperator");
                case ComparisonOperator.NotEquals:
                    return queryable.Where(o => o.ItemOrderGuid != itemOrderGuid);
                default:
                    return queryable.Where(o => o.ItemOrderGuid == itemOrderGuid);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemOrderGuid"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="itemOrderGuid">ItemOrderGuid to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemOrderGuid(this IQueryable<Malldub.Data.OrderItem> queryable, System.Guid itemOrderGuid, params System.Guid[] additionalValues)
        {
            var itemOrderGuidList = new List<System.Guid> { itemOrderGuid };

            if (additionalValues != null)
                itemOrderGuidList.AddRange(additionalValues);

            if (itemOrderGuidList.Count == 1)
                return queryable.ByItemOrderGuid(itemOrderGuidList[0]);

            return queryable.ByItemOrderGuid(itemOrderGuidList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.OrderItem.ItemOrderGuid"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.OrderItem> ByItemOrderGuid(this IQueryable<Malldub.Data.OrderItem> queryable, IEnumerable<System.Guid> values)
        {
            return queryable.Where(o => values.Contains(o.ItemOrderGuid));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.Int32, System.Int32, Malldub.Data.OrderItem> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.Int32 orderId, System.Int32 itemId) =>
                        db.OrderItem.FirstOrDefault(o => o.OrderId == orderId 
							&& o.ItemId == itemId));
        }
        #endregion
    }
}
#pragma warning restore 1591