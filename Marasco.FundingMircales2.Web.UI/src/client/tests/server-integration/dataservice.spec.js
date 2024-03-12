describe('server: dataservice', function () {
    var contacts = mockData.getMockContacts();
    var additionalRoles = mockData.getMockAdditionalRoles();
    var setContact = mockData.setContact();
    beforeEach(function () {
        bard.appModule('ep.generic.dataservice');
        bard.appModule('ep.axis');
        bard.inject('$httpBackend', '$rootScope', '$epGenericDataService');
    });

    beforeEach(function () {
        $httpBackend.when('POST', '/genericdataservice/getData/LCC Honda/Select Contacts').respond(200, contacts);
        $httpBackend.when('POST', '/genericdataservice/initData/LCC Honda/Contacts/ADDITIONAL_ROLE').respond(200, additionalRoles);
        $httpBackend.when('POST', '/genericdataservice/setData/LCC Honda/Contacts').respond(200, setContact);
        $httpFlush = $httpBackend.flush;
    });

    it('should be defined', function () {
        expect($epGenericDataService.getData).not.to.equal(null);
        expect($epGenericDataService.getData).not.to.equal(undefined);

        expect($epGenericDataService.initData).not.to.equal(null);
        expect($epGenericDataService.initData).not.to.equal(undefined);

        expect($epGenericDataService.setData).not.to.equal(null);
        expect($epGenericDataService.setData).not.to.equal(undefined);
    });

    it('should get list of Contacts (Get Call)', function (done) {
        $epGenericDataService.getData('LCC Honda', 'Select Contacts', {}).$promise.then(function (data) {
            expect(data.length).to.equal(5);
        }).then(done());
    });

    it('should get list of Additional Roles (Init Call)', function (done) {
        $epGenericDataService.initData('LCC Honda', 'Contacts','ADDITIONAL_ROLE', {}).$promise.then(function (data) {
            expect(data.length).to.equal(18);
        }).then(done());
    });

    it('should add/update Contact (Set Call)', function (done) {
        $epGenericDataService.setData('LCC Honda', 'Contacts', {}).$promise.then(function (data) {
            expect(data.STATUS).to.equal(0);
        }).then(done());
    });

    
});