$(document).ready(function () {
  var table = $("#poolTable").DataTable({
    lengthMenu: [
      [-1, 10, 25, 50, 100],
      ["All", 10, 25, 50, 100],
    ],
    pagingType: "simple_numbers",
    pageLength: 50,
    language: {
      searchPlaceholder: "Search records",
    },
    columnDefs: [{ searchable: false, orderable: false, targets: [7] }],
    initComplete: function () {
      var api = this.api();

      $("#status-filter").on("change", function () {
        api.column(4).search(this.value).draw();
      });

      $("#assigned-filter").on("change", function () {
        api.column(3).search(this.value).draw();
      });
    },
  });
  $("#custom-search").on("keyup", function () {
    table.search(this.value).draw();
  });

  $("#page-length").on("change", function () {
    table.page.len(this.value).draw();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageTransform
  );

  FilePond.create(document.querySelector(".filepond"), {
    allowMultiple: true,
    allowImageEdit: true,
    name: "cover",
  });
});
