var json2html = require('node-json2html'),
    cvMbaaba = require('./../data/cv-mbaaba'),
    cvUtils = require('./cvutils');

function Mbaaba() {
    var jobs = cvUtils.createJobIndex(cvMbaaba);

    this.getList = function getList(type) {
        var result = cvUtils.getJSONList(cvMbaaba);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Walden &amp; Egger GbR", "cv_mbaaba");
                break;
        }
        return result;
    }

    this.getElem = function getElem(cvid, type) {
        var result = cvUtils.getJSONElem(jobs[cvid]);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLElem(result, "ov_cv");
                break;
        }
        return result;
    };

    this.getCVIDs = function getCVIDs() {
        var result = [],
            job;

        for (job in jobs) {
            result.push(job);

        }
        return result;
    }

}

module.exports = new Mbaaba();