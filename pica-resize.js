$(function() {
	var $editor = $('.image-editor');
	$editor.cropit();

	var resizer = window.pica({ features: ['all'] });

	$('.export').click(function() {
		// Get cropping information
		var imgSrc = $editor.cropit('imageSrc');
		var offset = $editor.cropit('offset');
		var zoom = $editor.cropit('zoom');
		var previewSize = $editor.cropit('previewSize');
		var exportZoom = $editor.cropit('exportZoom');
		var img = new Image();
		img.src = imgSrc;

		// Draw image in original size on a canvas
		var originalCanvas = document.createElement('canvas');
		originalCanvas.width = previewSize.width / zoom;
		originalCanvas.height = previewSize.height / zoom;
		var ctx = originalCanvas.getContext('2d');
		ctx.drawImage(img, offset.x / zoom, offset.y / zoom);
		
		// Use pica to resize image and paint on destination canvas
		var zoomedCanvas = document.createElement('canvas');
		zoomedCanvas.width = previewSize.width * exportZoom;
		zoomedCanvas.height = previewSize.height * exportZoom;
		
		resizer.resize(originalCanvas, zoomedCanvas, {
			
		}).then(function(err) {
			//if (err) { return console.log(err); }

			var picaImageData = zoomedCanvas.toDataURL();
			var $picaImg = $('<img src="' + picaImageData + '" />');
			
			$('.image-editor').after($picaImg);
		});
	});
});