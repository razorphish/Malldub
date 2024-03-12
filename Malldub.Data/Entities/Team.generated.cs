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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="Team")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class Team : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new Team object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="name">Initial value of the Name property.</param>
        /// <param name="dateEntered">Initial value of the DateEntered property.</param>
        public static Team CreateTeam(global::System.Int32 identification, global::System.String name, global::System.DateTime dateEntered)
        {
            Team team = new Team();
            team.Identification = identification;
            team.Name = name;
            team.DateEntered = dateEntered;

            return team;
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
        public global::System.String Name
        {
            get
            {
                return _name;
            }
            set
            {
                if (_name != value)
                {
                    OnNameChanging(value);
                    ReportPropertyChanging("Name");
                    _name = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Name");
                    OnNameChanged();
                }
            }
        }

        private global::System.String _name;
        partial void OnNameChanging(global::System.String value);
        partial void OnNameChanged();

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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundTeam_Team", "FundTeam")]
        public EntityCollection<FundTeam> FundTeamList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<FundTeam>("Malldub.Data.FK_FundTeam_Team", "FundTeam");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<FundTeam>("Malldub.Data.FK_FundTeam_Team", "FundTeam", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591