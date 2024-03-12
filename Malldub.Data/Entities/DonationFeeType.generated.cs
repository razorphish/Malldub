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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="DonationFeeType")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class DonationFeeType : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new DonationFeeType object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="friendlyName">Initial value of the FriendlyName property.</param>
        /// <param name="description">Initial value of the Description property.</param>
        public static DonationFeeType CreateDonationFeeType(global::System.String identification, global::System.String friendlyName, global::System.String description)
        {
            DonationFeeType donationFeeType = new DonationFeeType();
            donationFeeType.Identification = identification;
            donationFeeType.FriendlyName = friendlyName;
            donationFeeType.Description = description;

            return donationFeeType;
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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Description
        {
            get
            {
                return _description;
            }
            set
            {
                if (_description != value)
                {
                    OnDescriptionChanging(value);
                    ReportPropertyChanging("Description");
                    _description = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Description");
                    OnDescriptionChanged();
                }
            }
        }

        private global::System.String _description;
        partial void OnDescriptionChanging(global::System.String value);
        partial void OnDescriptionChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Byte? SortOrderNumber
        {
            get
            {
                return _sortOrderNumber;
            }
            set
            {
                if (_sortOrderNumber != value)
                {
                    OnSortOrderNumberChanging(value);
                    ReportPropertyChanging("SortOrderNumber");
                    _sortOrderNumber = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("SortOrderNumber");
                    OnSortOrderNumberChanged();
                }
            }
        }

        private global::System.Byte? _sortOrderNumber;
        partial void OnSortOrderNumberChanging(global::System.Byte? value);
        partial void OnSortOrderNumberChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Donation_DonationFeeType", "Donation")]
        public EntityCollection<Donation> DonationList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Donation>("Malldub.Data.FK_Donation_DonationFeeType", "Donation");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Donation>("Malldub.Data.FK_Donation_DonationFeeType", "Donation", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591