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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="Item")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class Item : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new Item object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="userId">Initial value of the UserId property.</param>
        /// <param name="typeId">Initial value of the TypeId property.</param>
        /// <param name="title">Initial value of the Title property.</param>
        /// <param name="description">Initial value of the Description property.</param>
        /// <param name="featured">Initial value of the Featured property.</param>
        public static Item CreateItem(global::System.Int32 identification, global::System.String userId, global::System.String typeId, global::System.String title, global::System.String description, global::System.Boolean featured)
        {
            Item item = new Item();
            item.Identification = identification;
            item.UserId = userId;
            item.TypeId = typeId;
            item.Title = title;
            item.Description = description;
            item.Featured = featured;

            return item;
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
        public global::System.String TransactionTypeId
        {
            get
            {
                return _transactionTypeId;
            }
            set
            {
                if (_transactionTypeId != value)
                {
                    OnTransactionTypeIdChanging(value);
                    ReportPropertyChanging("TransactionTypeId");
                    _transactionTypeId = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("TransactionTypeId");
                    OnTransactionTypeIdChanged();
                }
            }
        }

        private global::System.String _transactionTypeId;
        partial void OnTransactionTypeIdChanging(global::System.String value);
        partial void OnTransactionTypeIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String Title
        {
            get
            {
                return _title;
            }
            set
            {
                if (_title != value)
                {
                    OnTitleChanging(value);
                    ReportPropertyChanging("Title");
                    _title = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("Title");
                    OnTitleChanged();
                }
            }
        }

        private global::System.String _title;
        partial void OnTitleChanging(global::System.String value);
        partial void OnTitleChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String ShortSummary
        {
            get
            {
                return _shortSummary;
            }
            set
            {
                if (_shortSummary != value)
                {
                    OnShortSummaryChanging(value);
                    ReportPropertyChanging("ShortSummary");
                    _shortSummary = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("ShortSummary");
                    OnShortSummaryChanged();
                }
            }
        }

        private global::System.String _shortSummary;
        partial void OnShortSummaryChanging(global::System.String value);
        partial void OnShortSummaryChanged();

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
        public global::System.DateTime? StartDate
        {
            get
            {
                return _startDate;
            }
            set
            {
                if (_startDate != value)
                {
                    OnStartDateChanging(value);
                    ReportPropertyChanging("StartDate");
                    _startDate = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("StartDate");
                    OnStartDateChanged();
                }
            }
        }

        private global::System.DateTime? _startDate;
        partial void OnStartDateChanging(global::System.DateTime? value);
        partial void OnStartDateChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.DateTime? EndDate
        {
            get
            {
                return _endDate;
            }
            set
            {
                if (_endDate != value)
                {
                    OnEndDateChanging(value);
                    ReportPropertyChanging("EndDate");
                    _endDate = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("EndDate");
                    OnEndDateChanged();
                }
            }
        }

        private global::System.DateTime? _endDate;
        partial void OnEndDateChanging(global::System.DateTime? value);
        partial void OnEndDateChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Permalink
        {
            get
            {
                return _permalink;
            }
            set
            {
                if (_permalink != value)
                {
                    OnPermalinkChanging(value);
                    ReportPropertyChanging("Permalink");
                    _permalink = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Permalink");
                    OnPermalinkChanged();
                }
            }
        }

        private global::System.String _permalink;
        partial void OnPermalinkChanging(global::System.String value);
        partial void OnPermalinkChanged();

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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.DateTime? DateUpdated
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

        private global::System.DateTime? _dateUpdated;
        partial void OnDateUpdatedChanging(global::System.DateTime? value);
        partial void OnDateUpdatedChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean Featured
        {
            get
            {
                return _featured;
            }
            set
            {
                if (_featured != value)
                {
                    OnFeaturedChanging(value);
                    ReportPropertyChanging("Featured");
                    _featured = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Featured");
                    OnFeaturedChanged();
                }
            }
        }

        private global::System.Boolean _featured;
        partial void OnFeaturedChanging(global::System.Boolean value);
        partial void OnFeaturedChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
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
                    _statusId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("StatusId");
                    OnStatusIdChanged();
                }
            }
        }

        private global::System.String _statusId;
        partial void OnStatusIdChanging(global::System.String value);
        partial void OnStatusIdChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Item_ItemTransactionType", "ItemTransactionType")]
        public ItemTransactionType ItemTransactionType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemTransactionType>("Malldub.Data.FK_Item_ItemTransactionType", "ItemTransactionType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemTransactionType>("Malldub.Data.FK_Item_ItemTransactionType", "ItemTransactionType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<ItemTransactionType> ItemTransactionTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemTransactionType>("Malldub.Data.FK_Item_ItemTransactionType", "ItemTransactionType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<ItemTransactionType>("Malldub.Data.FK_Item_ItemTransactionType", "ItemTransactionType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Item_ItemType", "ItemType")]
        public ItemType ItemType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemType>("Malldub.Data.FK_Item_ItemType", "ItemType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemType>("Malldub.Data.FK_Item_ItemType", "ItemType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<ItemType> ItemTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemType>("Malldub.Data.FK_Item_ItemType", "ItemType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<ItemType>("Malldub.Data.FK_Item_ItemType", "ItemType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Item_User", "AspNetUser")]
        public AspNetUser AspNetUser
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_Item_User", "AspNetUser").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_Item_User", "AspNetUser").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUser> AspNetUserReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUser>("Malldub.Data.FK_Item_User", "AspNetUser");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUser>("Malldub.Data.FK_Item_User", "AspNetUser", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Auction_Item", "Auction")]
        public Auction Auction
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_Auction_Item", "Auction").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_Auction_Item", "Auction").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Auction> AuctionReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_Auction_Item", "Auction");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Auction>("Malldub.Data.FK_Auction_Item", "Auction", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AuctionPaymentItem_PaymentItem", "AuctionPaymentItem")]
        public EntityCollection<AuctionPaymentItem> AuctionPaymentItemList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<AuctionPaymentItem>("Malldub.Data.FK_AuctionPaymentItem_PaymentItem", "AuctionPaymentItem");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<AuctionPaymentItem>("Malldub.Data.FK_AuctionPaymentItem_PaymentItem", "AuctionPaymentItem", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Fund_Item", "Fund")]
        public Fund Fund
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_Fund_Item", "Fund").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_Fund_Item", "Fund").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Fund> FundReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Fund>("Malldub.Data.FK_Fund_Item", "Fund");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Fund>("Malldub.Data.FK_Fund_Item", "Fund", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_InvoiceItem_PaymentItem", "InvoiceItem")]
        public EntityCollection<InvoiceItem> InvoiceItemList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<InvoiceItem>("Malldub.Data.FK_InvoiceItem_PaymentItem", "InvoiceItem");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<InvoiceItem>("Malldub.Data.FK_InvoiceItem_PaymentItem", "InvoiceItem", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemCategory_Item", "ItemCategory")]
        public EntityCollection<ItemCategory> ItemCategoryList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<ItemCategory>("Malldub.Data.FK_ItemCategory_Item", "ItemCategory");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<ItemCategory>("Malldub.Data.FK_ItemCategory_Item", "ItemCategory", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemMeta_Item", "ItemMetum")]
        public EntityCollection<ItemMetum> ItemMetumList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<ItemMetum>("Malldub.Data.FK_ItemMeta_Item", "ItemMetum");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<ItemMetum>("Malldub.Data.FK_ItemMeta_Item", "ItemMetum", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemUpload_Item", "ItemUpload")]
        public EntityCollection<ItemUpload> ItemUploadList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<ItemUpload>("Malldub.Data.FK_ItemUpload_Item", "ItemUpload");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<ItemUpload>("Malldub.Data.FK_ItemUpload_Item", "ItemUpload", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ListPost_Item", "ListPost")]
        public ListPost ListPost
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPost_Item", "ListPost").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPost_Item", "ListPost").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<ListPost> ListPostReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ListPost>("Malldub.Data.FK_ListPost_Item", "ListPost");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<ListPost>("Malldub.Data.FK_ListPost_Item", "ListPost", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_OrderItem_Item", "OrderItem")]
        public EntityCollection<OrderItem> OrderItemList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<OrderItem>("Malldub.Data.FK_OrderItem_Item", "OrderItem");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<OrderItem>("Malldub.Data.FK_OrderItem_Item", "OrderItem", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Item_ItemStatus", "ItemStatus")]
        public ItemStatus ItemStatus
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemStatus>("Malldub.Data.FK_Item_ItemStatus", "ItemStatus").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemStatus>("Malldub.Data.FK_Item_ItemStatus", "ItemStatus").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<ItemStatus> ItemStatusReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<ItemStatus>("Malldub.Data.FK_Item_ItemStatus", "ItemStatus");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<ItemStatus>("Malldub.Data.FK_Item_ItemStatus", "ItemStatus", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591