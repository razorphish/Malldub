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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="Geo")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class Geo : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new Geo object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        public static Geo CreateGeo(global::System.Int32 identification)
        {
            Geo geo = new Geo();
            geo.Identification = identification;

            return geo;
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

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Alias
        {
            get
            {
                return _alias;
            }
            set
            {
                if (_alias != value)
                {
                    OnAliasChanging(value);
                    ReportPropertyChanging("Alias");
                    _alias = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Alias");
                    OnAliasChanged();
                }
            }
        }

        private global::System.String _alias;
        partial void OnAliasChanging(global::System.String value);
        partial void OnAliasChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String City
        {
            get
            {
                return _city;
            }
            set
            {
                if (_city != value)
                {
                    OnCityChanging(value);
                    ReportPropertyChanging("City");
                    _city = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("City");
                    OnCityChanged();
                }
            }
        }

        private global::System.String _city;
        partial void OnCityChanging(global::System.String value);
        partial void OnCityChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String CountryCode
        {
            get
            {
                return _countryCode;
            }
            set
            {
                if (_countryCode != value)
                {
                    OnCountryCodeChanging(value);
                    ReportPropertyChanging("CountryCode");
                    _countryCode = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("CountryCode");
                    OnCountryCodeChanged();
                }
            }
        }

        private global::System.String _countryCode;
        partial void OnCountryCodeChanging(global::System.String value);
        partial void OnCountryCodeChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Isp
        {
            get
            {
                return _isp;
            }
            set
            {
                if (_isp != value)
                {
                    OnIspChanging(value);
                    ReportPropertyChanging("Isp");
                    _isp = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Isp");
                    OnIspChanged();
                }
            }
        }

        private global::System.String _isp;
        partial void OnIspChanging(global::System.String value);
        partial void OnIspChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Decimal? Latitude
        {
            get
            {
                return _latitude;
            }
            set
            {
                if (_latitude != value)
                {
                    OnLatitudeChanging(value);
                    ReportPropertyChanging("Latitude");
                    _latitude = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Latitude");
                    OnLatitudeChanged();
                }
            }
        }

        private global::System.Decimal? _latitude;
        partial void OnLatitudeChanging(global::System.Decimal? value);
        partial void OnLatitudeChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Decimal? Longitude
        {
            get
            {
                return _longitude;
            }
            set
            {
                if (_longitude != value)
                {
                    OnLongitudeChanging(value);
                    ReportPropertyChanging("Longitude");
                    _longitude = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("Longitude");
                    OnLongitudeChanged();
                }
            }
        }

        private global::System.Decimal? _longitude;
        partial void OnLongitudeChanging(global::System.Decimal? value);
        partial void OnLongitudeChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String IpAddress
        {
            get
            {
                return _ipAddress;
            }
            set
            {
                if (_ipAddress != value)
                {
                    OnIpAddressChanging(value);
                    ReportPropertyChanging("IpAddress");
                    _ipAddress = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("IpAddress");
                    OnIpAddressChanged();
                }
            }
        }

        private global::System.String _ipAddress;
        partial void OnIpAddressChanging(global::System.String value);
        partial void OnIpAddressChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Region
        {
            get
            {
                return _region;
            }
            set
            {
                if (_region != value)
                {
                    OnRegionChanging(value);
                    ReportPropertyChanging("Region");
                    _region = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Region");
                    OnRegionChanged();
                }
            }
        }

        private global::System.String _region;
        partial void OnRegionChanging(global::System.String value);
        partial void OnRegionChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String RegionName
        {
            get
            {
                return _regionName;
            }
            set
            {
                if (_regionName != value)
                {
                    OnRegionNameChanging(value);
                    ReportPropertyChanging("RegionName");
                    _regionName = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("RegionName");
                    OnRegionNameChanged();
                }
            }
        }

        private global::System.String _regionName;
        partial void OnRegionNameChanging(global::System.String value);
        partial void OnRegionNameChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Status
        {
            get
            {
                return _status;
            }
            set
            {
                if (_status != value)
                {
                    OnStatusChanging(value);
                    ReportPropertyChanging("Status");
                    _status = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Status");
                    OnStatusChanged();
                }
            }
        }

        private global::System.String _status;
        partial void OnStatusChanging(global::System.String value);
        partial void OnStatusChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String TimeZone
        {
            get
            {
                return _timeZone;
            }
            set
            {
                if (_timeZone != value)
                {
                    OnTimeZoneChanging(value);
                    ReportPropertyChanging("TimeZone");
                    _timeZone = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("TimeZone");
                    OnTimeZoneChanged();
                }
            }
        }

        private global::System.String _timeZone;
        partial void OnTimeZoneChanging(global::System.String value);
        partial void OnTimeZoneChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Zip
        {
            get
            {
                return _zip;
            }
            set
            {
                if (_zip != value)
                {
                    OnZipChanging(value);
                    ReportPropertyChanging("Zip");
                    _zip = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Zip");
                    OnZipChanged();
                }
            }
        }

        private global::System.String _zip;
        partial void OnZipChanging(global::System.String value);
        partial void OnZipChanged();

        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Organization
        {
            get
            {
                return _organization;
            }
            set
            {
                if (_organization != value)
                {
                    OnOrganizationChanging(value);
                    ReportPropertyChanging("Organization");
                    _organization = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("Organization");
                    OnOrganizationChanged();
                }
            }
        }

        private global::System.String _organization;
        partial void OnOrganizationChanging(global::System.String value);
        partial void OnOrganizationChanged();

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
        public global::System.String OriginalDevice
        {
            get
            {
                return _originalDevice;
            }
            set
            {
                if (_originalDevice != value)
                {
                    OnOriginalDeviceChanging(value);
                    ReportPropertyChanging("OriginalDevice");
                    _originalDevice = StructuralObject.SetValidValue(value, true);
                    ReportPropertyChanged("OriginalDevice");
                    OnOriginalDeviceChanged();
                }
            }
        }

        private global::System.String _originalDevice;
        partial void OnOriginalDeviceChanging(global::System.String value);
        partial void OnOriginalDeviceChanged();

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Comment_Geo", "Comment")]
        public EntityCollection<Comment> CommentList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Comment>("Malldub.Data.FK_Comment_Geo", "Comment");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Comment>("Malldub.Data.FK_Comment_Geo", "Comment", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_Order_Geo", "Order")]
        public EntityCollection<Order> OrderList
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Order>("Malldub.Data.FK_Order_Geo", "Order");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Order>("Malldub.Data.FK_Order_Geo", "Order", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591