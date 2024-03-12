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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="Phone")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class Phone : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new Phone object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="typeId">Initial value of the TypeId property.</param>
        /// <param name="number">Initial value of the Number property.</param>
        public static Phone CreatePhone(global::System.Int32 identification, global::System.String typeId, global::System.String number)
        {
            Phone phone = new Phone();
            phone.Identification = identification;
            phone.TypeId = typeId;
            phone.Number = number;

            return phone;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 Identification
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
                    _identification = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Identification");
                    OnIdentificationChanged();
                }
            }
        }

        private global::System.Int32 _identification;
        partial void OnIdentificationChanging(global::System.Int32 value);
        partial void OnIdentificationChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String TypeId
        {
            get
            {
                return _typeId;
            }
            set
            {
                if (_typeId != value)
                {
                    OnTypeIdChanging(value);
                    ReportPropertyChanging("TypeId");
                    _typeId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("TypeId");
                    OnTypeIdChanged();
                }
            }
        }

        private global::System.String _typeId;
        partial void OnTypeIdChanging(global::System.String value);
        partial void OnTypeIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Number
        {
            get
            {
                return _number;
            }
            set
            {
                if (_number != value)
                {
                    OnNumberChanging(value);
                    ReportPropertyChanging("Number");
                    _number = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Number");
                    OnNumberChanged();
                }
            }
        }

        private global::System.String _number;
        partial void OnNumberChanging(global::System.String value);
        partial void OnNumberChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.DateTime? DateEntered
        {
            get
            {
                return _dateEntered;
            }
            set
            {
                if (_dateEntered != value)
                {
                    OnDateEnteredChanging(value);
                    ReportPropertyChanging("DateEntered");
                    _dateEntered = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DateEntered");
                    OnDateEnteredChanged();
                }
            }
        }

        private global::System.DateTime? _dateEntered;
        partial void OnDateEnteredChanging(global::System.DateTime? value);
        partial void OnDateEnteredChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Phone_PhoneType", "PhoneType")]
        public PhoneType PhoneType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PhoneType>("Malldub.Data.FK_Phone_PhoneType", "PhoneType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PhoneType>("Malldub.Data.FK_Phone_PhoneType", "PhoneType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<PhoneType> PhoneTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PhoneType>("Malldub.Data.FK_Phone_PhoneType", "PhoneType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<PhoneType>("Malldub.Data.FK_Phone_PhoneType", "PhoneType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserPhone_Phone", "UserPhone")]
        public EntityCollection<UserPhone> UserPhoneList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<UserPhone>("Malldub.Data.FK_UserPhone_Phone", "UserPhone");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<UserPhone>("Malldub.Data.FK_UserPhone_Phone", "UserPhone", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591