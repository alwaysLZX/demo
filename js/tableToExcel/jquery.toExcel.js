!(function($) {
    var CONFIG = {
        DEBUG: false,
        URI: "data:application/vnd.ms-excel;base64,",
        TMP: `
            <html
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40"
            >
            <head>
                <!--[if gte mso 9]>
                    <xml>
                        <x:ExcelWorkbook>
                        <x:ExcelWorksheets><x:ExcelWorksheet>
                        <x:Name>{sheetName}</x:Name>
                        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
                        </x:ExcelWorkbook>
                    </xml>
                <![endif]-->
                <style type="text/css">{style}</style>
            </head>
            <body>
                {tableTitle}
                {table}
            </body>
            </html>
        `,
        STYLE: `
            table {
                border-collapse: collapse;
            }
            
            table th,
            table td {
                border-collapse: collapse;
                text-align: center;
                vertical-align: middle;
                border: 0.5px solid #000;
            }
            
            table th a,
            table td a {
                text-decoration: none;
            }
        `
    };

    let defaultOption = {
        sheetName: "sheet1",
        ext: ".xlsx",
        fileName: "Table",
        style: CONFIG.STYLE,
        isHasStyle: true,
        debug: false
    };

    $.fn.extend({
        toExcel: function(option) {
            let $self = this;
            if ($self.length > 0) {
                let currentOption = $.extend({}, defaultOption, option);
                CONFIG.DEBUG = currentOption.debug;
                let context = $.extend({}, currentOption, {
                    style: currentOption.isHasStyle ? currentOption.style : "",
                    table: getTable($self, currentOption.isHasStyle),
                    tableTitle: getTitle($self, currentOption.title || currentOption.fileName),
                    saveName: currentOption.fileName + currentOption.ext
                });
                
                let url = CONFIG.URI + base64(format(context));
                download(url, context.saveName);
            } else {
                console.warn("Not Find Table.");
            }
        }
    });

    function format(context) {
        let template = CONFIG.TMP;
        return template.replace(/{(\w+)}/g, function(match, key) {
            return context[key];
        });
    }

    function base64(val) {
        return window.btoa(unescape(encodeURIComponent(val)));
    }

    function download(url, saveName) {
        var aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = saveName || "";
        var event;
        if (window.MouseEvent) event = new MouseEvent("click");
        else {
            event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }

    function getTable($table, isHasStyle) {
        var html = $table[0].outerHTML;
        if (!isHasStyle) {
            var result = [];
            result.push("<table>\n");

            var thead = $table.find("thead");
            if (thead.length > 0) {
                result.push("<thead>\n");
                result.push(getTrContent(thead));
                result.push("</thead>\n");
            }

            let tbody = $table.find("tbody");
            if (tbody.length > 0) {
                result.push("<tbody>\n");
                result.push(getTrContent(tbody));
                result.push("</tbody>\n");
            }

            result.push("</table>");
            html = result.join("");
        }
        html = html.replace(/\<a/, '<span style="color: #337ab7;"');
        html = html.replace(/\<\/a>/, "</span>");
        if (CONFIG.DEBUG) {
            console.log(html);
        }
        return html;
    }

    function getTrContent(ele) {
        let result = [];
        ele.find("tr").each(function() {
            result.push("<tr>\n");
            $(this)
                .find("th,td")
                .each(function() {
                    var colspan = $(this).attr("colspan") || "1";
                    var rowspan = $(this).attr("rowspan") || "1";
                    var content = $(this).text();
                    var label = this.nodeName === "TH" ? "th" : "td";
                    result.push(`<${label} colspan="${colspan}" rowspan="${rowspan}">${content}</${label}>\n`);
                });
            result.push("</tr>\n");
        });
        return result.join("");
    }

    function getTitle($table, title) {
        let $tr = $table.find("tr").eq(0);
        let colspanCount = 0;
        $tr.find("th,td").each(function() {
            var colspan = $(this).attr("colspan") || "1";
            colspanCount += parseInt(colspan);
        });
        return `<table><thead><tr><th colspan="${colspanCount}">${title}</th></tr></thead></table>`;
    }
})(jQuery);
