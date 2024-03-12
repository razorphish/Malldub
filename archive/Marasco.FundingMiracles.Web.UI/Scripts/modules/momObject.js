var Fund = {
    Id: 0,
    Title: '',
    GoalAmount: 0,
    DateExpire: '',
    TypeId: '',
    ShortSummary: '',
    LongDescription: '',
    IsPrivate: false,
    EnableSocialSharing: true,
    DateEntered: new Date()
};

var createFund = function (id, title, goalAmount, dateExpire, fundTypeId, shortSummary, longDescription, isPrivate, enableSocialSharing) {
    Fund.Id = id;
    Fund.Title = title;
    Fund.GoalAmount = goalAmount;
    Fund.DateExpire = dateExpire;
    Fund.TypeId = fundTypeId;
    Fund.ShortSummary = shortSummary;
    Fund.LongDescription = longDescription;
    Fund.IsPrivate = isPrivate;
    Fund.EnableSocialSharing = enableSocialSharing;
    return Fund;
};