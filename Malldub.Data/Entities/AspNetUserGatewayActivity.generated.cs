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
    [EdmEntityTypeAttribute(NamespaceName="Malldub.Data", Name="AspNetUserGatewayActivity")]
    [DataContractAttribute(IsReference=true)]
    [ScaffoldTable(true)]
    [Serializable()]
    public partial class AspNetUserGatewayActivity : EntityObject
    {
        #region Factory Methods

        /// <summary>
        /// Create a new AspNetUserGatewayActivity object.
        /// </summary>
        /// <param name="identification">Initial value of the Identification property.</param>
        /// <param name="aspNetUserGatewayId">Initial value of the AspNetUserGatewayId property.</param>
        /// <param name="typeId">Initial value of the TypeId property.</param>
        public static AspNetUserGatewayActivity CreateAspNetUserGatewayActivity(global::System.Int32 identification, global::System.Int32 aspNetUserGatewayId, global::System.String typeId)
        {
            AspNetUserGatewayActivity aspNetUserGatewayActivity = new AspNetUserGatewayActivity();
            aspNetUserGatewayActivity.Identification = identification;
            aspNetUserGatewayActivity.AspNetUserGatewayId = aspNetUserGatewayId;
            aspNetUserGatewayActivity.TypeId = typeId;

            return aspNetUserGatewayActivity;
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
        public global::System.Int32 AspNetUserGatewayId
        {
            get
            {
                return _aspNetUserGatewayId;
            }
            set
            {
                if (_aspNetUserGatewayId != value)
                {
                    OnAspNetUserGatewayIdChanging(value);
                    ReportPropertyChanging("AspNetUserGatewayId");
                    _aspNetUserGatewayId = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("AspNetUserGatewayId");
                    OnAspNetUserGatewayIdChanged();
                }
            }
        }

        private global::System.Int32 _aspNetUserGatewayId;
        partial void OnAspNetUserGatewayIdChanging(global::System.Int32 value);
        partial void OnAspNetUserGatewayIdChanged();

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

        #endregion

        #region Navigation Properties

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGatewayActivity_Activity", "Activity")]
        public Activity Activity
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Activity>("Malldub.Data.FK_AspNetUserGatewayActivity_Activity", "Activity").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Activity>("Malldub.Data.FK_AspNetUserGatewayActivity_Activity", "Activity").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Activity> ActivityReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Activity>("Malldub.Data.FK_AspNetUserGatewayActivity_Activity", "Activity");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Activity>("Malldub.Data.FK_AspNetUserGatewayActivity_Activity", "Activity", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGateway")]
        public AspNetUserGateway AspNetUserGateway
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGateway").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGateway").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUserGateway> AspNetUserGatewayReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGateway");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUserGateway>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGateway", "AspNetUserGateway", value);
                }
            }
        }

        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("Malldub.Data", "FK_AspNetUserGatewayActivity_AspNetUserGatewayType", "AspNetUserGatewayActivityType")]
        public AspNetUserGatewayActivityType AspNetUserGatewayActivityType
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGatewayActivityType>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGatewayType", "AspNetUserGatewayActivityType").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGatewayActivityType>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGatewayType", "AspNetUserGatewayActivityType").Value = value;
            }
        }

        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<AspNetUserGatewayActivityType> AspNetUserGatewayActivityTypeReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<AspNetUserGatewayActivityType>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGatewayType", "AspNetUserGatewayActivityType");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<AspNetUserGatewayActivityType>("Malldub.Data.FK_AspNetUserGatewayActivity_AspNetUserGatewayType", "AspNetUserGatewayActivityType", value);
                }
            }
        }

        #endregion
    }
}
#pragma warning restore 1591