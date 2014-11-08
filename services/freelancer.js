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
            headingHTML = "<section class=\"cv-entry\"><header><h1>"+
                JSONElem.firma+"</h1><p>"+
                JSONElem.description+
                "</p></header><ul>",
            postfixHTML = "</p></ul></section>";

        resultHTML = headingHTML + json2html.transform(JSONElem.tasks,transform) + postfixHTML;

        return resultHTML;
    }

    this.getList = function getList(type) {
        var result = cvUtils.getJSONList(cvFreelancer);
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Freelancer");
                break;
        }
        return result;
    };

    this.getElem = function getElem(cvid, type) {
        var result = cvUtils.getJSONElem(jobs[cvid]);
        switch (type) {
            case 'HTML':
                result = getHTMLElem(result);
                break;
        }
        return result;
    };
}

module.exports = new Freelancer();