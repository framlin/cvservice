var json2html = require('node-json2html'),
    cvFreelancer = require('./../data/cv-freelancer'),
    cvUtils = require('./cvutils');


function Freelancer() {
    var jobs = cvUtils.createJobIndex(cvFreelancer);

    function getHTMLElem(JSONElem) {

        var transform = {
                'tag':'li',
                'html':'<span class=\"cv-label\">Projekt</span>: ${name}<br><span class=\"cv-label\">Endkunde</span>: <span class=\"cv-customer\">${customer}</span><br><span class=\"cv-label\">Skills</span>: <span class=\"skills\">${skills}</span>',
                'class' : 'cv-project'},
            resultHTML = "",
            headingHTML = "<div  class=\"overlay\" >" +
                "<div id=\"ov_cv\" class=\"vbox\">" +
                "<div class='content'>" +
                "<section class=\"topic\"><header><h1>curriculum vitae</h1></header></section>" +
                "<nav id=\"breadcrumb\"><ul><li><a href='/'>Startseite</a></li> &gt; <li><a href='/cv?ov_cv,all'>Lebenslauf</a></li></ul></nav>" +
                "<article>" +
                "<section class=\"cv-entry\"><header><h1>"+
                JSONElem.firma+"</h1><p>"+
                JSONElem.description+
                "</p></header><ul>",
            postfixHTML = "</ul></section></article></div></div></div>";

        resultHTML = headingHTML + json2html.transform(JSONElem.tasks,transform) + postfixHTML;

        return resultHTML;
    }

    this.getList = function getList(type) {
        var result = cvUtils.getJSONList(cvFreelancer);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Freelancer", "cv_freelancer");
                break;
        }
        return result;
    };

    this.getElem = function getElem(cvid, type) {
        var result = cvUtils.getJSONElem(jobs[cvid]);
        switch (type) {
            case 'HTML':
                result = getHTMLElem(result, "ov_cv");
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

module.exports = new Freelancer();