var educationService = require('./../services/education'),
    employmentService = require('./../services/employment'),
    freelancerService = require('./../services/freelancer'),
    mbaabaService = require('./../services/mbaaba'),
    listHeadingHTML = "<section><header><h1>curriculum vitae</h1></header></section>",
    listPrefixHTML = '<nav id=\"breadcrumb\"><ul><li><a href=\"/\">Startseite</a></li></ul></nav><article id=\"cv\">',
    elemPrefixHTML = '<nav id=\"breadcrumb\"><ul><li><a href=\"/\">Startseite</a>&nbsp;&nbsp;&gt;</li><li><a href=\"/cv\">Lebenslauf</a></li></ul></nav><article id=\"cv\">',
    postfix = "</article>",
    services = {
        mb: mbaabaService,
        ed: educationService,
        fr: freelancerService,
        em: employmentService
    },
    files = {
        mb: "cv-mbaaba.html",
        ed: "cv-education.html",
        fr: "cv-freelancer.html",
        em: "cv-employment.html"
    },
    fs = require('fs');


function create_list_articles() {
    var filename;
    for (var kind in services) {
        filename = './../content/article/'+files[kind];
        fs.writeFile(filename, services[kind].getList("HTML"), (err) => {
            if (err) throw err;
        });
    }
}

function create_job_articles() {
    var filename,
    cvids;
    for (var kind in services) {
        if (kind !== 'ed') {
            cvids = services[kind].getCVIDs();
            for (i=0; i < cvids.length; i++) {
                filename = './../content/article/' + cvids[i] + '.html';
                fs.writeFile(filename, services[kind].getElem(cvids[i], 'HTML'), (err) => {
                    if (err) throw err;
                });
            }

        }
    }

}


create_list_articles();
create_job_articles();

