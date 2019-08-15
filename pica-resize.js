$(function() {
	var $editor = $('.image-editor');
	$editor.cropit();

	var pica = window.pica({ features: ['all'] });

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
		zoomedCanvas.width = previewSize.width * exportZoom * 2;
		zoomedCanvas.height = previewSize.height * exportZoom * 2;
		
		pica.resize(originalCanvas, zoomedCanvas)
			.then(function(result){
				return pica.toBlob(result, 'image/jpeg', 0.8);
			})
			.then(function(blob) {
				
				window.open(window.URL.createObjectURL(blob));
				$('.image-editor').after('<img src="' + window.URL.createObjectURL(blob) + '" width="200px" height="300" />');
				console.log(window.URL.createObjectURL(blob));

	
			});
	});
});