function createTopic(elem) {
    var label = elem.firma,
        jobid = elem.jobid,
        target = '/cv/' + jobid,
        topic = jobid ? '<a href=\"'+target+'\">'+label+'</a>' : label;

    return topic;
}


function extractSkills(elem) {
    var tasks= elem.tasks,
        skills = [],
        skill,
        skillIdx = {},
        distinctSkills = [],
        skillString,
        i = 0,
        result = "",
        s = 0;


    for (i = 0; i < tasks.length; i += 1) {
        skillString = tasks[i].skills;
        if (skillString !== "") {
            skills = skillString.split(', ');
            for (s = 0; s < skills.length; s += 1) {
                skillIdx[skills[s]] = 1;
            }
        }
    }

    for (skill in skillIdx) {
        distinctSkills.push(skill);
    }

    result = distinctSkills.join(', ');
    return result;
}

function getJSONList(cvlist) {

    var i, size, elem,
        entry = {},
        list = [];

    for (i = 0; i < cvlist.length; i += 1) {
        elem = cvlist[i].job;
        var entry = {
            'period' : elem.time,
            'topic' : createTopic(elem),
            'skills': extractSkills(elem)
        };
        list.push(entry);
    }
    return list;
}

function getJSONElem(elem) {
    return elem;
}

function createJobIndex(cvlist) {
    var result = {},
        i,
        entry;

    for (i = 0; i < cvlist.length; i += 1) {
        entry = cvlist[i].job;
        result[entry.jobid] = entry;
    }

    return result;
}

function getHTMLList(JSONList, headline, id) {





    var transform = {'tag':'li','html':'${period}: ${topic} <br><div class=\"skills\" >${skills}</div>', 'class' : 'cv-summary'},
        resultHTML = "",
        headingHTML = "<div  class=\"overlay\" ><div id=\"" + id + "\"><article><section class=\"cv-kind\"><header><h1>"+headline+"</h1></header><ul>",
        postfixHTML = "</ul></section></article></div></div>";

    resultHTML = headingHTML + json2html.transform(JSONList,transform) + postfixHTML;

    return resultHTML;
}

function getHTMLElem(JSONElem, id) {

    var transform = {
            'tag':'li',
            'html':'${name}<br><div class=\"skills\">${skills}</div>',
            'class' : 'cv-project'
        },
        resultHTML = "",
        headingHTML = "<div  class=\"overlay\" ><div id=\"" + id + "\"><article><section class=\"cv-entry\"><header><h1>"+
            JSONElem.firma+"</h1><p>"+
            JSONElem.description+
            "</p></header><ul>",
        postfixHTML = "</ul></section></article></div></div>";

    resultHTML = headingHTML + json2html.transform(JSONElem.tasks,transform) + postfixHTML;

    return resultHTML;
}



module.exports = {
    createTopic: createTopic,
    extractSkills : extractSkills,
    getJSONList: getJSONList,
    createJobIndex: createJobIndex,
    getJSONElem: getJSONElem,
    getHTMLList: getHTMLList,
    getHTMLElem: getHTMLElem
};