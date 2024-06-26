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
    /// The query extension class for AspNetUsersTemp.
    /// </summary>
    public static partial class AspNetUsersTempExtensions
    {
        /// <summary>
        /// Gets an instance by the primary key.
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.AspNetUsersTemp GetByKey(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.AspNetUsersTemp>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByKey.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(a => a.Identification == identification);
        }
        /// <summary>
        /// Gets an instance by using a unique index.
        /// </summary>
        /// <returns>An instance of the entity or null if not found.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static Malldub.Data.AspNetUsersTemp GetByIdentification(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String identification)
        {
            var entity = queryable as System.Data.Objects.ObjectSet<Malldub.Data.AspNetUsersTemp>;
            if (entity != null && !entity.Context.ContextOptions.LazyLoadingEnabled)
                return Query.GetByIdentification.Invoke((Malldub.Data.MalldubDataContext)entity.Context, identification);

            return queryable.FirstOrDefault(a => a.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByIdentification(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String identification)
        {
            return queryable.Where(a => a.Identification == identification);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByIdentification(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, ContainmentOperator containmentOperator, System.String identification)
        {
            if (identification == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("identification", "Parameter 'identification' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(a => a.Identification.Contains(identification));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(a => a.Identification.StartsWith(identification));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(a => a.Identification.EndsWith(identification));
                case ContainmentOperator.NotContains:
                    return queryable.Where(a => a.Identification.Contains(identification) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(a => a.Identification != identification);
                default:
                    return queryable.Where(a => a.Identification == identification);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="identification">Identification to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByIdentification(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String identification, params System.String[] additionalValues)
        {
            var identificationList = new List<System.String> { identification };

            if (additionalValues != null)
                identificationList.AddRange(additionalValues);

            if (identificationList.Count == 1)
                return queryable.ByIdentification(identificationList[0]);

            return queryable.ByIdentification(identificationList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Identification"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByIdentification(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(a => values.Contains(a.Identification));
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Token"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="token">Token to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByToken(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String token)
        {
            return queryable.Where(a => a.Token == token);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Token"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="token">Token to search for.</param>
        /// <param name="containmentOperator">The containment operator.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByToken(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, ContainmentOperator containmentOperator, System.String token)
        {
            if (token == null && containmentOperator != ContainmentOperator.Equals && containmentOperator != ContainmentOperator.NotEquals)
                throw new ArgumentNullException("token", "Parameter 'token' cannot be null with the specified ContainmentOperator.  Parameter 'containmentOperator' must be ContainmentOperator.Equals or ContainmentOperator.NotEquals to support null.");

            switch (containmentOperator)
            {
                case ContainmentOperator.Contains:
                    return queryable.Where(a => a.Token.Contains(token));
                case ContainmentOperator.StartsWith:
                    return queryable.Where(a => a.Token.StartsWith(token));
                case ContainmentOperator.EndsWith:
                    return queryable.Where(a => a.Token.EndsWith(token));
                case ContainmentOperator.NotContains:
                    return queryable.Where(a => a.Token.Contains(token) == false);
                case ContainmentOperator.NotEquals:
                    return queryable.Where(a => a.Token != token);
                default:
                    return queryable.Where(a => a.Token == token);
            }
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Token"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="token">Token to search for.</param>
        /// <param name="additionalValues">Additional values to search for.</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByToken(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, System.String token, params System.String[] additionalValues)
        {
            var tokenList = new List<System.String> { token };

            if (additionalValues != null)
                tokenList.AddRange(additionalValues);

            if (tokenList.Count == 1)
                return queryable.ByToken(tokenList[0]);

            return queryable.ByToken(tokenList);
        }

        /// <summary>
        /// Gets a query for <see cref="Malldub.Data.AspNetUsersTemp.Token"/>.
        /// </summary>
        /// <param name="queryable">Query to append where clause.</param>
        /// <param name="values">The values to search for..</param>
        /// <returns><see cref="IQueryable"/> with additional where clause.</returns>
        [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
        public static IQueryable<Malldub.Data.AspNetUsersTemp> ByToken(this IQueryable<Malldub.Data.AspNetUsersTemp> queryable, IEnumerable<System.String> values)
        {
            return queryable.Where(a => values.Contains(a.Token));
        }

        #region Query
        /// <summary>
        /// A private class for lazy loading static compiled queries.
        /// </summary>
        private static partial class Query
        {
            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.AspNetUsersTemp> GetByKey =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.AspNetUsersTemp.FirstOrDefault(a => a.Identification == identification));

            [System.CodeDom.Compiler.GeneratedCode("CodeSmith Generator", "6.0.0.0")]
            internal static readonly Func<Malldub.Data.MalldubDataContext, System.String, Malldub.Data.AspNetUsersTemp> GetByIdentification =
                System.Data.Objects.CompiledQuery.Compile(
                    (Malldub.Data.MalldubDataContext db, System.String identification) =>
                        db.AspNetUsersTemp.FirstOrDefault(a => a.Identification == identification));

        }
        #endregion
    }
}
#pragma warning restore 1591
