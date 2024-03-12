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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="AuctionInvoice")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class AuctionInvoice : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new AuctionInvoice object.
        /// </summary>
        /// <param name="auctionId">Initial value of the AuctionId property.</param>
        /// <param name="invoiceId">Initial value of the InvoiceId property.</param>
        /// <param name="clientIdReceivable">Initial value of the ClientIdReceivable property.</param>
        /// <param name="typeId">Initial value of the TypeId property.</param>
        /// <param name="systemInvoice">Initial value of the SystemInvoice property.</param>
        public static AuctionInvoice CreateAuctionInvoice(global::System.Int32 auctionId, global::System.Int32 invoiceId, global::System.Int32 clientIdReceivable, global::System.Int32 typeId, global::System.Boolean systemInvoice)
        {
            AuctionInvoice auctionInvoice = new AuctionInvoice();
            auctionInvoice.AuctionId = auctionId;
            auctionInvoice.InvoiceId = invoiceId;
            auctionInvoice.ClientIdReceivable = clientIdReceivable;
            auctionInvoice.TypeId = typeId;
            auctionInvoice.SystemInvoice = systemInvoice;

            return auctionInvoice;
        }

        #endregion

        #region Primitive Properties

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 AuctionId
        {
            get
            {
                return _auctionId;
            }
            set
            {
                if (_auctionId != value)
                {
                    OnAuctionIdChanging(value);
                    ReportPropertyChanging("AuctionId");
                    _auctionId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("AuctionId");
                    OnAuctionIdChanged();
                }
            }
        }

        private global::System.Int32 _auctionId;
        partial void OnAuctionIdChanging(global::System.Int32 value);
        partial void OnAuctionIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Int32? ClientIdPayable
        {
            get
            {
                return _clientIdPayable;
            }
            set
            {
                if (_clientIdPayable != value)
                {
                    OnClientIdPayableChanging(value);
                    ReportPropertyChanging("ClientIdPayable");
                    _clientIdPayable = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ClientIdPayable");
                    OnClientIdPayableChanged();
                }
            }
        }

        private global::System.Int32? _clientIdPayable;
        partial void OnClientIdPayableChanging(global::System.Int32? value);
        partial void OnClientIdPayableChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ClientIdReceivable
        {
            get
            {
                return _clientIdReceivable;
            }
            set
            {
                if (_clientIdReceivable != value)
                {
                    OnClientIdReceivableChanging(value);
                    ReportPropertyChanging("ClientIdReceivable");
                    _clientIdReceivable = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ClientIdReceivable");
                    OnClientIdReceivableChanged();
                }
            }
        }

        private global::System.Int32 _clientIdReceivable;
        partial void OnClientIdReceivableChanging(global::System.Int32 value);
        partial void OnClientIdReceivableChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 TypeId
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
                    _typeId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("TypeId");
                    OnTypeIdChanged();
                }
            }
        }

        private global::System.Int32 _typeId;
        partial void OnTypeIdChanging(global::System.Int32 value);
        partial void OnTypeIdChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Boolean SystemInvoice
        {
            get
            {
                return _systemInvoice;
            }
            set
            {
                if (_systemInvoice != value)
                {
                    OnSystemInvoiceChanging(value);
                    ReportPropertyChanging("SystemInvoice");
                    _systemInvoice = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("SystemInvoice");
                    OnSystemInvoiceChanged();
                }
            }
        }

        private global::System.Boolean _systemInvoice;
        partial void OnSystemInvoiceChanging(global::System.Boolean value);
        partial void OnSystemInvoiceChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Int32? BillToTypeId
        {
            get
            {
                return _billToTypeId;
            }
            set
            {
                if (_billToTypeId != value)
                {
                    OnBillToTypeIdChanging(value);
                    ReportPropertyChanging("BillToTypeId");
                    _billToTypeId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("BillToTypeId");
                    OnBillToTypeIdChanged();
                }
            }
        }

        private global::System.Int32? _billToTypeId;
        partial void OnBillToTypeIdChanging(global::System.Int32? value);
        partial void OnBillToTypeIdChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AuctionInvoice_Auction", "Auction")]
        public Auction Auction
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_AuctionInvoice_Auction", "Auction").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_AuctionInvoice_Auction", "Auction").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Auction> AuctionReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Auction>("Malldub.Data.FK_AuctionInvoice_Auction", "Auction");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Auction>("Malldub.Data.FK_AuctionInvoice_Auction", "Auction", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AuctionInvoice_AuctionInvoiceBillToType", "AuctionInvoiceBillToType")]
        public AuctionInvoiceBillToType AuctionInvoiceBillToType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceBillToType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceBillToType", "AuctionInvoiceBillToType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceBillToType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceBillToType", "AuctionInvoiceBillToType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AuctionInvoiceBillToType> AuctionInvoiceBillToTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceBillToType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceBillToType", "AuctionInvoiceBillToType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AuctionInvoiceBillToType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceBillToType", "AuctionInvoiceBillToType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AuctionInvoice_AuctionInvoiceType", "AuctionInvoiceType")]
        public AuctionInvoiceType AuctionInvoiceType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceType", "AuctionInvoiceType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceType", "AuctionInvoiceType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AuctionInvoiceType> AuctionInvoiceTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AuctionInvoiceType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceType", "AuctionInvoiceType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AuctionInvoiceType>("Malldub.Data.FK_AuctionInvoice_AuctionInvoiceType", "AuctionInvoiceType", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AuctionInvoice_Invoice", "Invoice")]
        public Invoice Invoice
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_AuctionInvoice_Invoice", "Invoice").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_AuctionInvoice_Invoice", "Invoice").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Invoice> InvoiceReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Invoice>("Malldub.Data.FK_AuctionInvoice_Invoice", "Invoice");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Invoice>("Malldub.Data.FK_AuctionInvoice_Invoice", "Invoice", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591