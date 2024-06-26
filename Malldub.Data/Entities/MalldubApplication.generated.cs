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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="MalldubApplication")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class MalldubApplication : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new MalldubApplication object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="name">Initial value of the Name property.</param>
        /// <param name="description">Initial value of the Description property.</param>
        public static MalldubApplication CreateMalldubApplication(global::System.String identification, global::System.String name, global::System.String description)
        {
            MalldubApplication malldubApplication = new MalldubApplication();
            malldubApplication.Identification = identification;
            malldubApplication.Name = name;
            malldubApplication.Description = description;

            return malldubApplication;
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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Note_MalldubApplication", "Note")]
        public EntityCollection<Note> NoteList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Note>("Malldub.Data.FK_Note_MalldubApplication", "Note");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Note>("Malldub.Data.FK_Note_MalldubApplication", "Note", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591