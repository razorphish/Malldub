﻿#pragma warning disable 1591
// <auto-generated>
//     This code was generated from a CodeSmith Generator template.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Data.EntityClient;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace Malldub.Data
{
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="RefactorLog")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class RefactorLog : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new RefactorLog object.
        /// </summary>
        /// <param name="operationKey">Initial value of the OperationKey property.</param>
        public static RefactorLog CreateRefactorLog(global::System.Guid operationKey)
        {
            RefactorLog refactorLog = new RefactorLog();
            refactorLog.OperationKey = operationKey;

            return refactorLog;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Guid OperationKey
        {
            get
            {
                return _operationKey;
            }
            set
            {
                if (_operationKey != value)
                {
                    OnOperationKeyChanging(value);
                    ReportPropertyChanging("OperationKey");
                    _operationKey = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("OperationKey");
                    OnOperationKeyChanged();
                }
            }
        }

        private global::System.Guid _operationKey;
        partial void OnOperationKeyChanging(global::System.Guid value);
        partial void OnOperationKeyChanged();

        #endregion
    }
}
#pragma warning restore 1591