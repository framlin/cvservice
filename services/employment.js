var json2html = require('node-json2html'),
    cvEmployment = require('./../data/cv-employment'),
    cvUtils = require('./cvutils');

function Employment() {
    var jobs = cvUtils.createJobIndex(cvEmployment);

    this.getList = function getList(type) {
        var result = cvUtils.getJSONList(cvEmployment);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Anstellungen");
                break;
        }
        return result;
    }

    this.getElem = function getElem(cvid, type) {
        var result = cvUtils.getJSONElem(jobs[cvid]);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLElem(result);
                break;
        }
        return result;
    };
}

module.exports = new Employment();