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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="AspNetUserGateway")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class AspNetUserGateway : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new AspNetUserGateway object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="gatewayId">Initial value of the GatewayId property.</param>
        /// <param name="aspNetUserId">Initial value of the AspNetUserId property.</param>
        /// <param name="gatewayUserId">Initial value of the GatewayUserId property.</param>
        /// <param name="dateEntered">Initial value of the DateEntered property.</param>
        /// <param name="dateUpdated">Initial value of the DateUpdated property.</param>
        public static AspNetUserGateway CreateAspNetUserGateway(global::System.Int32 identification, global::System.String gatewayId, global::System.String aspNetUserId, global::System.String gatewayUserId, global::System.DateTime dateEntered, global::System.DateTime dateUpdated)
        {
            AspNetUserGateway aspNetUserGateway = new AspNetUserGateway();
            aspNetUserGateway.Identification = identification;
            aspNetUserGateway.GatewayId = gatewayId;
            aspNetUserGateway.AspNetUserId = aspNetUserId;
            aspNetUserGateway.GatewayUserId = gatewayUserId;
            aspNetUserGateway.DateEntered = dateEntered;
            aspNetUserGateway.DateUpdated = dateUpdated;

            return aspNetUserGateway;
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
        public global::System.String GatewayId
        {
            get
            {
                return _gatewayId;
            }
            set
            {
                if (_gatewayId != value)
                {
                    OnGatewayIdChanging(value);
                    ReportPropertyChanging("GatewayId");
                    _gatewayId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("GatewayId");
                    OnGatewayIdChanged();
                }
            }
        }

        private global::System.String _gatewayId;
        partial void OnGatewayIdChanging(global::System.String value);
        partial void OnGatewayIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String AspNetUserId
        {
            get
            {
                return _aspNetUserId;
            }
            set
            {
                if (_aspNetUserId != value)
                {
                    OnAspNetUserIdChanging(value);
                    ReportPropertyChanging("AspNetUserId");
                    _aspNetUserId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("AspNetUserId");
                    OnAspNetUserIdChanged();
                }
            }
        }

        private global::System.String _aspNetUserId;
        partial void OnAspNetUserIdChanging(global::System.String value);
        partial void OnAspNetUserIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String GatewayUserId
        {
            get
            {
                return _gatewayUserId;
            }
            set
            {
                if (_gatewayUserId != value)
                {
                    OnGatewayUserIdChanging(value);
                    ReportPropertyChanging("GatewayUserId");
                    _gatewayUserId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("GatewayUserId");
                    OnGatewayUserIdChanged();
                }
            }
        }

        private global::System.String _gatewayUserId;
        partial void OnGatewayUserIdChanging(global::System.String value);
        partial void OnGatewayUserIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String FirstName
        {
            get
            {
                return _firstName;
            }
            set
            {
                if (_firstName != value)
                {
                    OnFirstNameChanging(value);
                    ReportPropertyChanging("FirstName");
                    _firstName = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("FirstName");
                    OnFirstNameChanged();
                }
            }
        }

        private global::System.String _firstName;
        partial void OnFirstNameChanging(global::System.String value);
        partial void OnFirstNameChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String LastName
        {
            get
            {
                return _lastName;
            }
            set
            {
                if (_lastName != value)
                {
                    OnLastNameChanging(value);
                    ReportPropertyChanging("LastName");
                    _lastName = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("LastName");
                    OnLastNameChanged();
                }
            }
        }

        private global::System.String _lastName;
        partial void OnLastNameChanging(global::System.String value);
        partial void OnLastNameChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Email
        {
            get
            {
                return _email;
            }
            set
            {
                if (_email != value)
                {
                    OnEmailChanging(value);
                    ReportPropertyChanging("Email");
                    _email = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Email");
                    OnEmailChanged();
                }
            }
        }

        private global::System.String _email;
        partial void OnEmailChanging(global::System.String value);
        partial void OnEmailChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String AccessToken
        {
            get
            {
                return _accessToken;
            }
            set
            {
                if (_accessToken != value)
                {
                    OnAccessTokenChanging(value);
                    ReportPropertyChanging("AccessToken");
                    _accessToken = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("AccessToken");
                    OnAccessTokenChanged();
                }
            }
        }

        private global::System.String _accessToken;
        partial void OnAccessTokenChanging(global::System.String value);
        partial void OnAccessTokenChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String TokenType
        {
            get
            {
                return _tokenType;
            }
            set
            {
                if (_tokenType != value)
                {
                    OnTokenTypeChanging(value);
                    ReportPropertyChanging("TokenType");
                    _tokenType = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("TokenType");
                    OnTokenTypeChanged();
                }
            }
        }

        private global::System.String _tokenType;
        partial void OnTokenTypeChanging(global::System.String value);
        partial void OnTokenTypeChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String TokenExpiration
        {
            get
            {
                return _tokenExpiration;
            }
            set
            {
                if (_tokenExpiration != value)
                {
                    OnTokenExpirationChanging(value);
                    ReportPropertyChanging("TokenExpiration");
                    _tokenExpiration = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("TokenExpiration");
                    OnTokenExpirationChanged();
                }
            }
        }

        private global::System.String _tokenExpiration;
        partial void OnTokenExpirationChanging(global::System.String value);
        partial void OnTokenExpirationChanged();

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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.DateTime DateUpdated
        {
            get
            {
                return _dateUpdated;
            }
            set
            {
                if (_dateUpdated != value)
                {
                    OnDateUpdatedChanging(value);
                    ReportPropertyChanging("DateUpdated");
                    _dateUpdated = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DateUpdated");
                    OnDateUpdatedChanged();
                }
            }
        }

        private global::System.DateTime _dateUpdated;
        partial void OnDateUpdatedChanging(global::System.DateTime value);
        partial void OnDateUpdatedChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String AccountId
        {
            get
            {
                return _accountId;
            }
            set
            {
                if (_accountId != value)
                {
                    OnAccountIdChanging(value);
                    ReportPropertyChanging("AccountId");
                    _accountId = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("AccountId");
                    OnAccountIdChanged();
                }
            }
        }

        private global::System.String _accountId;
        partial void OnAccountIdChanging(global::System.String value);
        partial void OnAccountIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String AccountReferenceId
        {
            get
            {
                return _accountReferenceId;
            }
            set
            {
                if (_accountReferenceId != value)
                {
                    OnAccountReferenceIdChanging(value);
                    ReportPropertyChanging("AccountReferenceId");
                    _accountReferenceId = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("AccountReferenceId");
                    OnAccountReferenceIdChanged();
                }
            }
        }

        private global::System.String _accountReferenceId;
        partial void OnAccountReferenceIdChanging(global::System.String value);
        partial void OnAccountReferenceIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String UserState
        {
            get
            {
                return _userState;
            }
            set
            {
                if (_userState != value)
                {
                    OnUserStateChanging(value);
                    ReportPropertyChanging("UserState");
                    _userState = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("UserState");
                    OnUserStateChanged();
                }
            }
        }

        private global::System.String _userState;
        partial void OnUserStateChanging(global::System.String value);
        partial void OnUserStateChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String AccountState
        {
            get
            {
                return _accountState;
            }
            set
            {
                if (_accountState != value)
                {
                    OnAccountStateChanging(value);
                    ReportPropertyChanging("AccountState");
                    _accountState = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("AccountState");
                    OnAccountStateChanged();
                }
            }
        }

        private global::System.String _accountState;
        partial void OnAccountStateChanging(global::System.String value);
        partial void OnAccountStateChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGateway_AspNetUsers", "AspNetUser")]
        public AspNetUser AspNetUser
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUser").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUser").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUser> AspNetUserReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUser>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUser", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGateway_Gateway", "Gateway")]
        public Gateway Gateway
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Gateway>("Malldub.Data.FK_AspNetUserGateway_Gateway", "Gateway").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Gateway>("Malldub.Data.FK_AspNetUserGateway_Gateway", "Gateway").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Gateway> GatewayReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Gateway>("Malldub.Data.FK_AspNetUserGateway_Gateway", "Gateway");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Gateway>("Malldub.Data.FK_AspNetUserGateway_Gateway", "Gateway", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGatewayActivity")]
        public EntityCollection<AspNetUserGatewayActivity> AspNetUserGatewayActivityList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AspNetUserGatewayActivity>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGatewayActivity");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AspNetUserGatewayActivity>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGatewayActivity", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591