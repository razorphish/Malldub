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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="Note")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class Note : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new Note object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="subject">Initial value of the Subject property.</param>
        /// <param name="comments">Initial value of the Comments property.</param>
        /// <param name="sent">Initial value of the Sent property.</param>
        /// <param name="isPrivate">Initial value of the IsPrivate property.</param>
        /// <param name="typeId">Initial value of the TypeId property.</param>
        /// <param name="applicationId">Initial value of the ApplicationId property.</param>
        /// <param name="viewed">Initial value of the Viewed property.</param>
        public static Note CreateNote(global::System.Int32 identification, global::System.String subject, global::System.String comments, global::System.Boolean sent, global::System.Boolean isPrivate, global::System.String typeId, global::System.String applicationId, global::System.Boolean viewed)
        {
            Note note = new Note();
            note.Identification = identification;
            note.Subject = subject;
            note.Comments = comments;
            note.Sent = sent;
            note.IsPrivate = isPrivate;
            note.TypeId = typeId;
            note.ApplicationId = applicationId;
            note.Viewed = viewed;

            return note;
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
        public global::System.String Subject
        {
            get
            {
                return _subject;
            }
            set
            {
                if (_subject != value)
                {
                    OnSubjectChanging(value);
                    ReportPropertyChanging("Subject");
                    _subject = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Subject");
                    OnSubjectChanged();
                }
            }
        }

        private global::System.String _subject;
        partial void OnSubjectChanging(global::System.String value);
        partial void OnSubjectChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Comments
        {
            get
            {
                return _comments;
            }
            set
            {
                if (_comments != value)
                {
                    OnCommentsChanging(value);
                    ReportPropertyChanging("Comments");
                    _comments = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Comments");
                    OnCommentsChanged();
                }
            }
        }

        private global::System.String _comments;
        partial void OnCommentsChanging(global::System.String value);
        partial void OnCommentsChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean Sent
        {
            get
            {
                return _sent;
            }
            set
            {
                if (_sent != value)
                {
                    OnSentChanging(value);
                    ReportPropertyChanging("Sent");
                    _sent = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Sent");
                    OnSentChanged();
                }
            }
        }

        private global::System.Boolean _sent;
        partial void OnSentChanging(global::System.Boolean value);
        partial void OnSentChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean IsPrivate
        {
            get
            {
                return _isPrivate;
            }
            set
            {
                if (_isPrivate != value)
                {
                    OnIsPrivateChanging(value);
                    ReportPropertyChanging("IsPrivate");
                    _isPrivate = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("IsPrivate");
                    OnIsPrivateChanged();
                }
            }
        }

        private global::System.Boolean _isPrivate;
        partial void OnIsPrivateChanging(global::System.Boolean value);
        partial void OnIsPrivateChanged();

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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String ApplicationId
        {
            get
            {
                return _applicationId;
            }
            set
            {
                if (_applicationId != value)
                {
                    OnApplicationIdChanging(value);
                    ReportPropertyChanging("ApplicationId");
                    _applicationId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("ApplicationId");
                    OnApplicationIdChanged();
                }
            }
        }

        private global::System.String _applicationId;
        partial void OnApplicationIdChanging(global::System.String value);
        partial void OnApplicationIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean Viewed
        {
            get
            {
                return _viewed;
            }
            set
            {
                if (_viewed != value)
                {
                    OnViewedChanging(value);
                    ReportPropertyChanging("Viewed");
                    _viewed = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Viewed");
                    OnViewedChanged();
                }
            }
        }

        private global::System.Boolean _viewed;
        partial void OnViewedChanging(global::System.Boolean value);
        partial void OnViewedChanged();

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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Note_MalldubApplication", "MalldubApplication")]
        public MalldubApplication MalldubApplication
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MalldubApplication>("Malldub.Data.FK_Note_MalldubApplication", "MalldubApplication").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MalldubApplication>("Malldub.Data.FK_Note_MalldubApplication", "MalldubApplication").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<MalldubApplication> MalldubApplicationReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MalldubApplication>("Malldub.Data.FK_Note_MalldubApplication", "MalldubApplication");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<MalldubApplication>("Malldub.Data.FK_Note_MalldubApplication", "MalldubApplication", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Note_NoteType", "NoteType")]
        public NoteType NoteType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<NoteType>("Malldub.Data.FK_Note_NoteType", "NoteType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<NoteType>("Malldub.Data.FK_Note_NoteType", "NoteType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<NoteType> NoteTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<NoteType>("Malldub.Data.FK_Note_NoteType", "NoteType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<NoteType>("Malldub.Data.FK_Note_NoteType", "NoteType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_FundNote_Note", "FundNote")]
        public FundNote FundNote
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundNote>("Malldub.Data.FK_FundNote_Note", "FundNote").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundNote>("Malldub.Data.FK_FundNote_Note", "FundNote").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<FundNote> FundNoteReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<FundNote>("Malldub.Data.FK_FundNote_Note", "FundNote");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<FundNote>("Malldub.Data.FK_FundNote_Note", "FundNote", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591