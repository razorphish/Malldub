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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="ItemMetum")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class ItemMetum : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new ItemMetum object.
        /// </summary>
        /// <param name="itemId">Initial value of the ItemId property.</param>
        /// <param name="metaKeyId">Initial value of the MetaKeyId property.</param>
        public static ItemMetum CreateItemMetum(global::System.Int32 itemId, global::System.String metaKeyId)
        {
            ItemMetum itemMetum = new ItemMetum();
            itemMetum.ItemId = itemId;
            itemMetum.MetaKeyId = metaKeyId;

            return itemMetum;
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
        public global::System.String MetaKeyId
        {
            get
            {
                return _metaKeyId;
            }
            set
            {
                if (_metaKeyId != value)
                {
                    OnMetaKeyIdChanging(value);
                    ReportPropertyChanging("MetaKeyId");
                    _metaKeyId = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("MetaKeyId");
                    OnMetaKeyIdChanged();
                }
            }
        }

        private global::System.String _metaKeyId;
        partial void OnMetaKeyIdChanging(global::System.String value);
        partial void OnMetaKeyIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String StringValue
        {
            get
            {
                return _stringValue;
            }
            set
            {
                if (_stringValue != value)
                {
                    OnStringValueChanging(value);
                    ReportPropertyChanging("StringValue");
                    _stringValue = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("StringValue");
                    OnStringValueChanged();
                }
            }
        }

        private global::System.String _stringValue;
        partial void OnStringValueChanging(global::System.String value);
        partial void OnStringValueChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Decimal? NumericValue
        {
            get
            {
                return _numericValue;
            }
            set
            {
                if (_numericValue != value)
                {
                    OnNumericValueChanging(value);
                    ReportPropertyChanging("NumericValue");
                    _numericValue = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("NumericValue");
                    OnNumericValueChanged();
                }
            }
        }

        private global::System.Decimal? _numericValue;
        partial void OnNumericValueChanging(global::System.Decimal? value);
        partial void OnNumericValueChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.DateTime? DateValue
        {
            get
            {
                return _dateValue;
            }
            set
            {
                if (_dateValue != value)
                {
                    OnDateValueChanging(value);
                    ReportPropertyChanging("DateValue");
                    _dateValue = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DateValue");
                    OnDateValueChanged();
                }
            }
        }

        private global::System.DateTime? _dateValue;
        partial void OnDateValueChanging(global::System.DateTime? value);
        partial void OnDateValueChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String XmlDom
        {
            get
            {
                return _xmlDom;
            }
            set
            {
                if (_xmlDom != value)
                {
                    OnXmlDomChanging(value);
                    ReportPropertyChanging("XmlDom");
                    _xmlDom = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("XmlDom");
                    OnXmlDomChanged();
                }
            }
        }

        private global::System.String _xmlDom;
        partial void OnXmlDomChanging(global::System.String value);
        partial void OnXmlDomChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_ItemMeta_Item", "Item")]
        public Item Item
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemMeta_Item", "Item").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemMeta_Item", "Item").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Item> ItemReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_ItemMeta_Item", "Item");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Item>("Malldub.Data.FK_ItemMeta_Item", "Item", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_RealEstateMeta_MetaKey", "MetaKey")]
        public MetaKey MetaKey
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MetaKey>("Malldub.Data.FK_RealEstateMeta_MetaKey", "MetaKey").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MetaKey>("Malldub.Data.FK_RealEstateMeta_MetaKey", "MetaKey").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<MetaKey> MetaKeyReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<MetaKey>("Malldub.Data.FK_RealEstateMeta_MetaKey", "MetaKey");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<MetaKey>("Malldub.Data.FK_RealEstateMeta_MetaKey", "MetaKey", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591