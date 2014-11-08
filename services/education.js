var json2html = require('node-json2html'),
    cvEducation = require('./../data/cv-education'),
    cvUtils = require('./cvutils');

function Education() {

    function extractSkills(elem) {
        var pi,
            phases,
            phasesSize,
            phase,
            ci,
            classes,
            classesSize,
            course,
            skills = [],
            result = "";

        phases = elem.phases;
        phasesSize = phases.length;
        for (pi = 0; pi < phasesSize; pi += 1) {
            phase = phases[pi];
            classes = phase.classes;
            classesSize = classes.length;
            for (ci = 0; ci < classesSize; ci += 1) {
                course = classes[ci];
                skills.push(course.course);
            }
        }

        result = skills.join(', ');
        return result;
    }

    function createTopic(elem) {
        var label = elem.studium,
            cvid = elem.cvid,
            target = '/cv/' + cvid,
            topic = label;

        return topic;
    }

    function getJSONList() {

        var i, size, elem,
            entry = {},
            list = [],
            skills = '',
            topic = '';

        for (i = 0; i < cvEducation.length; i += 1) {
            elem = cvEducation[i];
            skills = extractSkills(elem);
            topic = createTopic(elem);
            entry = {
                'period' : elem.time,
                'topic' : topic,
                'skills': skills
            };
            list.push(entry);
        }
        return list;
    }

    this.getList = function getList(type) {
        var result = getJSONList();
        switch (type) {
            case 'HTML':
                result = cvUtils.getHTMLList(result, "Ausbildung");
                break;
        }
        return result;
    }
}

module.exports = new Education();