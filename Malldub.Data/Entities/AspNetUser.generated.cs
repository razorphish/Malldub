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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="AspNetUser")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class AspNetUser : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new AspNetUser object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="userName">Initial value of the UserName property.</param>
        /// <param name="discriminator">Initial value of the Discriminator property.</param>
        /// <param name="dateEntered">Initial value of the DateEntered property.</param>
        /// <param name="dateUpdated">Initial value of the DateUpdated property.</param>
        public static AspNetUser CreateAspNetUser(global::System.String identification, global::System.String userName, global::System.String discriminator, global::System.DateTime dateEntered, global::System.DateTime dateUpdated)
        {
            AspNetUser aspNetUser = new AspNetUser();
            aspNetUser.Identification = identification;
            aspNetUser.UserName = userName;
            aspNetUser.Discriminator = discriminator;
            aspNetUser.DateEntered = dateEntered;
            aspNetUser.DateUpdated = dateUpdated;

            return aspNetUser;
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
        public global::System.String UserName
        {
            get
            {
                return _userName;
            }
            set
            {
                if (_userName != value)
                {
                    OnUserNameChanging(value);
                    ReportPropertyChanging("UserName");
                    _userName = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("UserName");
                    OnUserNameChanged();
                }
            }
        }

        private global::System.String _userName;
        partial void OnUserNameChanging(global::System.String value);
        partial void OnUserNameChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String PasswordHash
        {
            get
            {
                return _passwordHash;
            }
            set
            {
                if (_passwordHash != value)
                {
                    OnPasswordHashChanging(value);
                    ReportPropertyChanging("PasswordHash");
                    _passwordHash = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("PasswordHash");
                    OnPasswordHashChanged();
                }
            }
        }

        private global::System.String _passwordHash;
        partial void OnPasswordHashChanging(global::System.String value);
        partial void OnPasswordHashChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String SecurityStamp
        {
            get
            {
                return _securityStamp;
            }
            set
            {
                if (_securityStamp != value)
                {
                    OnSecurityStampChanging(value);
                    ReportPropertyChanging("SecurityStamp");
                    _securityStamp = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("SecurityStamp");
                    OnSecurityStampChanged();
                }
            }
        }

        private global::System.String _securityStamp;
        partial void OnSecurityStampChanging(global::System.String value);
        partial void OnSecurityStampChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Discriminator
        {
            get
            {
                return _discriminator;
            }
            set
            {
                if (_discriminator != value)
                {
                    OnDiscriminatorChanging(value);
                    ReportPropertyChanging("Discriminator");
                    _discriminator = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Discriminator");
                    OnDiscriminatorChanged();
                }
            }
        }

        private global::System.String _discriminator;
        partial void OnDiscriminatorChanging(global::System.String value);
        partial void OnDiscriminatorChanged();

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
        public global::System.String StatusId
        {
            get
            {
                return _statusId;
            }
            set
            {
                if (_statusId != value)
                {
                    OnStatusIdChanging(value);
                    ReportPropertyChanging("StatusId");
                    _statusId = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("StatusId");
                    OnStatusIdChanged();
                }
            }
        }

        private global::System.String _statusId;
        partial void OnStatusIdChanging(global::System.String value);
        partial void OnStatusIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Int32? AvatarUploadId
        {
            get
            {
                return _avatarUploadId;
            }
            set
            {
                if (_avatarUploadId != value)
                {
                    OnAvatarUploadIdChanging(value);
                    ReportPropertyChanging("AvatarUploadId");
                    _avatarUploadId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("AvatarUploadId");
                    OnAvatarUploadIdChanged();
                }
            }
        }

        private global::System.Int32? _avatarUploadId;
        partial void OnAvatarUploadIdChanging(global::System.Int32? value);
        partial void OnAvatarUploadIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String AvatarUploadTempLocation
        {
            get
            {
                return _avatarUploadTempLocation;
            }
            set
            {
                if (_avatarUploadTempLocation != value)
                {
                    OnAvatarUploadTempLocationChanging(value);
                    ReportPropertyChanging("AvatarUploadTempLocation");
                    _avatarUploadTempLocation = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("AvatarUploadTempLocation");
                    OnAvatarUploadTempLocationChanged();
                }
            }
        }

        private global::System.String _avatarUploadTempLocation;
        partial void OnAvatarUploadTempLocationChanging(global::System.String value);
        partial void OnAvatarUploadTempLocationChanged();

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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUsers_Upload", "Upload")]
        public Upload Upload
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_AspNetUsers_Upload", "Upload").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_AspNetUsers_Upload", "Upload").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Upload> UploadReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_AspNetUsers_Upload", "Upload");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Upload>("Malldub.Data.FK_AspNetUsers_Upload", "Upload", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Users_UserStatus", "UserStatus")]
        public UserStatus UserStatus
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<UserStatus>("Malldub.Data.FK_Users_UserStatus", "UserStatus").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<UserStatus>("Malldub.Data.FK_Users_UserStatus", "UserStatus").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<UserStatus> UserStatusReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<UserStatus>("Malldub.Data.FK_Users_UserStatus", "UserStatus");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<UserStatus>("Malldub.Data.FK_Users_UserStatus", "UserStatus", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Account_Users", "Account")]
        public Account Account
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Account>("Malldub.Data.FK_Account_Users", "Account").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Account>("Malldub.Data.FK_Account_Users", "Account").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Account> AccountReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Account>("Malldub.Data.FK_Account_Users", "Account");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Account>("Malldub.Data.FK_Account_Users", "Account", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserClaims_AspNetUsers", "AspNetUserClaim")]
        public EntityCollection<AspNetUserClaim> AspNetUserClaimList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AspNetUserClaim>("Malldub.Data.FK_AspNetUserClaims_AspNetUsers", "AspNetUserClaim");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AspNetUserClaim>("Malldub.Data.FK_AspNetUserClaims_AspNetUsers", "AspNetUserClaim", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserLogins_AspNetUsers", "AspNetUserLogin")]
        public EntityCollection<AspNetUserLogin> AspNetUserLoginList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AspNetUserLogin>("Malldub.Data.FK_AspNetUserLogins_AspNetUsers", "AspNetUserLogin");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AspNetUserLogin>("Malldub.Data.FK_AspNetUserLogins_AspNetUsers", "AspNetUserLogin", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "AspNetUserRoles", "AspNetRole")]
        public EntityCollection<AspNetRole> AspNetRoleList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AspNetRole>("Malldub.Data.AspNetUserRoles", "AspNetRole");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AspNetRole>("Malldub.Data.AspNetUserRoles", "AspNetRole", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Bid_Users", "Bid")]
        public EntityCollection<Bid> BidList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Bid>("Malldub.Data.FK_Bid_Users", "Bid");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Bid>("Malldub.Data.FK_Bid_Users", "Bid", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUpdate_User", "FundUpdate")]
        public EntityCollection<FundUpdate> FundUpdateList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundUpdate>("Malldub.Data.FK_FundUpdate_User", "FundUpdate");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundUpdate>("Malldub.Data.FK_FundUpdate_User", "FundUpdate", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundUser_Member", "FundUser")]
        public EntityCollection<FundUser> FundUserList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundUser>("Malldub.Data.FK_FundUser_Member", "FundUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundUser>("Malldub.Data.FK_FundUser_Member", "FundUser", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Item_User", "Item")]
        public EntityCollection<Item> ItemList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Item>("Malldub.Data.FK_Item_User", "Item");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Item>("Malldub.Data.FK_Item_User", "Item", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Mall_Users", "Mall")]
        public Mall Mall
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Mall>("Malldub.Data.FK_Mall_Users", "Mall").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Mall>("Malldub.Data.FK_Mall_Users", "Mall").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Mall> MallReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Mall>("Malldub.Data.FK_Mall_Users", "Mall");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Mall>("Malldub.Data.FK_Mall_Users", "Mall", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Order_Users", "Order")]
        public EntityCollection<Order> OrderList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Order>("Malldub.Data.FK_Order_Users", "Order");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Order>("Malldub.Data.FK_Order_Users", "Order", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserAddress_Users", "UserAddress")]
        public EntityCollection<UserAddress> UserAddressList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<UserAddress>("Malldub.Data.FK_UserAddress_Users", "UserAddress");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<UserAddress>("Malldub.Data.FK_UserAddress_Users", "UserAddress", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserEmail_Users", "UserEmail")]
        public EntityCollection<UserEmail> UserEmailList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<UserEmail>("Malldub.Data.FK_UserEmail_Users", "UserEmail");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<UserEmail>("Malldub.Data.FK_UserEmail_Users", "UserEmail", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserPhone_Users", "UserPhone")]
        public EntityCollection<UserPhone> UserPhoneList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<UserPhone>("Malldub.Data.FK_UserPhone_Users", "UserPhone");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<UserPhone>("Malldub.Data.FK_UserPhone_Users", "UserPhone", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_UserUpload_Users", "UserUpload")]
        public EntityCollection<UserUpload> UserUploadList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<UserUpload>("Malldub.Data.FK_UserUpload_Users", "UserUpload");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<UserUpload>("Malldub.Data.FK_UserUpload_Users", "UserUpload", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGateway_AspNetUsers", "AspNetUserGateway")]
        public EntityCollection<AspNetUserGateway> AspNetUserGatewayList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUserGateway");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGateway_AspNetUsers", "AspNetUserGateway", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundShare_User", "FundShare")]
        public EntityCollection<FundShare> FundShareList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundShare>("Malldub.Data.FK_FundShare_User", "FundShare");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundShare>("Malldub.Data.FK_FundShare_User", "FundShare", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundNote_AspNetUsers", "FundNote")]
        public EntityCollection<FundNote> FundNoteList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundNote>("Malldub.Data.FK_FundNote_AspNetUsers", "FundNote");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundNote>("Malldub.Data.FK_FundNote_AspNetUsers", "FundNote", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeamMember_AspNetUser", "FundTeamMember")]
        public EntityCollection<FundTeamMember> FundTeamMemberList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundTeamMember>("Malldub.Data.FK_FundTeamMember_AspNetUser", "FundTeamMember");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundTeamMember>("Malldub.Data.FK_FundTeamMember_AspNetUser", "FundTeamMember", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Donation_DonorUser", "Donation")]
        public EntityCollection<Donation> DonorUserDonationList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Donation>("Malldub.Data.FK_Donation_DonorUser", "Donation");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Donation>("Malldub.Data.FK_Donation_DonorUser", "Donation", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Donation_MemberUser", "Donation")]
        public EntityCollection<Donation> MemberUserDonationList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Donation>("Malldub.Data.FK_Donation_MemberUser", "Donation");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Donation>("Malldub.Data.FK_Donation_MemberUser", "Donation", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Comment_AspNetUser", "Comment")]
        public EntityCollection<Comment> CommentList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Comment>("Malldub.Data.FK_Comment_AspNetUser", "Comment");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Comment>("Malldub.Data.FK_Comment_AspNetUser", "Comment", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591