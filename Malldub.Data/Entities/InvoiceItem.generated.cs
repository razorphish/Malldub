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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="InvoiceItem")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class InvoiceItem : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new InvoiceItem object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="invoiceId">Initial value of the InvoiceId property.</param>
        /// <param name="paymentItemId">Initial value of the PaymentItemId property.</param>
        /// <param name="quantity">Initial value of the Quantity property.</param>
        /// <param name="amount">Initial value of the Amount property.</param>
        public static InvoiceItem CreateInvoiceItem(global::System.Int32 identification, global::System.Int32 invoiceId, global::System.Int32 paymentItemId, global::System.Byte quantity, global::System.Decimal amount)
        {
            InvoiceItem invoiceItem = new InvoiceItem();
            invoiceItem.Identification = identification;
            invoiceItem.InvoiceId = invoiceId;
            invoiceItem.PaymentItemId = paymentItemId;
            invoiceItem.Quantity = quantity;
            invoiceItem.Amount = amount;

            return invoiceItem;
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
        public global::System.Int32 InvoiceId
        {
            get
            {
                return _invoiceId;
            }
            set
            {
                if (_invoiceId != value)
                {
                    OnInvoiceIdChanging(value);
                    ReportPropertyChanging("InvoiceId");
                    _invoiceId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("InvoiceId");
                    OnInvoiceIdChanged();
                }
            }
        }

        private global::System.Int32 _invoiceId;
        partial void OnInvoiceIdChanging(global::System.Int32 value);
        partial void OnInvoiceIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 PaymentItemId
        {
            get
            {
                return _paymentItemId;
            }
            set
            {
                if (_paymentItemId != value)
                {
                    OnPaymentItemIdChanging(value);
                    ReportPropertyChanging("PaymentItemId");
                    _paymentItemId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("PaymentItemId");
                    OnPaymentItemIdChanged();
                }
            }
        }

        private global::System.Int32 _paymentItemId;
        partial void OnPaymentItemIdChanging(global::System.Int32 value);
        partial void OnPaymentItemIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Byte Quantity
        {
            get
            {
                return _quantity;
            }
            set
            {
                if (_quantity != value)
                {
                    OnQuantityChanging(value);
                    ReportPropertyChanging("Quantity");
                    _quantity = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Quantity");
                    OnQuantityChanged();
                }
            }
        }

        private global::System.Byte _quantity;
        partial void OnQuantityChanging(global::System.Byte value);
        partial void OnQuantityChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Decimal Amount
        {
            get
            {
                return _amount;
            }
            set
            {
                if (_amount != value)
                {
                    OnAmountChanging(value);
                    ReportPropertyChanging("Amount");
                    _amount = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Amount");
                    OnAmountChanged();
                }
            }
        }

        private global::System.Decimal _amount;
        partial void OnAmountChanging(global::System.Decimal value);
        partial void OnAmountChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Decimal? DiscountValue
        {
            get
            {
                return _discountValue;
            }
            set
            {
                if (_discountValue != value)
                {
                    OnDiscountValueChanging(value);
                    ReportPropertyChanging("DiscountValue");
                    _discountValue = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DiscountValue");
                    OnDiscountValueChanged();
                }
            }
        }

        private global::System.Decimal? _discountValue;
        partial void OnDiscountValueChanging(global::System.Decimal? value);
        partial void OnDiscountValueChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Byte? DiscountPercentage
        {
            get
            {
                return _discountPercentage;
            }
            set
            {
                if (_discountPercentage != value)
                {
                    OnDiscountPercentageChanging(value);
                    ReportPropertyChanging("DiscountPercentage");
                    _discountPercentage = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("DiscountPercentage");
                    OnDiscountPercentageChanged();
                }
            }
        }

        private global::System.Byte? _discountPercentage;
        partial void OnDiscountPercentageChanging(global::System.Byte? value);
        partial void OnDiscountPercentageChanged();

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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_InvoiceItem_Invoice", "Invoice")]
        public Invoice Invoice
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_InvoiceItem_Invoice", "Invoice").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_InvoiceItem_Invoice", "Invoice").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Invoice> InvoiceReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_InvoiceItem_Invoice", "Invoice");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Invoice>("Malldub.Data.FK_InvoiceItem_Invoice", "Invoice", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_InvoiceItem_PaymentItem", "Item")]
        public Item Item
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_InvoiceItem_PaymentItem", "Item").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_InvoiceItem_PaymentItem", "Item").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Item> ItemReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Item>("Malldub.Data.FK_InvoiceItem_PaymentItem", "Item");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Item>("Malldub.Data.FK_InvoiceItem_PaymentItem", "Item", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591