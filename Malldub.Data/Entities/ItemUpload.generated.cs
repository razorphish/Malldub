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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="ItemUpload")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class ItemUpload : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new ItemUpload object.
        /// </summary>
        /// <param name="itemId">Initial value of the ItemId property.</param>
        /// <param name="uploadId">Initial value of the UploadId property.</param>
        public static ItemUpload CreateItemUpload(global::System.Int32 itemId, global::System.Int32 uploadId)
        {
            ItemUpload itemUpload = new ItemUpload();
            itemUpload.ItemId = itemId;
            itemUpload.UploadId = uploadId;

            return itemUpload;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ItemId
        {
            get
            {
                return _itemId;
            }
            set
            {
                if (_itemId != value)
                {
                    OnItemIdChanging(value);
                    ReportPropertyChanging("ItemId");
                    _itemId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ItemId");
                    OnItemIdChanged();
                }
            }
        }

        private global::System.Int32 _itemId;
        partial void OnItemIdChanging(global::System.Int32 value);
        partial void OnItemIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 UploadId
        {
            get
            {
                return _uploadId;
            }
            set
            {
                if (_uploadId != value)
                {
                    OnUploadIdChanging(value);
                    ReportPropertyChanging("UploadId");
                    _uploadId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("UploadId");
                    OnUploadIdChanged();
                }
            }
        }

        private global::System.Int32 _uploadId;
        partial void OnUploadIdChanging(global::System.Int32 value);
        partial void OnUploadIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Boolean? IsDefault
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

        private global::System.Boolean? _isDefault;
        partial void OnIsDefaultChanging(global::System.Boolean? value);
        partial void OnIsDefaultChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 SortOrder
        {
            get
            {
                return _sortOrder;
            }
            set
            {
                if (_sortOrder != value)
                {
                    OnSortOrderChanging(value);
                    ReportPropertyChanging("SortOrder");
                    _sortOrder = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("SortOrder");
                    OnSortOrderChanged();
                }
            }
        }

        private global::System.Int32 _sortOrder;
        partial void OnSortOrderChanging(global::System.Int32 value);
        partial void OnSortOrderChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemUpload_Item", "Item")]
        public Item Item
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemUpload_Item", "Item").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemUpload_Item", "Item").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Item> ItemReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemUpload_Item", "Item");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Item>("Malldub.Data.FK_ItemUpload_Item", "Item", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemUpload_Upload", "Upload")]
        public Upload Upload
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_ItemUpload_Upload", "Upload").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_ItemUpload_Upload", "Upload").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Upload> UploadReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Upload>("Malldub.Data.FK_ItemUpload_Upload", "Upload");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Upload>("Malldub.Data.FK_ItemUpload_Upload", "Upload", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591