var scroll = function() {
	var tags_container =document.getElementById('tags_container');
	var tag_highlight = document.getElementById('tag_highlight');
	if(tag_highlight && tags_container) {
		var offsetLeft = tag_highlight.offsetLeft - 110;
		tags_container.scrollTo({ 
		    left: offsetLeft,
		    behavior: "auto"
		});
	}

	var posts_container =document.getElementById('posts_container');
	var post_highlight = document.getElementById('post_highlight');
	if(post_highlight && posts_container) {
		var offsetTop = post_highlight.offsetTop;
		posts_container.scrollTo({ 
		    top: offsetTop,
		    behavior: "auto"
		});
	}
}

$(function() {
	$("#sidebar-toggle").click(function() {
		var container = document.getElementById("container");
		classie.toggleClass(container, "close");
	})

	scroll();
})