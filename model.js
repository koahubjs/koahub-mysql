module.exports = function (_model) {

    const model = koahub.models[_model];
    if (!model) {
        koahub.models[_model] = koahub.Model.extend({
            tableName: _model,
            hasTimestamps: true
        });
        return koahub.models[_model];
    } else {
        return model;
    }
}