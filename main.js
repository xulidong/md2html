var fs = require("fs");
var marked = require("marked");

var INPUT_PATH_MD = "./md/";
var OUTPUT_PATH_HTML = "./html/";
var TEMPLATE_PATH = "./template/";
var FILENAME_TEMPLATE= "template.html";

function getFilesInDir(dir) {
	return fs.readdirSync(dir, "utf8");
}

function readFile(filename) {
	return fs.readFileSync(filename, "utf8");
}

function saveFile(filename, content) {
	var toFilename = filename.replace(".md", ".html");
	var path = OUTPUT_PATH_HTML + toFilename;
	fs.writeFileSync(path, content, "utf8");
}

function md2html(filename) {
	var content = readFile(INPUT_PATH_MD + filename);
	var template = readFile(TEMPLATE_PATH + FILENAME_TEMPLATE);
	var md = marked(content);
	var html = template.replace("@title", filename);
	html = html.replace("@md", md);
	saveFile(filename, html);
}

function main() {
	var files = getFilesInDir(INPUT_PATH_MD);
	files.forEach(function (filename) { md2html(filename); })
}
main();