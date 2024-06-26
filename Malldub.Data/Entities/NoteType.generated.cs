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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="NoteType")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class NoteType : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new NoteType object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="description">Initial value of the Description property.</param>
        /// <param name="sortOrderNumber">Initial value of the SortOrderNumber property.</param>
        public static NoteType CreateNoteType(global::System.String identification, global::System.String description, global::System.Byte sortOrderNumber)
        {
            NoteType noteType = new NoteType();
            noteType.Identification = identification;
            noteType.Description = description;
            noteType.SortOrderNumber = sortOrderNumber;

            return noteType;
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
        public global::System.String Details
        {
            get
            {
                return _details;
            }
            set
            {
                if (_details != value)
                {
                    OnDetailsChanging(value);
                    ReportPropertyChanging("Details");
                    _details = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Details");
                    OnDetailsChanged();
                }
            }
        }

        private global::System.String _details;
        partial void OnDetailsChanging(global::System.String value);
        partial void OnDetailsChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Byte SortOrderNumber
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

        private global::System.Byte _sortOrderNumber;
        partial void OnSortOrderNumberChanging(global::System.Byte value);
        partial void OnSortOrderNumberChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Note_NoteType", "Note")]
        public EntityCollection<Note> NoteList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Note>("Malldub.Data.FK_Note_NoteType", "Note");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Note>("Malldub.Data.FK_Note_NoteType", "Note", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591