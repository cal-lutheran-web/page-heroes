$(function() {
	var $editor = $('.image-editor');
	$editor.cropit();

	var pica = window.pica({ features: ['all'] });

	function getFileName(){
		var fileUpload = $('.cropit-image-input').val();
		var fileName = fileUpload.split('\\').pop().replace('.JPG','');
		return fileName;
	}

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
				
				var image_data = window.URL.createObjectURL(blob);
				$('.image-editor').after('<img src="' + image_data + '" width="200px" height="300" />');
				$('.image-editor').after('<a download="'+ getFileName() +'-resized.jpg" href="'+ image_data +'">Download</a>');

	
			});
	});
});