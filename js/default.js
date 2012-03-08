//Demo 1 : Getting basic file infos
function showFileInfos(e) {
  var infos = {}, file;
  var fileList = e.target.files;

  for(var i = 0; i < fileList.length; i++) {
    file = fileList[i];
    infos[file.name] = {
      size: bytesToSize(file.size),
      type: file.type || 'n/a',
      lastModifiedDate: file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'
    }
  }
  document.getElementById('file-infos').innerHTML = JSON.stringify(infos, null, 2);
  prettyPrint();
}

document.getElementById('files').addEventListener('change', showFileInfos, false);

//Demo 2 : Reading file content
function handlePics(e) {
  var file;
  var fileList = e.target.files;
  var thumbnails = document.getElementById('thumbnails');

  for (var i = 0; i < fileList.length; i++) {
    file = fileList[i];
    if (!file.type.match('image.*')) continue;

    var reader = new FileReader();

    reader.onload = function(e){
      var span = document.createElement('span');
      span.innerHTML = '<img src="' + e.target.result + '"/>';
      thumbnails.insertBefore(span, null);
    }

    reader.readAsDataURL(file);
  }
}

document.getElementById('pictures').addEventListener('change', handlePics, false);

//Demo 3 : Observing read progress
function handleHugeFile(e) {
  var file = e.target.files[0];
  var progressBar = document.getElementById('progress-bar');
  var progressInfos = document.getElementById('progress-infos');
  var reader = new FileReader();

  progressBar.value = 0;
  progressInfos.innerHtml = 0;

  reader.onprogress = function(e) {
    var progress = Math.round( e.loaded / e.total * 100);
    progressBar.value = progress;
    progressInfos.innerHTML = progress;
  };

  reader.onload = function(e) {
    progressBar.value = progressBar.max;
    progressInfos.innerHTML = progressBar.max;
    alert('FILE LOAD END : 001101101011.\nROBOT HAXOR CONFIRMED.\n88 MILES PER HOUR.\nLOGOUT.');
  }

  reader.readAsText(file);
}

document.getElementById('huge-file-palooza').addEventListener('change', handleHugeFile, false);

//Utilities
function bytesToSize(bytes) {
  if (!bytes) return 'n/a';
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};