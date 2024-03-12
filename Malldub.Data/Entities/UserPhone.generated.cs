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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="UserPhone")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class UserPhone : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new UserPhone object.
        /// </summary>
        /// <param name="userId">Initial value of the UserId property.</param>
        /// <param name="phoneId">Initial value of the PhoneId property.</param>
        /// <param name="isDefault">Initial value of the IsDefault property.</param>
        public static UserPhone CreateUserPhone(global::System.String userId, global::System.Int32 phoneId, global::System.Boolean isDefault)
        {
            UserPhone userPhone = new UserPhone();
            userPhone.UserId = userId;
            userPhone.PhoneId = phoneId;
            userPhone.IsDefault = isDefault;

            return userPhone;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String UserId
        {
            get
            {
                return _userId;
            }
            set
            {
                if (_userId != value)
                {
                    OnUserIdChanging(value);
                    ReportPropertyChanging("UserId");
                    _userId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("UserId");
                    OnUserIdChanged();
                }
            }
        }

        private global::System.String _userId;
        partial void OnUserIdChanging(global::System.String value);
        partial void OnUserIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 PhoneId
        {
            get
            {
                return _phoneId;
            }
            set
            {
                if (_phoneId != value)
                {
                    OnPhoneIdChanging(value);
                    ReportPropertyChanging("PhoneId");
                    _phoneId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("PhoneId");
                    OnPhoneIdChanged();
                }
            }
        }

        private global::System.Int32 _phoneId;
        partial void OnPhoneIdChanging(global::System.Int32 value);
        partial void OnPhoneIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean IsDefault
        {
            get
            {
                return _isDefault;
            }
            set
            {
                if (_isDefault != value)
                {
                    OnIsDefaultChanging(value);
                    ReportPropertyChanging("IsDefault");
                    _isDefault = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("IsDefault");
                    OnIsDefaultChanged();
                }
            }
        }

        private global::System.Boolean _isDefault;
        partial void OnIsDefaultChanging(global::System.Boolean value);
        partial void OnIsDefaultChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserPhone_Phone", "Phone")]
        public Phone Phone
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Phone>("Malldub.Data.FK_UserPhone_Phone", "Phone").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Phone>("Malldub.Data.FK_UserPhone_Phone", "Phone").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Phone> PhoneReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Phone>("Malldub.Data.FK_UserPhone_Phone", "Phone");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Phone>("Malldub.Data.FK_UserPhone_Phone", "Phone", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserPhone_Users", "AspNetUser")]
        public AspNetUser AspNetUser
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_UserPhone_Users", "AspNetUser").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_UserPhone_Users", "AspNetUser").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUser> AspNetUserReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_UserPhone_Users", "AspNetUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUser>("Malldub.Data.FK_UserPhone_Users", "AspNetUser", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591