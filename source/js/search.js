var searchFunc = function(path) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();
            var $input = document.getElementById("local-search-input");
            var $resultTitle = document.getElementById("local-search-title");
            var $resultContent = document.getElementById("local-search-result");
            $resultContent.innerHTML = "";
            if ($input.value.trim().length <= 0) {
                // 没有键入搜索内容
                $resultTitle.innerHTML = "<h1>[(｡ŏ_ŏ)] 找不到了..</h1>";
            }
            $input.addEventListener('input', function(){
                var count = 0;
                var str='';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                // perform local searching
                datas.forEach(function(data) {
                    var isMatch = true;
                    var content_index = [];
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles and contents
                    if(data_title != '' && data_content != '') {
                        keywords.forEach(function(keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if( index_title < 0 && index_content < 0 ){
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i == 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    }
                    // show search results
                    if (isMatch) {
                        count += 1;
                        str += "<li><a href='"+ data_url +"'>";
                        str += "<div class='search-result-item'>"+ data_title + "</div>";
                        var content = data.content.trim().replace(/<[^>]+>/g,"");
                        if (first_occur >= 0) {
                            // cut out 100 characters
                            var start = first_occur - 20;
                            var end = first_occur + 80;
                            if(start < 0){
                                start = 0;
                            }
                            if(start == 0){
                                end = 100;
                            }
                            if(end > content.length){
                                end = content.length;
                            }
                            var length = end - start;
                            var match_content = content.substr(start, length); 
                            // highlight all keywords
                            keywords.forEach(function(keyword){
                                var regS = new RegExp(keyword, "gi");
                                match_content = match_content.replace(regS, "<em class=\"search-result-keyword\">"+keyword+"</em>");
                            });
                            
                            str += "<div class=\"search-result-match-content\">" + match_content +"...</div>"
                        }
                        str += "</a></li>";
                    } 
                });
                if(count > 0) {
                    $resultTitle.innerHTML = "<h1>[(๑•̀ㅂ•́)و✧] 呐，给你</h1>";
                } else {
                    $resultTitle.innerHTML = "<h1>[(｡ŏ_ŏ)] 找不到了..</h1>";
                }
                
                $resultContent.innerHTML = str;
            });
        }
    });
}

function init() {

    var path = document.getElementById("local-search-path").value;
    searchFunc(path);

    var input = document.getElementById("local-search-input");
    input.addEventListener('focus', function(evt){
        var container = document.getElementById("search-content");
        classie.removeClass(container, "close");
        classie.addClass(this, "searching");
        var searchInputClose = document.getElementById("search-input-close");
        classie.addClass(searchInputClose, "searching");
    });

    var searchInputClose = document.getElementById("search-input-close");
    searchInputClose.addEventListener('click', function(evt){
        var container = document.getElementById("search-content");
        classie.addClass(container, "close");
        var searchInput = document.getElementById("local-search-input");
        classie.removeClass(searchInput, "searching");
        searchInput.value = "";
        classie.removeClass(this, "searching");
    });

}

init();
