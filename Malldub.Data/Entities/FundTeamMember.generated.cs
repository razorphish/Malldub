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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="FundTeamMember")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class FundTeamMember : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new FundTeamMember object.
        /// </summary>
        /// <param name="fundTeamId">Initial value of the FundTeamId property.</param>
        /// <param name="userId">Initial value of the UserId property.</param>
        /// <param name="dateCreated">Initial value of the DateCreated property.</param>
        /// <param name="roleId">Initial value of the RoleId property.</param>
        public static FundTeamMember CreateFundTeamMember(global::System.Int32 fundTeamId, global::System.String userId, global::System.DateTime dateCreated, global::System.String roleId)
        {
            FundTeamMember fundTeamMember = new FundTeamMember();
            fundTeamMember.FundTeamId = fundTeamId;
            fundTeamMember.UserId = userId;
            fundTeamMember.DateCreated = dateCreated;
            fundTeamMember.RoleId = roleId;

            return fundTeamMember;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 FundTeamId
        {
            get
            {
                return _fundTeamId;
            }
            set
            {
                if (_fundTeamId != value)
                {
                    OnFundTeamIdChanging(value);
                    ReportPropertyChanging("FundTeamId");
                    _fundTeamId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("FundTeamId");
                    OnFundTeamIdChanged();
                }
            }
        }

        private global::System.Int32 _fundTeamId;
        partial void OnFundTeamIdChanging(global::System.Int32 value);
        partial void OnFundTeamIdChanged();

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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.DateTime DateCreated
        {
            get
            {
                return _dateCreated;
            }
            set
            {
                if (_dateCreated != value)
                {
                    OnDateCreatedChanging(value);
                    ReportPropertyChanging("DateCreated");
                    _dateCreated = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DateCreated");
                    OnDateCreatedChanged();
                }
            }
        }

        private global::System.DateTime _dateCreated;
        partial void OnDateCreatedChanging(global::System.DateTime value);
        partial void OnDateCreatedChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String RoleId
        {
            get
            {
                return _roleId;
            }
            set
            {
                if (_roleId != value)
                {
                    OnRoleIdChanging(value);
                    ReportPropertyChanging("RoleId");
                    _roleId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("RoleId");
                    OnRoleIdChanged();
                }
            }
        }

        private global::System.String _roleId;
        partial void OnRoleIdChanging(global::System.String value);
        partial void OnRoleIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Int32? FundId
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

        private global::System.Int32? _fundId;
        partial void OnFundIdChanging(global::System.Int32? value);
        partial void OnFundIdChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeamMember_AspNetUser", "AspNetUser")]
        public AspNetUser AspNetUser
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundTeamMember_AspNetUser", "AspNetUser").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundTeamMember_AspNetUser", "AspNetUser").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUser> AspNetUserReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_FundTeamMember_AspNetUser", "AspNetUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUser>("Malldub.Data.FK_FundTeamMember_AspNetUser", "AspNetUser", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeamMember_FundTeam", "FundTeam")]
        public FundTeam FundTeam
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeam>("Malldub.Data.FK_FundTeamMember_FundTeam", "FundTeam").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeam>("Malldub.Data.FK_FundTeamMember_FundTeam", "FundTeam").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<FundTeam> FundTeamReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeam>("Malldub.Data.FK_FundTeamMember_FundTeam", "FundTeam");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<FundTeam>("Malldub.Data.FK_FundTeamMember_FundTeam", "FundTeam", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeamMember_FundTeamMemberRole", "FundTeamMemberRole")]
        public FundTeamMemberRole FundTeamMemberRole
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeamMemberRole>("Malldub.Data.FK_FundTeamMember_FundTeamMemberRole", "FundTeamMemberRole").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeamMemberRole>("Malldub.Data.FK_FundTeamMember_FundTeamMemberRole", "FundTeamMemberRole").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<FundTeamMemberRole> FundTeamMemberRoleReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundTeamMemberRole>("Malldub.Data.FK_FundTeamMember_FundTeamMemberRole", "FundTeamMemberRole");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<FundTeamMemberRole>("Malldub.Data.FK_FundTeamMember_FundTeamMemberRole", "FundTeamMemberRole", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeamMember_Fund", "Fund")]
        public Fund Fund
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundTeamMember_Fund", "Fund").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundTeamMember_Fund", "Fund").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Fund> FundReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_FundTeamMember_Fund", "Fund");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Fund>("Malldub.Data.FK_FundTeamMember_Fund", "Fund", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591