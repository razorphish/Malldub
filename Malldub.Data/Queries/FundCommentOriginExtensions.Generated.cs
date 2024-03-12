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
    /// The query extension class for FundCommentOrigin.
    /// </summary>
    public static partial class FundCommentOriginExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.FundCommentOrigin GetByKey(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.FundCommentOrigin>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(f => f.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.FundCommentOrigin GetByIdentification(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.FundCommentOrigin>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(f => f.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.FundCommentOrigin GetByFriendlyName(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String friendlyName)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.FundCommentOrigin>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByFriendlyName.Invoke((Malldub.Data.MalldubDataContext)entity.Context, friendlyName);

            return queryable.FirstOrDefault(f => f.FriendlyName == friendlyName);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByIdentification(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String identification)
        {
            return queryable.Where(f => f.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByIdentification(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, ContainmentOperator containmentOperator, System.String identification)
        {
            if (identification == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("identification", "Parameter 'identification' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(f => f.Identification.Contains(identification));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(f => f.Identification.StartsWith(identification));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(f => f.Identification.EndsWith(identification));
                case ContainmentOperator.NotContains:
                    return queryable.Where(f => f.Identification.Contains(identification) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(f => f.Identification != identification);
                default:
                    return queryable.Where(f => f.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByIdentification(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String identification, params System.String[] additionalValues)
        {
            var identificationList = new List<System.String> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByIdentification(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(f => values.Contains(f.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByFriendlyName(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String friendlyName)
        {
            return queryable.Where(f => f.FriendlyName == friendlyName);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByFriendlyName(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, ContainmentOperator containmentOperator, System.String friendlyName)
        {
            if (friendlyName == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("friendlyName", "Parameter 'friendlyName' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(f => f.FriendlyName.Contains(friendlyName));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(f => f.FriendlyName.StartsWith(friendlyName));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(f => f.FriendlyName.EndsWith(friendlyName));
                case ContainmentOperator.NotContains:
                    return queryable.Where(f => f.FriendlyName.Contains(friendlyName) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(f => f.FriendlyName != friendlyName);
                default:
                    return queryable.Where(f => f.FriendlyName == friendlyName);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="friendlyName">FriendlyName to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByFriendlyName(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, System.String friendlyName, params System.String[] additionalValues)
        {
            var friendlyNameList = new List<System.String> { friendlyName };

            if (additionalValues != null)
                friendlyNameList.AddRange(additionalValues);

            if (friendlyNameList.Count == 1)
                return queryable.ByFriendlyName(friendlyNameList[0]);

            return queryable.ByFriendlyName(friendlyNameList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.FundCommentOrigin.FriendlyName"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.FundCommentOrigin> ByFriendlyName(this IQueryable<Malldub.Data.FundCommentOrigin> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(f => values.Contains(f.FriendlyName));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.FundCommentOrigin> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.FundCommentOrigin.FirstOrDefault(f => f.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.FundCommentOrigin> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.FundCommentOrigin.FirstOrDefault(f => f.Identification == identification));


            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.FundCommentOrigin> GetByFriendlyName =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String friendlyName) =>
                        db.FundCommentOrigin.FirstOrDefault(f => f.FriendlyName == friendlyName));

        }
        #endregion
    }
}
#pragma warning restore 1591
