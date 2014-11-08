var json2html = require('node-json2html'),
    restify = require('restify'),
    educationService = require('./../services/education'),
    employmentService = require('./../services/employment'),
    freelancerService = require('./../services/freelancer'),
    mbaabaService = require('./../services/mbaaba'),
    listHeadingHTML = "<section><header><h1>curriculum vitae</h1></header></section>",
    listPrefixHTML = '<nav id=\"breadcrumb\"><ul><li><a href=\"/\">Startseite</a></li></ul></nav><article id=\"cv\">',
    elemPrefixHTML = '<nav id=\"breadcrumb\"><ul><li><a href=\"/\">Startseite</a>&nbsp;&nbsp;&gt;</li><li><a href=\"/cv\">Lebenslauf</a></li></ul></nav><article id=\"cv\">',
    postfix = "</article>"
    services = {
        mb: mbaabaService,
        ed: educationService,
        fr: freelancerService,
        em: employmentService
    };




function cv_list(req, res, next) {
    var resultHTML = "",
        freelancerHTML = freelancerService.getList('HTML'),
        educationHTML = educationService.getList('HTML'),
        mbaabaHTML = mbaabaService.getList('HTML'),
        employmentHTML = employmentService.getList('HTML');

    resultHTML =
        listHeadingHTML +  '\n' +
        listPrefixHTML +  '\n' +
        freelancerHTML + '\n' +
        employmentHTML + '\n' +
        mbaabaHTML + '\n' +
        educationHTML + '\n' +
        postfix;


    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resultHTML),
        'Content-Type': 'text/html'
    });
    res.write(resultHTML);
    res.end();
}

function cv_elem(req, res, next) {
    var resultHTML = "",
        cvid = req.params.cvid.split('-'),
        segment = cvid[0],
        cvElemHTML = services[segment].getElem(req.params.cvid, 'HTML');


    resultHTML =
        listHeadingHTML +  '\n' +
        elemPrefixHTML +  '\n' +
        cvElemHTML + '\n' +
        postfix;


    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(resultHTML),
        'Content-Type': 'text/html'
    });
    res.write(resultHTML);
    res.end();
}

var server = restify.createServer();
server.use(restify.CORS( {credentials: true, headers: ['x-framlin-cv']}));
server.use(restify.fullResponse());
server.get('/cv/list', cv_list);
server.get('/cv/:cvid', cv_elem);

server.listen(8089, function() {
    //console.log('%s listening at %s', server.name, server.url);
});
