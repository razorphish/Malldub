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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="FundCategory")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class FundCategory : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new FundCategory object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="friendlyName">Initial value of the FriendlyName property.</param>
        public static FundCategory CreateFundCategory(global::System.String identification, global::System.String friendlyName)
        {
            FundCategory fundCategory = new FundCategory();
            fundCategory.Identification = identification;
            fundCategory.FriendlyName = friendlyName;

            return fundCategory;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Identification
        {
            get
            {
                return _identification;
            }
            set
            {
                if (_identification != value)
                {
                    OnIdentificationChanging(value);
                    ReportPropertyChanging("Identification");
                    _identification = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Identification");
                    OnIdentificationChanged();
                }
            }
        }

        private global::System.String _identification;
        partial void OnIdentificationChanging(global::System.String value);
        partial void OnIdentificationChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String FriendlyName
        {
            get
            {
                return _friendlyName;
            }
            set
            {
                if (_friendlyName != value)
                {
                    OnFriendlyNameChanging(value);
                    ReportPropertyChanging("FriendlyName");
                    _friendlyName = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("FriendlyName");
                    OnFriendlyNameChanged();
                }
            }
        }

        private global::System.String _friendlyName;
        partial void OnFriendlyNameChanging(global::System.String value);
        partial void OnFriendlyNameChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Fund_FundCategory", "Fund")]
        public EntityCollection<Fund> FundList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Fund>("Malldub.Data.FK_Fund_FundCategory", "Fund");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Fund>("Malldub.Data.FK_Fund_FundCategory", "Fund", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591