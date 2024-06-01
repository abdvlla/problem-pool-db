$(document).ready(function () {
  $("table").DataTable({
    order: [4, "asc"],
  });

  $("#status-filter").change(function () {
    var selectedStatus = $(this).val();

    $("table").DataTable().column(4).search(selectedStatus).draw();
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
