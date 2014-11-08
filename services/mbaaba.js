var json2html = require('node-json2html'),
    cvMbaaba = require('./../data/cv-mbaaba'),
    cvUtils = require('./cvutils');

function Mbaaba() {
    var jobs = cvUtils.createJobIndex(cvMbaaba);

    this.getList = function getList(type) {
        var result = cvUtils.getJSONList(cvMbaaba);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Walden &amp; Egger GbR");
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

module.exports = new Mbaaba();