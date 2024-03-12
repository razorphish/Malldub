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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="FundUser")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class FundUser : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new FundUser object.
        /// </summary>
        /// <param name="fundId">Initial value of the FundId property.</param>
        /// <param name="userId">Initial value of the UserId property.</param>
        /// <param name="userTypeId">Initial value of the UserTypeId property.</param>
        /// <param name="dateEntered">Initial value of the DateEntered property.</param>
        public static FundUser CreateFundUser(global::System.Int32 fundId, global::System.String userId, global::System.String userTypeId, global::System.DateTime dateEntered)
        {
            FundUser fundUser = new FundUser();
            fundUser.FundId = fundId;
            fundUser.UserId = userId;
            fundUser.UserTypeId = userTypeId;
            fundUser.DateEntered = dateEntered;

            return fundUser;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 FundId
        {
            get
            {
                return _fundId;
            }
            set
            {
                if (_fundId != value)
                {
                    OnFundIdChanging(value);
                    ReportPropertyChanging("FundId");
                    _fundId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("FundId");
                    OnFundIdChanged();
                }
            }
        }

        private global::System.Int32 _fundId;
        partial void OnFundIdChanging(global::System.Int32 value);
        partial void OnFundIdChanged();

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
        public global::System.String UserTypeId
        {
            get
            {
                return _userTypeId;
            }
            set
            {
                if (_userTypeId != value)
                {
                    OnUserTypeIdChanging(value);
                    ReportPropertyChanging("UserTypeId");
                    _userTypeId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("UserTypeId");
                    OnUserTypeIdChanged();
                }
            }
        }

        private global::System.String _userTypeId;
        partial void OnUserTypeIdChanging(global::System.String value);
        partial void OnUserTypeIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean AllowEmail
        {
            get
            {
                return _allowEmail;
            }
            set
            {
                if (_allowEmail != value)
                {
                    OnAllowEmailChanging(value);
                    ReportPropertyChanging("AllowEmail");
                    _allowEmail = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("AllowEmail");
                    OnAllowEmailChanged();
                }
            }
        }

        private global::System.Boolean _allowEmail;
        partial void OnAllowEmailChanging(global::System.Boolean value);
        partial void OnAllowEmailChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean PostToFacebook
        {
            get
            {
                return _postToFacebook;
            }
            set
            {
                if (_postToFacebook != value)
                {
                    OnPostToFacebookChanging(value);
                    ReportPropertyChanging("PostToFacebook");
                    _postToFacebook = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("PostToFacebook");
                    OnPostToFacebookChanged();
                }
            }
        }

        private global::System.Boolean _postToFacebook;
        partial void OnPostToFacebookChanging(global::System.Boolean value);
        partial void OnPostToFacebookChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.DateTime DateEntered
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

        private global::System.DateTime _dateEntered;
        partial void OnDateEnteredChanging(global::System.DateTime value);
        partial void OnDateEnteredChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Int32? UserFundId
        {
            get
            {
                return _userFundId;
            }
            set
            {
                if (_userFundId != value)
                {
                    OnUserFundIdChanging(value);
                    ReportPropertyChanging("UserFundId");
                    _userFundId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("UserFundId");
                    OnUserFundIdChanged();
                }
            }
        }

        private global::System.Int32? _userFundId;
        partial void OnUserFundIdChanging(global::System.Int32? value);
        partial void OnUserFundIdChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUser_Fund", "Fund")]
        public Fund FundFund
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_Fund", "Fund").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_Fund", "Fund").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Fund> FundFundReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_Fund", "Fund");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Fund>("Malldub.Data.FK_FundUser_Fund", "Fund", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUser_FundUserType", "FundUserType")]
        public FundUserType FundUserType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundUserType>("Malldub.Data.FK_FundUser_FundUserType", "FundUserType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundUserType>("Malldub.Data.FK_FundUser_FundUserType", "FundUserType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<FundUserType> FundUserTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundUserType>("Malldub.Data.FK_FundUser_FundUserType", "FundUserType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<FundUserType>("Malldub.Data.FK_FundUser_FundUserType", "FundUserType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUser_Member", "AspNetUser")]
        public AspNetUser AspNetUser
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundUser_Member", "AspNetUser").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundUser_Member", "AspNetUser").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUser> AspNetUserReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundUser_Member", "AspNetUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUser>("Malldub.Data.FK_FundUser_Member", "AspNetUser", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUser_FundUserFund", "Fund")]
        public Fund UserFundFund
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_FundUserFund", "Fund").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_FundUserFund", "Fund").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Fund> UserFundFundReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundUser_FundUserFund", "Fund");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Fund>("Malldub.Data.FK_FundUser_FundUserFund", "Fund", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591