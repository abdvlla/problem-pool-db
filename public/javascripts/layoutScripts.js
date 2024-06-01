$(document).ready(function () {
  $("#poolTable").DataTable({
    pagingType: "simple_numbers",
    language: {
      searchPlaceholder: "Search records",
    },
    initComplete: function () {
      var api = this.api();
      $("#status-filter").on("change", function () {
        api.column(4).search(this.value).draw();
      });
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
  );

  FilePond.create(document.querySelector(".filepond"), {
    allowMultiple: true,
    name: "cover",
  });
});
