$(document).ready(function () {
  var table = $("#poolTable").DataTable({
    pagingType: "simple_numbers",
    language: {
      searchPlaceholder: "Search records",
    },
    columnDefs: [{ searchable: false, orderable: false, targets: [6] }],
    initComplete: function () {
      var api = this.api();

      $("#poolTable_length").appendTo("#entries-per-page");

      $(".dataTables_filter").appendTo("#search-bar");

      $("#filter-form").appendTo("#datatable-controls");

      $("#status-filter").on("change", function () {
        api.column(4).search(this.value).draw();
      });

      $("#assigned-filter").on("change", function () {
        api.column(3).search(this.value).draw();
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
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
  );

  FilePond.create(document.querySelector(".filepond"), {
    allowMultiple: true,
    allowImageEdit: true,
    name: "cover",
  });
});
