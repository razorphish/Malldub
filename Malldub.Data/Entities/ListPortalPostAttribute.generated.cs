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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="ListPortalPostAttribute")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class ListPortalPostAttribute : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new ListPortalPostAttribute object.
        /// </summary>
        /// <param name="postFieldId">Initial value of the PostFieldId property.</param>
        /// <param name="listPortalPostId">Initial value of the ListPortalPostId property.</param>
        public static ListPortalPostAttribute CreateListPortalPostAttribute(global::System.Int32 postFieldId, global::System.Int32 listPortalPostId)
        {
            ListPortalPostAttribute listPortalPostAttribute = new ListPortalPostAttribute();
            listPortalPostAttribute.PostFieldId = postFieldId;
            listPortalPostAttribute.ListPortalPostId = listPortalPostId;

            return listPortalPostAttribute;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 PostFieldId
        {
            get
            {
                return _postFieldId;
            }
            set
            {
                if (_postFieldId != value)
                {
                    OnPostFieldIdChanging(value);
                    ReportPropertyChanging("PostFieldId");
                    _postFieldId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("PostFieldId");
                    OnPostFieldIdChanged();
                }
            }
        }

        private global::System.Int32 _postFieldId;
        partial void OnPostFieldIdChanging(global::System.Int32 value);
        partial void OnPostFieldIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ListPortalPostId
        {
            get
            {
                return _listPortalPostId;
            }
            set
            {
                if (_listPortalPostId != value)
                {
                    OnListPortalPostIdChanging(value);
                    ReportPropertyChanging("ListPortalPostId");
                    _listPortalPostId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ListPortalPostId");
                    OnListPortalPostIdChanged();
                }
            }
        }

        private global::System.Int32 _listPortalPostId;
        partial void OnListPortalPostIdChanging(global::System.Int32 value);
        partial void OnListPortalPostIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String FieldContent
        {
            get
            {
                return _fieldContent;
            }
            set
            {
                if (_fieldContent != value)
                {
                    OnFieldContentChanging(value);
                    ReportPropertyChanging("FieldContent");
                    _fieldContent = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("FieldContent");
                    OnFieldContentChanged();
                }
            }
        }

        private global::System.String _fieldContent;
        partial void OnFieldContentChanging(global::System.String value);
        partial void OnFieldContentChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ListPortalPostAttribute_PostField", "PostField")]
        public PostField PostField
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PostField>("Malldub.Data.FK_ListPortalPostAttribute_PostField", "PostField").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PostField>("Malldub.Data.FK_ListPortalPostAttribute_PostField", "PostField").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<PostField> PostFieldReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<PostField>("Malldub.Data.FK_ListPortalPostAttribute_PostField", "PostField");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<PostField>("Malldub.Data.FK_ListPortalPostAttribute_PostField", "PostField", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ListPostAttribute_ListPost", "ListPost")]
        public ListPost ListPost
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPostAttribute_ListPost", "ListPost").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPostAttribute_ListPost", "ListPost").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<ListPost> ListPostReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPostAttribute_ListPost", "ListPost");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<ListPost>("Malldub.Data.FK_ListPostAttribute_ListPost", "ListPost", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591