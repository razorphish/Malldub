
var FundWizardModule = function () {
    var external = {};
    
    $.mask.definitions['~'] = '[+-]';

    external.init = function () {
        //initStep1Validation();
        initWizard();
        initKendoElements();
    };

    var initKendoElements = function() {
        $('#fundDateExpire').kendoDatePicker({
            min: new Date()
        });
    };
    
    var initStep1Validation = function() {
        $('#validation-form').validate({
            errorElement: 'span',
            errorClass: 'help-inline',
            focusInvalid: true,
            rules: {
                goalAmount: {
                    required: true
                },
                fundTitle: {
                    required: true
                },
                fundOrganizer: {
                    required: true
                },
                fundRaiserTypes: {
                    required: true
                },
                fundShortSummary: {
                    required: true
                },
                fundDescription: {
                    required: true
                },
                fundDateExpire: {
                    required: true
                }
            },
            messages: {
                goalAmount : {
                    required: "Please provide a goal amount"
                },
                fundTitle: {
                    required: "Provide a fund title"
                },
                fundOrganizer: {
                    required: "Please provider an organizer"
                },
                fundRaiserTypes: {
                    required: 'Please select a type of Fund Raiser'
                },
                fundShortSummary: {
                    required:  'Please enter a short summary'
                },
                fundDescription: {
                    required: 'Please enter description'  
                },
                fundDateExpire: {
                    required: '&nbsp;'
                }
                
            },
            invalidHandler: function (event, validator) { //display error alert on form submit   
                //add some window logic here
            },

            highlight: function (e) {
                $(e).closest('.control-group').removeClass('info').addClass('error');
            },

            success: function (e) {
                $(e).closest('.control-group').removeClass('error').addClass('info');
                $(e).remove();
            },

            errorPlacement: function (error, element) {
                if (element.is(':checkbox') || element.is(':radio')) {
                    var controls = element.closest('.controls');
                    if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                    else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                } else {
                    var $span = element.next('span');

                    if ($span.length) {
                        error.insertAfter(element.next('span'));
                    } else {
                        error.insertAfter(element);
                    }
                    
                }
            },

            submitHandler: function (form) {
           
            }
        });
        
        $.validator.addMethod("donation", function (value, element) {
            return this.optional(element) || /^(\d{1,3})(\.\d{1,2})?$/.test(value);
        }, "Must be in US currency format 0.99");
    };
    
    var initWizard = function() {
        $('#MyWizard').wizard();

        $('#MyWizard').on('change', function (e, info) {
            if (info.step === 1) {
                if ($('#validation-form').valid()) {
                    saveStep1();
                } else {
                    return false;
                }
            }
        }).on('stepclick', function(e) {
            //return false; //prevent clicking on steps
        });
        
        $('#btnWizardPrev').on('click', function () {
            $('#MyWizard').wizard('previous');
        });
        
        $('#btnWizardNext').on('click', function () {
            $('#MyWizard').wizard('next', 'foo');
        });
    };
    
    var saveStep1 = function () {
        var fundData = getStep1Data();
        $.ajax({
            url: WebApiConstants.FundPost,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            done: function(data, textStatus, jqXHR) {
                alert('success');
            },
            fail : function(jqXHR, textStatus, errorThrown ) {
                alert('fail');
            },
            always: function() {
                alert('always');
            },
            data : fundData
        });
    };

    var getStep1Data = function () {
        var id = 0;
        var goalAmount = $('#goalAmount').val();
        var title = $('#fundTitle').val();
        var dateExpire = $('#fundDateExpire').val();
        var fundTypeId = $('input[name=fundRaiserTypes]:checked', '#validation-form').val();
        var shortSummary = $('#fundShortSummary').val();
        var longDescription = $('#fundDateExpire').val();
        var isPrivate = $('#fundIsPrivate').prop('checked');
        var enableSocialSharing = $('#fundSocialSharing').prop('checked');
        var fund = createFund(id, title, goalAmount, dateExpire, fundTypeId, shortSummary, longDescription, isPrivate, enableSocialSharing);
        var fundJson = JSON.stringify(fund);
        return fundJson;
    };
    
    return external;
}();

$(document).ready(function () {
    App.init();
    FundWizardModule.init();
});

